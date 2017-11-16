import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Board, isValidMove, getWinner } from './helpers';

class App extends Component {

  state = {
    board: new Board().squares.map(_ => new Board()),
    activeBoard: -1,

    // TODO: delete state below this line
    iBoard: 0,
    iSquare: 0,
    token: 'x',
  }



  take = (iBoard, iSquare, token) => {
    let board = this.state.board[ iBoard ];
    let square = board.squares[ iSquare ];
    const { activeBoard } = this.state;

    if(!isValidMove(board, activeBoard, iBoard, square)) {
      return false;
    }

    // the space is available and the board is unwon, so let's update state
    let newBoard = [...this.state.board];
    newBoard[ iBoard ].squares[ iSquare ] = token;

    let result = getWinner(board, token);
    if(result.winner) {
      newBoard[ iBoard ].winner = result.winner;
      newBoard[ iBoard ].winningLine = result.winningLine;
    }

    this.setState(state => ({
      board: newBoard,
      activeBoard: iSquare,
      iBoard: iSquare,
      token: state.token === 'x' ? 'o' : 'x',
    }))
    return true;
  }

  render() {
    const { iBoard, iSquare, token } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-controls">
          <input type="number" value={iBoard} onChange={event => this.setState({iBoard: event.target.value})} min="0" max="8" step="1" />
          <input type="number" value={iSquare} onChange={event => this.setState({iSquare: event.target.value})} min="0" max="8" step="1" />
          <input type="text" value={token} onChange={event => this.setState({token: event.target.value})} size="2" />
          <button onClick={() => this.take(iBoard, iSquare, token)}>
            Take
          </button>
        </p>
        <pre className="App-intro">
          <hr />
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    );
  }
}

export default App;
