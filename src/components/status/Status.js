import React, {Component} from 'react';

const Status = props => {

    const   calculateWinner =(squares) =>{
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
	const { squares, xIsNext } = props,
		winner = calculateWinner(squares),
		effect = winner?'bounce':''; 
	let status;  

	if(winner) {
		status = 'Winner is: '+ winner;
	}else{
		status = 'Next player is: '+ (xIsNext?'x':'o');
	}
	return(
		<div className="game-info__status">
			<div className={'status '+effect}>{status}</div>
  		</div>
	); 
}

export default Status;