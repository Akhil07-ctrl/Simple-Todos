// Write your code here
import {Component} from 'react'

import './index.css'

class TodoItem extends Component {
  state = {
    editing: false,
    updatedTitle: '',
  }

  handleEdit = () => {
    const {todoDetails} = this.props
    this.setState({editing: true, updatedTitle: todoDetails.title})
  }

  handleSave = () => {
    // const {todoDetails} = this.props
    // const {updatedTitle} = this.state
    this.setState({editing: false})
    // Call a function to save updated title (not implemented in this code)
  }

  handleChange = e => {
    this.setState({updatedTitle: e.target.value})
  }

  render() {
    const {todoDetails, deleteTodo, toggleComplete} = this.props
    const {editing, updatedTitle} = this.state
    return (
      <li
        className={todoDetails.completed ? 'todo-item completed' : 'todo-item'}
      >
        {editing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={this.handleChange}
              aria-label="Edit todo title"
              autoFocus
            />
            <button 
              onClick={this.handleSave} 
              type="button"
              aria-label="Save changes"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={todoDetails.completed}
              onChange={() => toggleComplete(todoDetails.id)}
              aria-label={`Mark ${todoDetails.completed ? 'incomplete' : 'complete'}`}
            />
            <p className="title" data-testid="todo-title">
              {todoDetails.title}
            </p>
            <div className="button-group">
              <button 
                onClick={this.handleEdit} 
                type="button"
                aria-label="Edit todo"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteTodo(todoDetails.id)} 
                type="button"
                aria-label="Delete todo"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </li>
    )
  }
}

export default TodoItem
