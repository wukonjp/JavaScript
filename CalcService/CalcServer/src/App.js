import './App.css';
import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      operationText: 'サーバーに接続中・・・',
      displayText: ''
    };
  }

  componentDidMount() {
    this.PostAction('', '');
  }

 PostAction(commandValue, paramValue) {
    const headersData = {
      "Content-Type": "application/json"
    };
    const bodyData = {
      command: commandValue,
      param: paramValue
    };
    const params = {
      method: "POST",
      headers: headersData,
      body: JSON.stringify(bodyData),
    };
    fetch("http://localhost:8080", params)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      this.setState({
        displayText: json.display,
        operationText: json.operation
      });
    })
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div id="grid">
          <div id="display">
              <div id="operationText">{this.state.operationText}</div>
              <div id="displayText">{this.state.displayText}</div>
          </div>
          <button id="Num0" className="number horizontal" type="button" onClick={() => this.PostAction('Number', '0')}>０</button>
          <button id="Num1" className="number square" type="button" onClick={() => this.PostAction('Number', '1')}>１</button>
          <button id="Num2" className="number square" type="button" onClick={() => this.PostAction('Number', '2')}>２</button>
          <button id="Num3" className="number square" type="button" onClick={() => this.PostAction('Number', '3')}>３</button>
          <button id="Num4" className="number square" type="button" onClick={() => this.PostAction('Number', '4')}>４</button>
          <button id="Num5" className="number square" type="button" onClick={() => this.PostAction('Number', '5')}>５</button>
          <button id="Num6" className="number square" type="button" onClick={() => this.PostAction('Number', '6')}>６</button>
          <button id="Num7" className="number square" type="button" onClick={() => this.PostAction('Number', '7')}>７</button>
          <button id="Num8" className="number square" type="button" onClick={() => this.PostAction('Number', '8')}>８</button>
          <button id="Num9" className="number square" type="button" onClick={() => this.PostAction('Number', '9')}>９</button>
          <button id="Dot" className="number square" type="button" onClick={() => this.PostAction('Number', '.')}>．</button>
          <button id="Add" className="operator vertical" type="button" onClick={() => this.PostAction('Operator', '+')}>＋</button>
          <button id="Subtract" className="operator square" type="button" onClick={() => this.PostAction('Operator', '-')}>－</button>
          <button id="Multiply" className="operator square" type="button" onClick={() => this.PostAction('Operator', '*')}>×</button>
          <button id="Divide" className="operator square" type="button" onClick={() => this.PostAction('Operator', '/')}>÷</button>
          <button id="Clear" className="action square" type="button" onClick={() => this.PostAction('Clear', '')}>Ｃ</button>
          <button id="Equal" className="action vertical" type="button" onClick={() => this.PostAction('Equal', '')}>＝</button>
          <button id="Rate75" className="rate square" type="button" onClick={() => this.PostAction('Rate', '75')}>75%</button>
          <button id="Rate70" className="rate square" type="button" onClick={() => this.PostAction('Rate', '70')}>70%</button>
          <button id="Rate65" className="rate square" type="button" onClick={() => this.PostAction('Rate', '65')}>65%</button>
          <button id="Rate60" className="rate square" type="button" onClick={() => this.PostAction('Rate', '60')}>60%</button>
          <button id="Rate55" className="rate square" type="button" onClick={() => this.PostAction('Rate', '55')}>55%</button>
      </div>
    );
  }
}