import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Task } from '../models/Task';

const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = await Task.create({
    title,
    description,
  });
  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    throw new Error('no task found with given id');
  }
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    { new: true }
  );
  res.status(201).json(updatedTask);
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    throw new Error('no task found with given id');
  }
  await task.remove();
  res.status(201).json(req.params.id);
});

export { getTasks, createTask, updateTask, deleteTask };
