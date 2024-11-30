import mongoose, { Schema } from 'mongoose';
const WorkflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this workflow.'],
      maxlength: [100, 'Name cannot be more than 100 characters.'],
    },
    spaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Space',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    steps: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Step',
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export default mongoose.model.Workflow ||
  mongoose.model('Workflow', WorkflowSchema);
