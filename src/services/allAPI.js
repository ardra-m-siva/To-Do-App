import commonAPI from "./commonAPI"
import serverURL from "./serverURL"


export const saveTodoDetailsAPI= async (todoDetails)=>{
    return await commonAPI("POST",`${serverURL}/AllTodos`,todoDetails)
}


export const getTodoDetailsAPI= async ()=>{
    return await commonAPI("GET",`${serverURL}/AllTodos`,"")
}

export const deleteTodoDetailsAPI= async (id)=>{
    return await commonAPI("DELETE",`${serverURL}/AllTodos/${id}`,{})
}

export const updateTodoDetailsAPI= async (todoDetails)=>{
    return await commonAPI("PUT",`${serverURL}/AllTodos/${todoDetails.id}`,todoDetails)
}