import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { connection } = await connect(process.env.MONGO_URI!);
    console.log(`mongodb is connected successful ${connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      process.exit(1);
    }
  }
};

export default connectDB;
