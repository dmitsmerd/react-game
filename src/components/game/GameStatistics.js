import React from 'react'
import LocalStorageHandler from "../tools/LocalStorageHandler";

function GameStatistics ({ strikesCount = 0, lifesCount = 5 , missCount = 0}) {
    let bestResult = LocalStorageHandler();


    return (
        <aside className="game-field__stats aside">
            <h2 className="aside__heading">Статистика</h2>
            <div className="aside__container">
                <span className="aside__value">Попаданий: {strikesCount}</span>
                <span className="aside__value">Осталось жизней: {lifesCount}</span>
                <span className="aside__value">Промахов: {missCount}</span>
                <span className="aside__value">Лучший результат: {bestResult}</span>
            </div>
        </aside>
    )
}

export default GameStatistics