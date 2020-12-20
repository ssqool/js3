import React, {Component} from 'react'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('asd')

    this.state = {
      title: 'My first app',
      value: '',
      toDos: [
        {name: 'a', done: false},
        {name: 'b', done: false},
        {name: 'c', done: false}
      ]
    }
  }

  addToDo() {
    // console.log(this.state.toDos)
    const toAdd = {
      name: this.state.value,
      done: false
    }
    const toDos = [...this.state.toDos, toAdd]
    this.setState({toDos});
    // console.log(toDos)
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  removeToDo(item) {
    const toDos = this.state.toDos.concat()
    toDos.splice(item, 1)
    this.setState({toDos})
  }

  addToDone(item) {
    const toDos = this.state.toDos.concat()
    toDos[item].done === true
      ? toDos[item].done = false
      : toDos[item].done = true
    this.setState({toDos})
    console.log(toDos)
  }

  render() {
    console.log(this.state.toDos)
    return (
      <div className={'wrapper'}>
        <h1>{this.state.title}</h1>
        <div className={'add-wrapper'}>
          <input className={'add-input'} type="text" value={this.state.value} onChange={this.handleChange}/>
          <button className={'add-button'} style={{matginTop: 20}} onClick={this.addToDo.bind(this)}>+</button>
        </div>
        <div className={'todo-wrapper'}>
          {this.state.toDos
            ? this.state.toDos.map((todo, item) => {
              return(
                <div className={'todo-item'} key={item}>
                  <div className={todo.done ? 'todo done' : 'todo'}>
                    {todo.name}
                  </div>
                  <input
                    type={"checkbox"}
                    className={"scales"}
                    onClick={this.addToDone.bind(this, item)}
                  />
                </div>
              )
            })
            : null}
        </div>
      </div>
    )
  }
}

export default App;
