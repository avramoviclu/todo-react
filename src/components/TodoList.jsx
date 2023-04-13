import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remaining: PropTypes.func.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
};

function TodoList(props) {
  return (
    <>
      <ul>
        {props.todos.map((todo, index) => (
          <li key={todo.id}>
            <div>
              <input
                type="checkbox"
                onChange={() => props.completeTodo(todo.id)}
                checked={todo.isComplete ? true : false}
              />

              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => props.markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  onBlur={event => props.updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      props.updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      props.cancelEdit(event, todo.id);
                    }
                  }}
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button
              onClick={() => props.deleteTodo(todo.id)}
            >
            </button>
          </li>
        ))}
      </ul>

      <div>
        <div>
          <button onClick={props.completeAllTodos} >Check All</button>
        </div>

        <span>{props.remaining()} items remaining</span>
      </div>
    </>
  );
}

export default TodoList;