import React, { useState } from "react";
import { TodoType, SubTodoType } from "./TodoListContainer";
import { MdDelete } from "react-icons/md";
import { HiFlag } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

import { Tooltip } from "./Tooltip";
import { v4 as uuidv4 } from "uuid";

type Props = {
  item: TodoType;
  setTodoList: (val: TodoType[]) => void;
  todoList: TodoType[];
};

const Todo: React.FC<Props> = ({ item, setTodoList, todoList }) => {
  const handleDelete = (todoId: String) => {
    let tempTodo = todoList;

    tempTodo = tempTodo.filter((item) => item.id !== todoId);

    setTodoList(tempTodo);
  };

  const handleSubTaskDelete = (parentID: String, subTaskID: String) => {
    let tempTodo = todoList;

    let tempTask = tempTodo.filter((item) => item.id === parentID);

    let tempSubTask = tempTask[0]?.subtask;

    tempSubTask = tempSubTask.filter((item) => item.id !== subTaskID);

    handleEdit(parentID, { subtask: tempSubTask });
  };

  const handleEdit = (todoId: String, changeObj: Object) => {
    let tempTodo = todoList;

    tempTodo = tempTodo.map(
      (item): TodoType =>
        item.id === todoId ? { ...item, ...changeObj } : item
    );

    setTodoList(tempTodo);
  };

  const handleSubTaskEdit = (
    parentID: String,
    subTaskID: String,
    changeObj: Object
  ) => {
    let tempTodo = todoList;

    let tempTask = tempTodo.filter((item) => item.id === parentID);

    let tempSubTask = tempTask[0]?.subtask;

    tempSubTask = tempSubTask.map(
      (item): SubTodoType =>
        item.id === subTaskID ? { ...item, ...changeObj } : item
    );

    handleEdit(parentID, { subtask: tempSubTask });
  };

  const addChildHandlerFunction = () => {
    handleEdit(item.id, {
      subtask: [
        ...item.subtask,
        {
          id: uuidv4(),
          parentID: item.id,
          title: childTitle,
          status: "pending",
          priority: "normal",
        },
      ],
    });
    setChildTitle("");
    setAddChildInput(false);
  };

  const [showChild, setShowChild] = useState(false);
  const [addChildInput, setAddChildInput] = useState(false);
  const [childTitle, setChildTitle] = useState("");
  const [editState, setEditState] = useState(false);
  const [editTitle, setEditTitle] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center h-10 p-2 m-2 bg-[#DDDAFD]">
        <div className="flex items-center justify-start w-full ">
          {item.status === "pending" ? (
            <Tooltip message={"Pending"}>
              <BsCheckCircleFill
                className="mx-2 cursor-pointer text-xl fill-gray-400 group "
                onClick={() => handleEdit(item.id, { status: "completed" })}
              />
            </Tooltip>
          ) : (
            <Tooltip message={"Completed"}>
              <BsCheckCircleFill
                className="mx-2 cursor-pointer text-xl fill-green-700"
                onClick={() => handleEdit(item.id, { status: "pending" })}
              />
            </Tooltip>
          )}

          {item.subtask.length ? (
            showChild ? (
              <IoIosArrowDown
                className="w-5 h-5 m-2"
                onClick={() => setShowChild(false)}
              />
            ) : (
              <IoIosArrowForward
                className="w-5 h-5 m-2"
                onClick={() => setShowChild(true)}
              />
            )
          ) : (
            <GoPrimitiveDot className="w-5 h-5 m-2" />
          )}

          {editState ? (
            <div className="flex items-center w-full justify-between">
              <input
                className="w-[90%] p-2 bg-slate-200"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <div
                className="cursor-pointer"
                onClick={() => {
                  handleEdit(item.id, { title: editTitle });
                  setEditState(false);
                }}
              >
                Save
              </div>
            </div>
          ) : (
            <h1 className="w-[70%]">{item.title}</h1>
          )}
        </div>

        <div className="flex items-center justify-center p-2">
          <AiOutlinePlus
            className="h-5 w-5 m-2 cursor-pointer"
            onClick={() => {
              setShowChild((prev) => !prev);
              setAddChildInput(true);
            }}
          />

          <RiPencilFill
            className="h-5 w-5 m-2 cursor-pointer"
            onClick={() => {
              // setEditTitle(item.title);
              setEditState(true);
            }}
          />
          {item.priority === "normal" ? (
            <Tooltip message={"Normal"}>
              <HiFlag
                className="h-5 w-5 cursor-pointer m-2 fill-green-600 "
                onClick={() => handleEdit(item.id, { priority: "high" })}
              />
            </Tooltip>
          ) : (
            <Tooltip message={"High"}>
              <HiFlag
                className="h-5 w-5 cursor-pointer m-2 fill-red-600 "
                onClick={() => handleEdit(item.id, { priority: "normal" })}
              />
            </Tooltip>
          )}

          <MdDelete
            onClick={() => handleDelete(item.id)}
            className="h-5 w-5 m-2 cursor-pointer"
          />
        </div>
      </div>

      {showChild && (
        <div className="flex z-20 flex-col ml-16 bg-[#9D94E2] w-[80%] ">
          {addChildInput && (
            <div className="flex items-center w-full justify-between">
              <input
                className="w-4/5 bg-slate-200 p-2"
                value={childTitle}
                onChange={(e) => setChildTitle(e.target.value)}
                placeholder="Add Sub Task"
              />

              <div
                className="cursor-pointer w-1/5 p-2 text-center m-auto bg-[#F0541A]"
                onClick={() =>
                  childTitle.length
                    ? addChildHandlerFunction()
                    : toast.warn("Title cannot be empty")
                }
              >
                ADD
              </div>
            </div>
          )}

          {item.subtask.length ? (
            item.subtask.map((subTask) => (
              <div className="flex justify-between items-center h-10 p-2 m-2  bg-[#DDDAFD]">
                <div className="flex items-center p-2 justify-start w-full ">
                  {subTask.status === "pending" ? (
                    <Tooltip message={"Pending"}>
                      <BsCheckCircleFill
                        className="mx-2 cursor-pointer text-xl fill-gray-400 group "
                        onClick={() =>
                          handleSubTaskEdit(subTask.parentID, subTask.id, {
                            status: "completed",
                          })
                        }
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip message={"Completed"}>
                      <BsCheckCircleFill
                        className="mx-2 cursor-pointer text-xl fill-green-700"
                        onClick={() =>
                          handleSubTaskEdit(subTask.parentID, subTask.id, {
                            status: "pending",
                          })
                        }
                      />
                    </Tooltip>
                  )}

                  <h1 className="w-[70%]">{subTask.title}</h1>
                </div>
                <MdDelete
                  onClick={() =>
                    handleSubTaskDelete(subTask.parentID, subTask.id)
                  }
                  className="h-5 w-5 m-2 cursor-pointer"
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Todo;
