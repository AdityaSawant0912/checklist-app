import mongoose, { Schema } from 'mongoose';

const StepSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      maxlength: [150, 'Description cannot be more than 100 characters.'],
      required: [true, 'Please provide a description for this step.'],
    },
    type: {
      type: String,
      required: [true, 'Please provide a type for this step.'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    condition: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Condition',
      },
    ],
    sequence: {
      type: Schema.Types.BigInt,
    },
    workflowId: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow',
    },
    groupSteps: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Step',
      },
    ],
    redirectToWorkflow: {
      type: Schema.Types.ObjectId,
      ref: 'Workflow',
    },
    isFinalStep: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Step || mongoose.model('Step', StepSchema);
