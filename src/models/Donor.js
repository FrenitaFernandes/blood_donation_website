const { mongoose } = require('./db');

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18, max: 100 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    blood_group: {
      type: String,
      enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
      required: true,
    },
    contact_phone: { type: String, required: true, trim: true },
    contact_email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, required: true, trim: true },
    is_available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

DonorSchema.index({ blood_group: 1 });
DonorSchema.index({ city: 1 });
DonorSchema.index({ blood_group: 1, city: 1 });

module.exports = mongoose.model('Donor', DonorSchema);
