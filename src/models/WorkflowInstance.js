const WorkflowInstanceSchema = new mongoose.Schema(
    {
      workflowTemplateId: {
        type: Schema.Types.ObjectId,
        ref: 'Workflow', // Link to the original workflow template
        required: [true, 'Workflow instance must be tied to a workflow template.'],
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Workflow instance must belong to a user.'],
      },
      status: {
        type: String,
        enum: ['active', 'completed', 'abandoned'],
        default: 'active',
      },
      steps: [
        {
          stepId: {
            type: Schema.Types.ObjectId,
            ref: 'Step', // Reference to the step in the workflow template
            required: true,
          },
          completed: {
            type: Boolean,
            default: false,
          },
          conditionOutcome: {
            type: Schema.Types.ObjectId,
            ref: 'Condition', // Track which condition was selected, if applicable
          },
        },
      ],
      startTime: {
        type: Date,
        default: Date.now,
      },
      endTime: {
        type: Date,
      },
    },
    { timestamps: true }
  );
  
export default mongoose.models.WorkflowInstance || mongoose.model('WorkflowInstance', WorkflowInstanceSchema);

  