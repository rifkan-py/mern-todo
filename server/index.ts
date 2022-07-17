import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import taskRoute from './routes/tasksRoute';
import errorHandler from './middlewares/errorHandler';
import connectDB from './config/db';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/tasks', taskRoute);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is litening on port ${port}`));
