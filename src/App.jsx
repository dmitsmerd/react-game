import React from 'react';
import TheHeader from "./components/layout/TheHeader";
import Game from "./components/game/Game";
import TheFooter from "./components/layout/TheFooter";


const initialState = {
    isGameStarted: false,
    strikes: 0,
    life: 5,
    miss: 0,
    gameOver: false
}


export default function App () {
    return (
        <React.Fragment>
            <TheHeader/>
            <Game initialState={initialState}/>
            <TheFooter/>
        </React.Fragment>
    )
}