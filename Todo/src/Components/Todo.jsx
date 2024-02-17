import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const editRef = useRef();
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);
  const [edittask, setEdittask] = useState(false);

  const todoHandler = (e) => {
    if (edittask) {
      console.log("edit task", e.target.value);
      setTask(e.target.value);
      const key = Object.keys(taskList).find((key) => taskList[key] === task);
      setTaskList((prevtask) => ({ ...prevtask, [key]: e.target.value }));
    } else {
      console.log("no edit task", task);
      setTask(e.target.value);
    }

    // setEdittask(false)
  };

  const handleTodoAdd = (e) => {
    if (edittask) {
    } else {
      console.log("length of tasklist", Object.keys(taskList).length);
      setTaskList((prev) => ({ ...prev, [uuidv4().slice(0, 8)]: task }));
      console.log("task", task);
      e.preventDefault();
    }
  };
  console.log("tasklist", taskList);
  return (
    <div class=" flex items-center h-screen  bg-customBlue">
      <div class="bg-white mx-auto max-w-sm rounded p-7">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 text-gray-700 text-center">
            ToDo App
          </div>
          <p class="text-gray-700 text-center text-xs">
            Add tasks to the app mark the status of the app.
          </p>
        </div>

        <div class="text-center mr-2 ml-2 my-2">
          <form>
            <label
              for="search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoAddSharp class="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                ref={editRef}
                type="search"
                id="search"
                class="block w-full  mb-4 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  class="text-gray-700 absolute end-1.5 bottom-1.5 bg-yellow-300  hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  clear
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleTodoAdd}
                  class="text-gray-700 absolute end-1.5 bottom-1.5 bg-yellow-300  hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        </div>

        <div class="text-center ">
         
          {taskList &&
            Object.entries(taskList).map(([key, value]) => (
              <div
                key={key}
                class="mb-2 p-1 flex flex-row justify-between rounded-lg text-center bg-slate-300 mr-2 ml-2"
              >
                <p class="text-gray-700 ml-3 text-sm">{value}</p>
                <div class="flex flex-row  bg-slate-300">
                  <CiEdit
                    class="mr-2 size-5 text-gray-700 dark:text-gray-400"
                    onClick={() => {
                      editRef.current.value = value;
                      setEdittask(true);
                      setTask(value);
                    }}
                  />

                  <AiOutlineDelete
                    class="mr-2 size-5 text-red-600 dark:text-gray-400"
                    onClick={() => {
                      console.log("deleting", key);
                      delete taskList[key], console.log("tasklist", taskList);
                    }}
                  />
                 <select onChange={(e)=>{console.log("Select",e.target.value)}}>
                  <option>Status</option>
                  <option value='Not Started'>Not Started</option>
                  <option value='In Progress'>In Progress</option>
                  <option value='Pending'>Pending</option>
                  <option value='Completed'>Completed</option>
                 
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
