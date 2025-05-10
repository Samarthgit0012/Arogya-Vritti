import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  reportType: {
    type: String,
    enum: ['lab', 'imaging', 'prescription', 'other'],
    default: 'other'
  }
});

const medicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    default: ''
  },
  allergies: {
    type: String,
    default: ''
  },
  chronicConditions: {
    type: String,
    default: ''
  },
  medications: {
    type: String,
    default: ''
  },
  familyHistory: {
    type: String,
    default: ''
  },
  surgeries: {
    type: String,
    default: ''
  },
  lifestyle: {
    smoking: {
      type: String,
      enum: ['never', 'former', 'current'],
      default: ''
    },
    alcohol: {
      type: String,
      enum: ['none', 'occasional', 'moderate', 'heavy'],
      default: ''
    },
    exercise: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active'],
      default: ''
    },
    diet: {
      type: String,
      enum: ['regular', 'vegetarian', 'vegan', 'keto', 'paleo', 'other'],
      default: ''
    }
  },
  reports: [reportSchema],
  healthMetrics: [{
    type: {
      type: String,
      enum: ['blood-pressure', 'heart-rate', 'blood-glucose', 'oxygen-saturation', 
             'body-temperature', 'bmi', 'hemoglobin', 'cholesterol', 'creatinine', 
             'urea', 'liver-enzymes', 'thyroid'],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
medicalRecordSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord; 