import mongoose, { Schema } from 'mongoose';

const ConditionSchema = new mongoose.Schema(
  {
    case: {
      type: String,
      required: [true, 'Please provide a case for this condition.'],
    },
    stepId: {
      type: Schema.Types.ObjectId,
      ref: 'Step',
    },
    nextSteps: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Step',
        required: [true, 'Please provide next Step for this condition.'],
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.Condition ||
  mongoose.model('Condition', ConditionSchema);
