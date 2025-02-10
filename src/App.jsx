import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const handleSave = () => {
    if (todo.length == 0) {
      saveToLS()
      return;
    }
    settodos([...todos, { key: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS()
  }
  const handleEdit = (key) => {
    let idx = todos.findIndex((i) => {
      return i.key == key
    }
    )
    settodo(todos[idx].todo)
    let newTodos = todos.filter((item) => {
      return item.key != key
    }
    )
    settodos(newTodos)
    saveToLS()
  }
  const handleDelete = (key) => {
    let ans = confirm("Are You Sure That You Want To Delete The Task?")
    if (ans) {
      let newTodos = todos.filter((item) => {
        return item.key != key
      }
      )
      settodos(newTodos)
      saveToLS()
    }
  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let key = e.target.name
    let idx = todos.findIndex((i) => {
      return i.key == key
    }
    )
    let newTodos = [...todos]
    newTodos[idx].isCompleted = !newTodos[idx].isCompleted
    settodos(newTodos)
    saveToLS()
  }

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleFinshed = (params) => {
    if (!showFinished) {
      document.querySelector("label").style.color = "red"
    } else {
      document.querySelector("label").style.color = "black"
    }
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className='h-[80vh] bg-[#e3e9ff] my-5 mx-auto w-[95vw] rounded-2xl p-4 xl:p-8 space-y-7'>
        <div className='space-y-2'>
          <h2 className='font-bold text-2xl'>Add a Task</h2>
          <input type="text" placeholder='Enter a Task' value={todo} className='bg-white xl:w-1/2 w-full p-1 px-2 rounded-lg mr-4' onChange={handleChange} />
          <button className='bg-[#af7eeb] py-1 px-2 w-1/3 xl:w-fit rounded-lg text-white font-bold cursor-pointer transition-all hover:bg-violet-900' onClick={handleSave}>
            Save
          </button>
        </div>
        <div className='space-y-2 h-[80%]'>
          <div className='space-x-2'>
            <input type="checkbox" id='showFinished' onChange={handleFinshed} checked={showFinished} />
            <label htmlFor="showFinshed" className='label'>Show Finished</label>
          </div>
          <h2 className='font-bold text-2xl'>Your Tasks</h2>
          <div className='todo-container w-full xl:w-[65%] h-[70%]  xl:h-[80%] space-y-3  overflow-y-auto'>
            {(todos.length == 0) && <div className='text-red-500 font-semibold'>No Tasks To Display!!</div>}
            {todos.map(item => {
              return ((showFinished || !item.isCompleted) && <div key={item.key} className="bg-[#f2f2f2] flex justify-between py-2 px-3 rounded-lg">
                <div className='flex gap-2 w-[65%] sm:w-[85%] xl:w-[90%]'>
                  <input type="checkbox" name={item.key} checked={item.isCompleted} onChange={handleCheckbox} />
                  <p className={item.isCompleted ? "font-semibold capitalize text-lg w-[95%] p-2 break-words line-through" : "font-semibold capitalize text-lg w-[95%] p-2 break-words"}>{item.todo}</p>
                </div>
                <div className="buttons w-[75px] flex justify-between items-center text-white font-bold">
                  <button className='bg-[#af7eeb] p-1 pl-2 rounded-lg cursor-pointer transition-all hover:bg-violet-900' onClick={()=>handleEdit(item.key)}>
                    <FaEdit />
                  </button>
                  <button className='bg-[#af7eeb] p-1 rounded-lg cursor-pointer transition-all hover:bg-violet-900' onClick={()=>handleDelete(item.key)}>
                    <MdDelete />
                  </button>
                </div>
              </div>)
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
