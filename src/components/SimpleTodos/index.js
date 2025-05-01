import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  state = {
    todosList: [
      {id: 1, title: 'Book the ticket for today evening', completed: false},
      {
        id: 2,
        title: 'Rent the movie for tomorrow movie night',
        completed: false,
      },
      {
        id: 3,
        title: 'Confirm the slot for the yoga session tomorrow morning',
        completed: false,
      },
      {id: 4, title: 'Drop the parcel at Bloomingdale', completed: false},
      {id: 5, title: 'Order fruits on Big Basket', completed: false},
      {id: 6, title: 'Fix the production issue', completed: false},
      {id: 7, title: 'Confirm my slot for Saturday Night', completed: false},
      {id: 8, title: 'Get essentials for Sunday car wash', completed: false},
    ],
    newTodoTitle: '',
    newTodoCount: 1,
  }

  handleAddTodo = () => {
    let {newTodoTitle, newTodoCount} = this.state
    
    // Check if the input contains a number at the end
    const match = newTodoTitle.match(/^(.*?)(\d+)$/)
    let title = newTodoTitle
    let count = newTodoCount
    
    if (match) {
      // If there's a number at the end of the input, use it as the count
      title = match[1].trim()
      count = parseInt(match[2], 10)
    }
    
    const newTodos = Array.from({length: count}, (_, i) => ({
      id: Date.now() + i,
      title: title,
      completed: false,
    }))
    
    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      newTodoTitle: '',
      newTodoCount: 1,
    }))
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: updatedTodoList})
  }

  toggleComplete = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  render() {
    const {todosList, newTodoTitle, newTodoCount} = this.state
    return (
      <div className="container">
        <div className="inner-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo">
            <input
              min="1"
              max="10"
              type="text"
              name="newTodoTitle"
              value={newTodoTitle}
              onChange={this.handleChange}
              placeholder="Enter todo title"
              aria-label="Todo title"
            />
            <input
              type="number"
              name="newTodoCount"
              value={newTodoCount}
              onChange={this.handleChange}
              placeholder="Count"
              aria-label="Number of todos to add"
              min="1"
            />
            <button 
              onClick={this.handleAddTodo} 
              type="button"
              disabled={!newTodoTitle.trim()}
              aria-label="Add todo"
            >
              Add
            </button>
          </div>
          <ul className="todos-list" aria-label="Todo list">
            {todosList.length > 0 ? (
              todosList.map(todo => (
                <TodoItem
                  key={todo.id}
                  todoDetails={todo}
                  deleteTodo={this.deleteTodo}
                  toggleComplete={this.toggleComplete}
                />
              ))
            ) : (
              <li className="empty-list">No todos yet. Add one above!</li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
