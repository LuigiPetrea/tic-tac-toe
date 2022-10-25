import { useState, useRef } from 'react';
import './App.css';
import _ from "lodash";

function App() {
    const currentPlayer = useRef("X");
    const click = (row, column) => {
    let newXoState = _.cloneDeep(xoState);
        newXoState[row][column] = currentPlayer.current;
        setXoState(newXoState);
        if (currentPlayer.current === "X"){
            currentPlayer.current = "O";
        }else{
            currentPlayer.current = "X";
        }
    }
    const [xoState, setXoState] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]

    );

    const generateCells = () => {
        let cellsArray = [];
        for(let row = 0; row < 3; ++row){
            for (let column = 0; column < 3; ++column){
                cellsArray.push(
                    <div className='cell' style={{gridColumnStart: column + 1, gridRowStart: row + 1}} onClick= {() => click (row, column)}>
                    {xoState[row][column]}
                    </div> 
                )
            }
        }
        return cellsArray;
    }
    return (
        <div className="App">
            <h1 align="center">X & O</h1>
        <div className='game'>
        <div className="xoGrid">
                {generateCells()}
        </div>
    </div>
    </div>
  );
}

export default App;
