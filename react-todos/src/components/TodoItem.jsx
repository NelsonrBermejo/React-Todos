import React from 'react'

function TodoItem({todo}) {
    const {id, task, completed } = todo;
  return <li>{task}</li>;
}

export default TodoItem
