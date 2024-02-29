import React from 'react'
import TodoItem from './TodoItem';


function TodoList({todos}) {
  return (
    <ul>
      {todos.map((todo)=> (
        <TodoItem todo={todo}/>
      ))}
    </ul>
  );
}

export default TodoList
