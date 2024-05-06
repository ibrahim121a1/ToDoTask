import React from 'react';
import './App.css';
import { useForm } from 'react-hook-form';
import check from "../src/check.png";
import completecheck from "../src/check-mark.png";
import deleteIcon from "../src/delete.png";
import { useTaskStore } from './store/store';
import { log } from 'console';

export default function App() {

  const { task, setTasks, toggleTask,deleteTask } = useTaskStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <>
      <h1 className="font-bold mx-5 my-5 text-3xl">
        To Do List Task
      </h1>
      <form onSubmit={handleSubmit((data) => setTasks([{ id: task.length + 1, task: data?.task, completed: false }])
      )} className='mx-5'>
        <label>
          Please enter your task
          <br />
          <input {...register('task', { required: true })} className='border-2 border-black' placeholder='task' />
        </label>
        {errors.task && <h1 className='text-rose-700'>task is required.</h1>}
        <input className='bg-black text-white mx-5 px-5' type='submit' value='submit' />
      </form>
      {
        task.length > 0 ? (
          <>
            <h1 className='font-bold mx-5 my-5'>Your task are</h1>
            <div className='flex'>
              <div className='w-1/2 '>
                <h1 className='font-bold mx-5 my-5'>Pending task</h1>
                <ul>
                  {task.map((res, index) => {
                    return (
                      res.completed === false ? (
                        <div key={index} className='flex bg-white mx-5 my-5 shadow-lg shadow-black items-center p-3 rounded-sm'>
                          <li>{res.task}</li>
                          <div className='flex ml-auto'>
                            <img onClick={()=>{
                              toggleTask(res?.id)
                              
                            }} className='size-4 mr-1' src={completecheck} alt="Please Complete" />
                            <img onClick={()=>
                            {
                              deleteTask(res?.id)
                            }
} className='size-4 mr-1' src={deleteIcon} alt="Delete icon" />
                          </div>

                        </div>

                      ) : (
                        null
                      )
                    );
                  })}
                </ul>
              </div>

              <div className='w-1/2 '>
                <h1 className='font-bold mx-5 my-5'>Completed task</h1>
                <ul>
                  {task.map((res, index) => {
                    return (
                      res.completed === true ? (
                        <div key={index} className='flex bg-white mx-5 my-5 shadow-lg shadow-black items-center p-3 rounded-sm'>
                        <li>{res.task}</li>
                        <div className='flex ml-auto'>
                          <img className='size-4 mr-1' src={check} alt="Please Complete" />
                          <img onClick={()=>
                          deleteTask(res?.id)
} className='size-4 mr-1' src={deleteIcon} alt="Please Complete" />
                        </div>

                      </div>
                      ) : (
                        null
                      )
                    );
                  })}
                </ul>
              </div>
            </div>


          </>

        ) : null
      }
    </>


  )
}
