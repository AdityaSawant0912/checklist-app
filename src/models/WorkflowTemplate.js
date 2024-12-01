import mongoose, { Schema } from 'mongoose';
const WorkflowTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this workflow.'],
      maxlength: [100, 'Name cannot be more than 100 characters.'],
    },
    description: {
      type: String,
      maxlength: [100, 'Description cannot be more than 100 characters.'],
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
export default mongoose.models.WorkflowTemplate ||
  mongoose.model('WorkflowTemplate', WorkflowTemplateSchema);
