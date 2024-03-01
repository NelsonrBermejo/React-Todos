import React, { useState, useRef, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuidv4'
import { v4 as uuidv4 } from 'uuid'; 
import TodoList from './components/TodoList'


const KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task:"Tarea 1", completed: false},
  ]);


 /**
 * Referencia utilizada para acceder al elemento de entrada de texto de la tarea.
 * 
 * Esta referencia se utiliza para acceder al elemento de entrada de texto de la tarea 
 * en el DOM, lo que permite leer su valor o realizar acciones como el enfoque programático.
 */
  const todoTaskRef = useRef();

  /**
 * Carga las tareas almacenadas en el localStorage al iniciar el componente.
 * 
 * Este hook de efecto se ejecuta una vez, al iniciar el componente, para cargar las tareas previamente
 * almacenadas en el localStorage. Si existen tareas almacenadas, las carga en el estado de las tareas.
 */
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if(storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  /**
 * Actualiza las tareas almacenadas en el localStorage cuando cambia el estado de las tareas.
 * 
 * Este hook de efecto se ejecuta cada vez que el estado de las tareas cambia. 
 * Actualiza el localStorage con la lista de tareas actualizada en formato JSON.
 * Esto asegura que las tareas se guarden persistentemente en el navegador.
 */
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);


  /**
 * Alternar el estado de completitud de una tarea identificada por su ID.
 * 
 * @param {number} id - El ID de la tarea que se va a alternar.
 */
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find ((todo) => todo.id === id);
    todo.completed = !todo.completed;
     setTodos(newTodos);
  };



  /**
 * Agrega una nueva tarea a la lista de tareas.
 * 
 * Esta función toma la descripción de la nueva tarea del input actual.
 * Si la descripción está vacía, la función no realiza ninguna acción.
 * Después de agregar la tarea, restablece el valor del input a null.
 */
  const handleTodoAdd = () => {
  const task = todoTaskRef.current.value;
  if (task === '') return;

  setTodos((prevTodos) => {
    return [...prevTodos, {id: uuidv4(), task, completed: false}]
  })

  todoTaskRef.current.value = null;
  };

  /**
 * Elimina todas las tareas completadas de la lista de tareas.
 * 
 * Esta función filtra todas las tareas completadas del estado actual
 * y actualiza el estado con la nueva lista de tareas.
 */
  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.completed);

    setTodos(newTodos);
  };

  /**
 * Muestra el número de tareas pendientes por completar.
 * 
 * Este componente muestra el recuento de tareas pendientes por completar.
 * Calcula el número de tareas pendientes filtrando las tareas no completadas del estado.
 * <div>
  Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar
  </div>
 */

  return (
    <>
      <TodoList todos={todos} toggleTodo = {toggleTodo}/>
      <input ref={todoTaskRef} type="text" placeholder='Nueva Tarea' />
      <button onClick={handleTodoAdd}>Agregar</button>
      <button onClick={handleClearAll}>Eliminar</button>
      <div>
        Te quedan {todos.filter((todo) =>!todo.completed).length} tareas por terminar
      </div>
  </>
  );
}

export default App
