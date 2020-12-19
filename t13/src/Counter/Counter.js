import React from 'react'
import Auxiliary from "../hoc/Axuiliary";


export default class Counter extends React.Component {

  state = {
    counter: 0
  }

  //prevState защищает от асинхронного изменения state
  addCounter = () => {
    this.setState((prevState) => {
      return {
        counter: prevState.counter + 1
      }
    })
  }

  render() {
    return (
      // мы можем вместо div использовать Fragment или Auxiliary(если не хотим лишнюю div обёртку)
      <Auxiliary>
        <h2>Counter {this.state.counter }</h2>
        <button onClick={this.addCounter}>+</button>
        {/*использование setState также возможно в jsx*/}
        <button onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
      </Auxiliary>
    )

    // /*использование setState также возможно в jsx*/
    // // Убираем div обёртку и заменяем его на массив
    // return [
    //     <h2>Counter {this.state.counter }</h2>,
    //     <button onClick={this.addCounter}>+</button>,
    //     <button onClick={() => this.setState({counter: this.state.counter - 1})}>-</button>
    // ]
  }

}