import React, {Component} from 'react'
import './App.css';
import Car from "./Car/Car";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
import Counter  from "./Counter/Counter";

class App extends Component{

  constructor(props) {
    console.log('App constructor - первая функция которая вызывается при создании React компонента(относится к API JS)')
    super(props);

    // создаем стэйт
    this.state = {
      cars: [
        {name: 'Ford', year: 2018},
        // {name: 'BMW', year: 2015},
        // {name: 'Mazda', year: 2020}
      ],
      pageTitle: 'React components!',
      showCars: false
    }
  }

  // //описываем событие(handle)
  // changeTitleHadnler = (pageTitle) => {
  //   //изменяем state, мутировать state НЕЛЬЗЯ!!!(изменять напрямую без this.setState)
  //   //pageTitle совпадает с названием поля поэтому можем его не указывать
  //   this.setState({pageTitle})
  // }
  toggleCarsHandler = () => {
    this.setState({
      showCars: !this.state.showCars
    })
  }

  onChangeName(name, index) {
    const car = this.state.cars[index]
    car.name = name
    const cars = [...this.state.cars]
    cars[index] = car
    this.setState({cars})//тоже самое что: cars: cars
  }

  deleteHandler(item) {
    const cars = this.state.cars.concat()
    cars.splice(item, 1)
    this.setState({cars})
  }

  // componentWillMount() {
  //   console.log('App componentWillMount - Произошла инициализция React компонента и он готов быть за рендереным')
  // }

  componentDidMount() {
    console.log('App componentDidMount - сообщается что весь HTML Reacta готов и теперь можем его преобразовывать')
  }

  // функция рендера пишется снизу потому что содержит в себе шаблон.
  // Методы описываются выше чтобы удобней было ориентироватся
  render() {
    console.log('render - формирует конечный jsx котороый в конечном итоге будет представлен в виде HTML ')
    const divStyle = {
      textAlign: 'center'
    }
      // const cars = this.state.cars;

      return (
        // добавляем стиль к диву
        <div style={divStyle}>
          {/*<h1>{this.state.pageTitle}</h1>*/}
          {/*Чтобы получить свойства входят в App компонент исользуем: this*/}
          {/*Чтобы получить доступ к свойства которые передаем в App компонент: props.titel*/}
          <h1>{this.props.title}</h1>
          {/*используем CamelCase*/}
          {/*после название функции не нужно использовать: "()" чтобы метод не был вызван сразу же*/}

          <Counter />

          <hr />

          {/*/!*метод bind будет возвращать новую функцию но вызывать её*!/*/}
          {/*<button onClick={this.changeTitleHadnler.bind(this, 'changed')}>Change title</button>*/}
          <button style={{marginTop: 20}} onClick={this.toggleCarsHandler}>Toggle Cars</button>

          {/*if, while запрещенны в jsx, но разрешены тернарники, поэтому:*/}
          {this.state.showCars
            ? this.state.cars.map((car,item) => {
              return(
                // key - должен быть в корневом элементе
                <ErrorBoundary key={item}>
                  <Car
                    // title={this.props.title}
                    name={car.name}
                    year={car.year}
                    onDelete={this.deleteHandler.bind(this, item)}
                    onChangeName={(event) => this.onChangeName(event.target.value, item)}
                  />
                </ErrorBoundary>
                )
              })
            : null }


          {/*<Car*/}
          {/*  name={cars[0].name}*/}
          {/*  year={cars[0].year}*/}
          {/*  // если хотим передать события внутрь компонента*/}
          {/*  // с помощью bind привязываем контекст вызова*/}
          {/*  // bind(1.параметр контекст: this, 2.параметр: то что мы хотим передать)*/}
          {/*  onChangeTitle={this.changeTitleHadnler.bind(this, cars[0].name)}*/}
          {/*/>*/}
          {/*<Car*/}
          {/*  name={cars[1].name}*/}
          {/*  year={cars[1].year}*/}
          {/*  //в качестве параметра мы должны передать ссылку на функцию но не вызывать её*/}
          {/*  //поэтому передаем функцию которая будет вызывать другую функцию*/}
          {/*  //МЕТОД С ИСПОЛЬЗОВАНИЕМ bind БОЛЕЕ ПРАВИЛЬНЫЙ занимает меньше ресурсов*/}
          {/*  //формирует функцию внутри которой ешё одна функция*/}
          {/*  onChangeTitle={() => this.changeTitleHadnler(cars[1].name)}*/}
          {/*/>*/}
          {/*<Car*/}
          {/*  name={cars[2].name}*/}
          {/*  year={cars[2].year}*/}
          {/*  onChangeTitle={() => this.changeTitleHadnler(cars[2].name)}*/}
          {/*/>*/}
        </div>
      );
    }
}

export default App;
