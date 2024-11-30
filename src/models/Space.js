import mongoose, { Schema } from 'mongoose';

const SpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this space.'],
      maxlength: [50, 'Space name cannot be more than 100 characters.'],
    },
    description: {
      type: String,
      maxlength: [100, 'Description cannot be more than 100 characters.'],
    },
    
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    visibilty: {
      type: String,
      default: 'Private',
    },
  },
  { timestamps: true }
);
export default mongoose.model.Space || mongoose.model('Space', SpaceSchema);
