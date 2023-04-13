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
      <ul className="list-group">
        {props.todos.map((todo, index) => (
          <li key={todo.id} className="list-group-item">
            <div className="row">
              <div className="col-10">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => props.completeTodo(todo.id)}
                    checked={todo.isComplete ? true : false}
                  />

                  {!todo.isEditing ? (
                    <p
                      onDoubleClick={() => props.markAsEditing(todo.id)}
                      className={todo.isComplete ? 'line-through' : ''}
                    >
                      {todo.title}
                    </p>
                  ) : (
                    <input
                      type="text"
                      className="form-control"
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
              </div>
              <div className="col-2">
                <button type="button" class="btn-close delete" aria-label="Close" onClick={() => props.deleteTodo(todo.id)}></button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <button type="button" onClick={props.completeAllTodos} className="btn btn-secondary check-all">Check All</button>
      </div>
      <span>{props.remaining()} items remaining</span>
    </>
  );
}

export default TodoList;