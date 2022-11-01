import { useState, useRef } from 'react';
import './App.css';
import _ from "lodash";

function App() {
    const currentPlayer = useRef("X");
    const [count, setCount] = useState(0);
    const [xoState, setXoState] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]
    )
    const [verifyWin, setVerifyWin] = useState(false);
    const remach = () => {
        currentPlayer.current = "X";
        setCount(0);
        let newXoState = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        setVerifyWin(false);
        setXoState(newXoState);
    }
    const [display, setDisplay] = useState({display: "none"});
    const clickOk = () => {
        setDisplay({display: "none"});
    }
    const [winer, setWiner] = useState("");
    const win = () => {
        return (
                 <div className="alert" style = {display}>
                <h1 className="alert-h1">{winer}</h1>
                <button className="display-none" onClick={clickOk}>
                    Ok
                </button>
            </div>
        )
    }
    const hasWin = (player, xoState) => {
        //verify rows
        for (let row = 0; row < 3; ++row){
            if (
                xoState[row][0] === player && 
                xoState[row][1] === player &&
                xoState[row][2] === player
                )
                return true;
            }
            //verify columns
            for (let column = 0; column < 3; ++column){
            if (
                xoState[0][column] === player && 
                xoState[1][column] === player &&
                xoState[2][column] === player
                )
                return true;
            }
            //verify diagonals
            if (
            xoState[0][0] === player &&
            xoState[1][1] === player && 
            xoState[2][2] === player
        )
        return true;
            else if (
            xoState[0][2] === player && 
            xoState[1][1] === player &&
            xoState[2][0] === player
        )
            return true;
    }
    const click = (row, column) => {
        if (xoState[row][column] === "" && verifyWin === false){
        setCount(count+1);
        let newXoState = _.cloneDeep(xoState);
        newXoState[row][column] = currentPlayer.current;
        setXoState(newXoState);
        if (currentPlayer.current === "X") currentPlayer.current = "O";
        else currentPlayer.current = "X";
    if (hasWin("X", newXoState)){
        setWiner("Win is X")
        setVerifyWin(true);
        setDisplay({display: 'block'})
    }
    if (hasWin("O", newXoState)){
        setWiner("Win is O");
        setVerifyWin(true);
        setDisplay({display: 'block'})
    }    
    if (count >= 8){
        setWiner("It's Draw");
        setDisplay({display: 'block'})
    }
}   
}

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
            <h1 className='start'>Game</h1>
        <div className="xoGrid">
                {generateCells()}
                {win()}
        <button onClick={remach}>Remach</button>
        </div>
    </div>
  );
}

export default App;
