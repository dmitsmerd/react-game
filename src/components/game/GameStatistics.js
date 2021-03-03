import React from 'react'

function GameStatistics ({ strikesCount = 0 }) {

    return (
        <aside className="game-field__stats aside">
            <h2 className="aside__heading">Статистика</h2>
            <div className="aside__container">
                <span className="aside__value">Попадания: {strikesCount}</span>
                <span className="aside__value">Попадания: {strikesCount}</span>
                <span className="aside__value">Попадания: {strikesCount}</span>
            </div>
        </aside>
    )
}

export default GameStatistics