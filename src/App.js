import React, { useEffect } from "react";
import TodoList from "./Todo/Todolist";
import Context from "./context";
// import AddTodo from "./Todo/AddTodo";
import Loader from "./Loader";
import Modal from "./Modal/Modal";


const AddTodo = React.lazy(() => import('./Todo/AddTodo'))

// {id:1, completed: false, title: 'Купить хлеб'},
// {id:2, completed: false, title: 'Купить масло'},
// {id:3, completed: false, title: 'Купить молоко'}

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(todos => { 
        setTimeout(() => {
          setLoading(false)
          setTodos(todos)
        }, 2000)
        
      })
  }, [])

// useEffect(() => {
//   (async () => {
//     let response = await fetch ('https://jsonplaceholder.typicode.com/todos?_limit=10')
//     // console.log(response.json())
//     let todos = await response.json()
//     setTodos(todos)      
// })() 
// }, [])

  function toggleTodo(id) {
   setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }))
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false
    }]))
  }

  return (
    <Context.Provider value={ {removeTodo} }>
   <div className="wrapper">
     <h1>React tutorial</h1>
     <Modal/>
     <React.Suspense fallback={<p>Loading...</p>}>
        <AddTodo onCreate={addTodo}/>
     </React.Suspense>
     {loading && <Loader/>}
     {todos.length 
      ? <TodoList todos={todos} onToggle={toggleTodo}/> 
      : loading ? null : <p>No todos!</p>}
     
   </div>
   </Context.Provider>
  );
}

export default App;
