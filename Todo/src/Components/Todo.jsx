import { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const Todo = () => {

    const [task,setTask]=useState()
    const [taskList,setTaskList]=useState([])

    const todoHandler=(e)=>{
        setTask(e.target.value)
        console.log("task added",task)
    }

    const handleTodoAdd=(e)=>{
       
     
        setTaskList([...taskList,task])
        console.log("task",task)
        
        e.preventDefault() 
    }
    console.log("tasklist",taskList)
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
            <IoAddSharp class="w-4 h-4 text-gray-500 dark:text-gray-400"/>
             
            </div>
            <input
              type="search"
              id="search"
              class="block w-full  mb-4 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
             
              onChange={(e)=>todoHandler(e)}
              required
            />
            <button
              type="submit"
              onClick={handleTodoAdd}
              class="text-white absolute end-1.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form>


        </div>
        
        <div class="text-center ">
            {taskList&&(taskList.map((task)=>(<div class="mb-2 p-1 flex flex-row justify-between rounded-lg text-center bg-slate-300 mr-2 ml-2">
            <p>{task}</p>
            <div class="flex flex-row  bg-slate-300">
            <CiEdit class="mr-2 size-5 text-gray-700 dark:text-gray-400"/>
             
            <AiOutlineDelete class="size-5 text-red-600 dark:text-gray-400"/>
             
            </div>
            
        </div>)))}
        </div>
    
        <div class="text-center">
          <button class="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
