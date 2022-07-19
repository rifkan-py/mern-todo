import { InferSchemaType, model, Schema } from 'mongoose';

const userScema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export type IUser = InferSchemaType<typeof userScema>;

export const User = model<IUser>('User', userScema);
export default User;
