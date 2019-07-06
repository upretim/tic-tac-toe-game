import React, {Component} from 'react';
import './Game.css';
import Status from './components/status/Status';
import Moves from './components/moves/Moves';
import Board from './components/board/Board'

class Game extends Component {

	constructor(props){
		super(props); 
		this.state = {
			history: [{ 
				squares:Array(9).fill(null), 
				clickIndex:null  
			}],
			xIsNext: true,
      		stepNumber: 0
		};
	}

	handleClick =(i) =>{
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if(squares[i] || this.calculateWinner(squares)) {
			return;
		}
		squares[i] = this.state.xIsNext?'x':'o';
		this.setState({
			history		: history.concat([{ squares:squares, clickIndex:i }]),
      		stepNumber	: history.length,
			xIsNext		: !this.state.xIsNext
		});
	}
	jumpTo = (step) =>{
	    this.setState({
	      stepNumber: step,
	      xIsNext: (step % 2) === 0
	    });
  }
  
   calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
	
	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const squares = current.squares.slice();

		return(
			<div className="game">
				<div className="game-board">
					<Board squares={squares} onClick={this.handleClick} cells={[0,1,2,3,4,5,6,7,8]} />
				</div>
				<div className="game-info">
					<Status squares={ squares } xIsNext={ this.state.xIsNext } />
					<Moves history={ this.state.history } stepNumber={ this.state.stepNumber } onClick={this.jumpTo} /> 
				</div>
			</div>
		);
	}
}
export default Game;
