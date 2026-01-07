const { mongoose } = require('./db');

const BloodRequestSchema = new mongoose.Schema(
  {
    patient_name: { type: String, required: true, trim: true },
    required_blood_group: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      required: true,
    },
    location: { type: String, required: true, trim: true },
    hospital_name: { type: String, required: true, trim: true },
    blood_units: { type: Number, required: true, min: 1, max: 20 },
    urgency: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    contact_phone: { type: String, required: true, trim: true },
    contact_email: { type: String, required: true, trim: true, lowercase: true },
  },
  { timestamps: true }
);

BloodRequestSchema.index({ required_blood_group: 1 });
BloodRequestSchema.index({ urgency: 1 });
BloodRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model('BloodRequest', BloodRequestSchema);
