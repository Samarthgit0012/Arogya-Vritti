import express from 'express';
import MedicalRecord from '../models/medicalRecord.js';
import auth from '../middlewares/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/medical-reports';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow images and PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all health metrics for a user
router.get('/health-metrics', auth, async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({ userId: req.user.id });
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Medical record not found' });
    }
    res.json(medicalRecord.healthMetrics || []);
  } catch (error) {
    console.error('Error fetching health metrics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new health metric reading
router.post('/health-metrics', auth, async (req, res) => {
  try {
    const { type, value, date, unit } = req.body;
    console.log('Received health metric data:', { type, value, date, unit }); // Debug log

    // Validate input
    if (!type || !value || !date || !unit) {
      console.log('Missing required fields:', { type, value, date, unit });
      return res.status(400).json({ 
        message: 'All fields are required',
        received: { type, value, date, unit }
      });
    }

    // Validate type against enum
    const validTypes = ['blood-pressure', 'heart-rate', 'blood-glucose', 'oxygen-saturation', 
                       'body-temperature', 'bmi', 'hemoglobin', 'cholesterol', 'creatinine', 
                       'urea', 'liver-enzymes', 'thyroid'];
    
    if (!validTypes.includes(type)) {
      console.log('Invalid type:', type);
      return res.status(400).json({
        message: 'Invalid metric type',
        received: type,
        validTypes: validTypes
      });
    }

    // Validate value is a number
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      console.log('Invalid value:', value);
      return res.status(400).json({ 
        message: 'Value must be a number',
        received: value
      });
    }

    // Validate date format
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.log('Invalid date:', date);
      return res.status(400).json({ 
        message: 'Invalid date format',
        received: date
      });
    }

    // Find or create medical record
    let medicalRecord = await MedicalRecord.findOne({ userId: req.user.id });
    console.log('Found medical record:', medicalRecord ? 'yes' : 'no');
    console.log('User ID:', req.user.id);
    
    if (!medicalRecord) {
      console.log('Creating new medical record for user:', req.user.id);
      medicalRecord = new MedicalRecord({ 
        userId: req.user.id,
        bloodType: 'O+', // default valid enum
        allergies: '',
        chronicConditions: '',
        medications: '',
        familyHistory: '',
        surgeries: '',
        lifestyle: {
          smoking: 'never', // default valid enum
          alcohol: 'none',  // default valid enum
          exercise: 'moderate', // default valid enum
          diet: 'regular' // default valid enum
        },
        healthMetrics: []
      });
    }

    // Add new reading
    const newReading = {
      type,
      value: numericValue,
      date: dateObj,
      unit
    };
    
    console.log('Adding new reading:', newReading);
    medicalRecord.healthMetrics.push(newReading);

    // Save to MongoDB
    try {
      const savedRecord = await medicalRecord.save();
      console.log('Successfully saved health metric to MongoDB:', savedRecord);
      res.status(201).json(savedRecord.healthMetrics);
    } catch (saveError) {
      console.error('MongoDB save error:', saveError);
      if (saveError.name === 'ValidationError') {
        const validationErrors = Object.keys(saveError.errors).map(key => ({
          field: key,
          message: saveError.errors[key].message,
          value: saveError.errors[key].value
        }));
        console.error('Validation errors:', validationErrors);
        return res.status(400).json({ 
          message: 'Validation error', 
          details: saveError.message,
          errors: validationErrors
        });
      }
      throw saveError;
    }
  } catch (error) {
    console.error('Error adding health metric:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get medical records
router.get('/records', auth, async (req, res) => {
  try {
    const records = await MedicalRecord.findOne({ userId: req.user.id });
    res.json(records || {});
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({ message: 'Error fetching medical records' });
  }
});

// Update medical records
router.post('/records', auth, async (req, res) => {
  try {
    const record = await MedicalRecord.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body, userId: req.user.id },
      { new: true, upsert: true }
    );
    res.json(record);
  } catch (error) {
    console.error('Error updating medical records:', error);
    res.status(500).json({ message: 'Error updating medical records' });
  }
});

// Upload medical report
router.post('/reports/upload', auth, upload.single('report'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const report = {
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileUrl: `/uploads/medical-reports/${req.file.filename}`,
      uploadDate: new Date(),
      description: req.body.description || '',
      reportType: req.body.reportType || 'other'
    };

    const record = await MedicalRecord.findOneAndUpdate(
      { userId: req.user.id },
      { $push: { reports: report } },
      { new: true, upsert: true }
    );

    res.json(report);
  } catch (error) {
    console.error('Error uploading report:', error);
    res.status(500).json({ message: 'Error uploading report' });
  }
});

// Get all reports for a user
router.get('/reports', auth, async (req, res) => {
  try {
    const record = await MedicalRecord.findOne({ userId: req.user.id });
    res.json(record?.reports || []);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports' });
  }
});

// Delete a report
router.delete('/reports/:reportId', auth, async (req, res) => {
  try {
    const record = await MedicalRecord.findOne({ userId: req.user.id });
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    const report = record.reports.id(req.params.reportId);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Delete file from storage
    const filePath = path.join(process.cwd(), report.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove report from MongoDB
    await MedicalRecord.updateOne(
      { userId: req.user.id },
      { $pull: { reports: { _id: req.params.reportId } } }
    );

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ message: 'Error deleting report' });
  }
});

export default router;
