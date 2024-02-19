import { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useRef } from "react";

const Todo = () => {
  const editRef = useRef();

  const [title, setTitle] = useState();
  const [taskList, setTaskList] = useState([]);
  const [edittask, setEdittask] = useState(false);
  const [edit, setEdit] = useState();

  const todoHandler = (e) => {
    if (edittask) {
      //console.log("Editing this task", edit);

      setTaskList((prev) =>
        prev.map((item) =>
          item.id === edit ? { ...item, title: e.target.value } : item
        )
      );
      // console.log("edit done", taskList);
    } else {
      //console.log("no edit task", task);
      setTitle(e.target.value);
    }
  };

  const handleStatus = (id, value) => {
    const filter_data = taskList.filter((item) => item.id !== id);

    const result = taskList.find((item) => item.id === id);

    setTaskList([...filter_data, { ...result, status: value }]);
  };
  // console.log("tasklist",taskList)

  const handleTodoAdd = (e) => {
    setTaskList((prev) => [
      ...prev,
      { id: Date.now(), title: title, status: "" },
    ]);

    e.preventDefault();
  };
  return (
    <div className=" flex items-center h-screen  bg-customBlue">
      <div className="bg-white mx-auto max-w-sm rounded p-7">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-700 text-center">
            ToDo App
          </div>
          <p className="text-gray-700 text-center text-xs">
            Add tasks to the app mark the status of the app.
          </p>
        </div>

        <div className="text-center mr-2 ml-2 my-2">
          <form>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoAddSharp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                ref={editRef}
                type="search"
                id="search"
                className="block w-full  mb-4 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                onChange={(e) => todoHandler(e)}
                required
              />
              {edittask ? (
                <button
                  type="submit"
                  onClick={() => {
                    editRef.current.value = "";
                    setEdittask(false);
                  }}
                  className="text-gray-700 absolute end-1.5 bottom-1.5 bg-yellow-300  hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  clear
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={(e) => {
                    handleTodoAdd(e), (editRef.current.value = "");
                  }}
                  className="text-gray-700 absolute end-1.5 bottom-1.5 bg-yellow-300  hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="text-center ">
          {taskList &&
            taskList.map((value) => (
              <div
              
                className="mb-2 p-1 flex flex-row justify-between rounded-lg text-center bg-slate-300 mr-2 ml-2"
              >
                <p className="text-gray-700 ml-3 text-sm">{value.title}</p>
                <div className="flex flex-row  bg-slate-300">
                  <CiEdit
                    className="mr-2 size-4 text-gray-700 dark:text-gray-400"
                    onClick={() => {
                      editRef.current.value = value.title;
                      setEdit(value.id);
                      setEdittask(true);
                    }}
                  />

                  <AiOutlineDelete
                    className="mr-2 size-4 text-red-600 dark:text-gray-400"
                    onClick={() => {
                      setTaskList(
                        taskList.filter((task) => task.id !== value.id)
                      );
                    }}
                  />
                  <select
                    className="rounded-lg text-gray-700 text-xs"
                    value={value.status}
                    onChange={(e) => handleStatus(value.id, e.target.value)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
