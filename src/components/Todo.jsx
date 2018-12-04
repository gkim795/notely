import React from 'react'
import styles from './Todo.css'

class Todo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todo: this.props.todo || [],
      value: '',
      count:  this.props.count,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if(props.todo.length !== state.todo.length) {
      return {
        todo: props.todo,
      }
    } return null;
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    let newTask = this.state.value
    let count = this.state.count +1
    
    let name = `task${count}`
    let taskToSubmit = JSON.stringify(newTask)
    localStorage.setItem(name, taskToSubmit)
    
    let todo = this.state.todo
    todo.push(newTask)


    this.setState({
      count: count,
      value:'',
      todo:todo
    })
 
  }

  render(){
    const tasks = this.props.todo;
    let count = this.state.count
    const items = tasks.map((task) => {
      return (
        <div id="task"> {task} <br/></div>
      )
    })
    return (
      <div id="todo" className={styles.todo}>
      <h4> Tasks of the Week </h4> 
      <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Submit" />
      </form>
      <ul>
      {items}
      </ul>
      <h5>To-Do : {count} </h5>
      </div>
    );
  }
}

export default Todo;
