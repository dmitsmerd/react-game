import React from 'react';
import TheHeader from "./components/layout/TheHeader";
import Game from "./components/game/Game";
import TheFooter from "./components/layout/TheFooter";



export default function App () {
    return (
        <React.Fragment>
            <TheHeader/>
            <Game/>
            <TheFooter/>
        </React.Fragment>
    )
}