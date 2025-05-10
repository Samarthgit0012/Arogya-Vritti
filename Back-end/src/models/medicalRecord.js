const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bloodType: String,
  allergies: String,
  chronicConditions: String,
  medications: String,
  familyHistory: String,
  surgeries: String,
  lifestyle: {
    smoking: String,
    alcohol: String,
    exercise: String,
    diet: String
  },
  healthMetrics: [{
    type: {
      type: String,
      enum: ['blood-pressure', 'heart-rate', 'blood-glucose', 'oxygen-saturation', 
             'body-temperature', 'bmi', 'hemoglobin', 'cholesterol', 'creatinine', 
             'urea', 'liver-enzymes', 'thyroid']
    },
    value: Number,
    unit: String,
    date: Date
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema); 