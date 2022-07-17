import { InferSchemaType, model, Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title must be required'],
    },
    description: {
      type: String,
      required: [true, 'description mustbe required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

type Task = InferSchemaType<typeof taskSchema>;

export const Task = model('Task', taskSchema);

export default Task;
