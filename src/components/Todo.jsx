import React from 'react'
import styles from './Todo.css'

class Todo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todo: this.props.todo || [{task: 'Loading'}],
      value: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({value: event.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    let currentTodo = this.state.todo
    let newTask = {
      status: false,
      task: this.state.value,
      urgent: false,
    }
    let newTodo = currentTodo.concat(newTask)

    this.setState({
      value:'',
      todo:newTodo
    })
    
    const count = Object.keys(this.state.todo).length
    
    e.target.value ='';
    window.localStorage.setItem(count, JSON.stringify(newTask))
  }

  render(){
    const tasks = this.state.todo;
    const count = Object.keys(tasks).length
    const items = tasks.map((task) => {
      return (
        <tr>
        <td> {task.task} </td>
        <td> {task.status? 'Pending':'Completed'} </td>
        <td> {task.urgent? 'Urgent': 'Mild'} </td>
        </tr>
      )
    })
    return (
      <div id="todo" className={styles.todo}>
      <h4> Tasks of the Week </h4>
      <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
        <label>
          Urgent:
        </label>
          <input type="checkbox" name="urgent"/>
        <input type="submit" value="Submit" />
      </form>
      <table>
      <tr>
      <th> Task </th>
      <th> Status </th>
      <th> Urgent </th>
      </tr>
      {items}
      </table>
      <h5>To-Do : {count} </h5>
      </div>
    );
  }
}

export default Todo;
