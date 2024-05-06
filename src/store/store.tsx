import {create} from 'zustand';

interface Task {
    id:number,
    task:String,
    completed:Boolean
}

interface TaskStore{
    task:Task[],
    setTasks: (tasks:Task[]) => void,
    toggleTask: (id:number) => void,
    deleteTask: (taskId: number) => void;
}

export const useTaskStore = create<TaskStore>((set)=>({
    task:[],
    setTasks:(tasks) => set((state)=>({
        task:[...state.task, ...tasks]
    })),
    toggleTask:(taskId)=>
     set((state)=>({
        task:state.task.map((task)=>
        task.id === taskId?{...task,completed:true}:task
        )
     })),
     deleteTask:(taskId)=> set((state)=>({
        task:state.task.filter((task) => task.id !== taskId)
     }))
}))