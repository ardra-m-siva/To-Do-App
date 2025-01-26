
import { useEffect, useState } from 'react'
import './App.css'
import { deleteTodoDetailsAPI, getTodoDetailsAPI, saveTodoDetailsAPI, updateTodoDetailsAPI } from './services/allAPI'

function App() {
  const [allTodos, setAllTodos] = useState([])
  const [todoDetails, setTodoDetails] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: 0,
    completion: false
  })

  const [editTodoDetails, setEditTodoDetails] = useState({
    id:"",
    title: "",
    description: "",
    deadline: "",
    priority: 0,
    completion: false
  })

  useEffect(() => {
    getAllTodo()
  }, [])



  const handleAddButton = async () => {
    try {
      await saveTodoDetailsAPI(todoDetails)
      alert("Todo added successfullly")
      setTodoDetails({
        title: "",
        description: "",
        deadline: "",
        priority: 0,
        completion: false
      })
      getAllTodo()

    } catch (err) {
      console.log(err);

    }
  }

  const getAllTodo = async () => {
    try {
      const result = await getTodoDetailsAPI(todoDetails)
      setAllTodos(result.data)
      console.log(allTodos);

    } catch (err) {
      console.log(err);
    }
  }

  const handleTrash=async(id)=>{
    try {
       const result=await deleteTodoDetailsAPI(id)
       getAllTodo()
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit=async()=>{    
    try{
      await updateTodoDetailsAPI(editTodoDetails)
      alert("updation success")
      getAllTodo()
    }catch(err){
      console.log(err);
      
    }
  }

  const onCheckChange= async(value,item)=>{
    setTodoDetails({...item,completion:value})
    try{
      await updateTodoDetailsAPI(todoDetails)
      setTodoDetails({...item,completion:false})
      getAllTodo()
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <>
      <h1 className='text-center text-warning m-5'>Todo List</h1>
      <div className='d-flex justify-content-center mb-5'><button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-primary '>Add Todo</button></div>

      <div className='d-flex justify-content-center '>
        <table className='table w-75'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Completion Status</th>
              <th> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              allTodos?.length > 0 ?
                allTodos.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.deadline}</td>
                    <td>{item.priority}</td>
                    <td><input checked={item.completion} onChange={(e)=>onCheckChange(e.target.value,item)} className='text-center form-check-input border-black me-2' type="checkbox" aria-describedby="textHelp" />Status</td>
                    <td><button onClick={()=>setEditTodoDetails({id:item.id,title:item.title,description:item.description,deadline:item.deadline,priority:item.priority,completion:item.completion})} data-bs-toggle="modal" data-bs-target="#exampleModalEdit" className='btn'> <i class="fa-solid fa-pen-to-square text-primary"></i></button></td>
                    <td><button onClick={()=>handleTrash(item.id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button></td>
                  </tr>
                ))
                :
                <div className='text-danger'>No ToDos Yet</div>
            }

          </tbody>
        </table>
      </div>
      {/* modal 1 */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">ADD TODO</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <input onChange={(e) => setTodoDetails({ ...todoDetails, title: e.target.value })} type="text" class="form-control m-2" aria-describedby="textHelp" placeholder='Title' />
              <input onChange={(e) => setTodoDetails({ ...todoDetails, description: e.target.value })} type="text" class="form-control m-2" aria-describedby="textHelp" placeholder='Description' />
              <input onChange={(e) => setTodoDetails({ ...todoDetails, deadline: e.target.value })} type="date" class="form-control m-2" aria-describedby="textHelp" placeholder='Deadline' />
              <input onChange={(e) => setTodoDetails({ ...todoDetails, priority: e.target.value })} type="number" class="form-control m-2" aria-describedby="textHelp" placeholder='Priority Level' />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleAddButton} type="button" data-bs-dismiss="modal" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
      {/* modal 2 */}
      <div className="modal fade" id="exampleModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">ADD TODO</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <input value={editTodoDetails.title} onChange={(e) => setEditTodoDetails({ ...editTodoDetails, title: e.target.value })} type="text" class="form-control m-2" aria-describedby="textHelp" placeholder='Title' />
              <input value={editTodoDetails.description} onChange={(e) => setEditTodoDetails({ ...editTodoDetails, description: e.target.value })} type="text" class="form-control m-2" aria-describedby="textHelp" placeholder='Description' />
              <input value={editTodoDetails.deadline} onChange={(e) => setEditTodoDetails({ ...editTodoDetails, deadline: e.target.value })} type="date" class="form-control m-2" aria-describedby="textHelp" placeholder='Deadline' />
              <input value={editTodoDetails.priority} onChange={(e) => setEditTodoDetails({ ...editTodoDetails, priority: e.target.value })} type="number" class="form-control m-2" aria-describedby="textHelp" placeholder='Priority Level' />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleEdit} type="button" data-bs-dismiss="modal" className="btn btn-primary">save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
