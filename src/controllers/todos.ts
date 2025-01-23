import { RequestHandler } from "express";

import { Todo } from "../models/todo";

// In memory just for training
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (<{ text: string }>req.body).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res
    .status(201)
    .json({ message: "Todo created successuflly", createdTodo: newTodo });
};
