import { RequestHandler } from "express";
// import { Query } from "mongoose";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    // your code here
    const tasks = await TaskModel.find().sort({ dateCreated: "desc" });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
