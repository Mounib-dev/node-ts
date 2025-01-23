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

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (<{ text: string }>req.body).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.status(200).json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo deleted!" });
};
