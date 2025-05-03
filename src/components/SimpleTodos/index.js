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
    errorMessage: '',
  }
  
  componentDidMount() {
    // Load todos from localStorage when component mounts
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      this.setState({ todosList: JSON.parse(savedTodos) })
    }
  }
  
  // Save todos to localStorage whenever state updates
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todosList !== this.state.todosList) {
      localStorage.setItem('todos', JSON.stringify(this.state.todosList))
    }
  }

  handleAddTodo = () => {
    let {newTodoTitle, newTodoCount} = this.state
    
    // Check if the input is empty
    if (!newTodoTitle.trim()) {
      this.setState({ errorMessage: 'Please enter a todo title' })
      return
    }
    
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
      errorMessage: '',
    }))
  }

  handleChange = e => {
    // Clear error message when user types in the input field
    if (e.target.name === 'newTodoTitle' && this.state.errorMessage) {
      this.setState({
        [e.target.name]: e.target.value,
        errorMessage: '',
      })
    } else {
      this.setState({[e.target.name]: e.target.value})
    }
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
  
  updateTodoTitle = (id, newTitle) => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, title: newTitle} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  render() {
    const {todosList, newTodoTitle, newTodoCount, errorMessage} = this.state
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
              aria-label="Add todo"
            >
              Add
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <ul className="todos-list" aria-label="Todo list">
            {todosList.length > 0 ? (
              todosList.map(todo => (
                <TodoItem
                  key={todo.id}
                  todoDetails={todo}
                  deleteTodo={this.deleteTodo}
                  toggleComplete={this.toggleComplete}
                  updateTodoTitle={this.updateTodoTitle}
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
