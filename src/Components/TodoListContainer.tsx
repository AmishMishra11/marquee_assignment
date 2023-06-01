import React, { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

export type SubTodoType = {
  id: String;
  parentID: String;
  title: String;
  status: String;
  priority: String;
};

export type TodoType = {
  id: String;
  title: String;
  status: String;
  priority: String;
  subtask: SubTodoType[];
};

type InputEvent = ChangeEvent<HTMLInputElement>;

function TodoListContainer() {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const [title, setTitle] = useState("");

  const addTodoHandler = () => {
    const newToDo = {
      id: uuidv4(),
      title: title,
      status: "pending",
      priority: "normal",
      subtask: [],
    };

    setTitle("");
    setTodoList((prev) => [...prev, newToDo]);
  };

  return (
    <div className="h-full p-4">
      <div>
        <h1 className="font-semibold text-xl">Add Todo</h1>
        <div className="w-full flex items-center justify-between p-2">
          <input
            className="w-4/5 p-2"
            placeholder="New Todo"
            value={title}
            onChange={(e: InputEvent) => setTitle(e.target.value)}
          />
          <button
            className="w-1/5 bg-[#F0541A] p-2"
            onClick={() =>
              title.length
                ? addTodoHandler()
                : toast.warn("Title cannot be empty")
            }
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">My Todo list</h1>

        {todoList.map((item: TodoType) => (
          <Todo item={item} setTodoList={setTodoList} todoList={todoList} />
        ))}
      </div>
    </div>
  );
}

export { TodoListContainer };
