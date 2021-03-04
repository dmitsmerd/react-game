import React from 'react';
import GameStatistics from "./GameStatistics";
import GameSettings from "./GameSettings";
import GameTarget from "./GameTarget"
import StartButton from "../UI/StartButton";
import LocalStorageHandler from "../tools/LocalStorageHandler";

 class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props.initialState, targets: []}


        this.handleStrike = this.handleStrike.bind(this)
        this.observeStart = this.observeStart.bind(this)
        this.toggleStart = this.toggleStart.bind(this)
        this.handleMiss = this.handleMiss.bind(this)
        this.gameOverHandler = this.gameOverHandler.bind(this)
    }

    componentDidMount() {
        let container = document.querySelector('.game-field__field')
        let w = window.getComputedStyle(container).getPropertyValue('width')
        let h = window.getComputedStyle(container).getPropertyValue('height')
        console.log(w, h)
    }

     toggleStart (bool) {
        this.setState({...this.state, isGameStarted: bool})
    }

    observeStart () {
        if (this.state.isGameStarted) {
            return <GameTarget />
        } else {
            return <StartButton isGameStarted={this.state.isGameStarted}/>
        }
    }

    handleStrike (e) {
        e.stopPropagation()
        this.setState({...this.state, strikes: this.state.strikes + 1})
        //Логика по удалению текущей цели и поставке следующей
    }

    handleMiss () {
        if (!this.state.isGameStarted) {
            return
        }
        this.setState({...this.state, life: this.state.life - 1,  miss: this.state.miss + 1})
        if (this.state.life === 0) {
            this.gameOverHandler()
        }
    }

    gameOverHandler () {
        alert(`Вы програли. Ваш счет: ${this.state.strikes}.`)
        this.setState({...this.props.initialState, gameOver: true})
        LocalStorageHandler({best: this.state.strikes})
    }

    render () {
        return (
            <section className="game-field">
                <GameStatistics
                    strikesCount={this.state.strikes}
                    lifesCount={this.state.life}
                    missCount={this.state.miss}
                />
                <div
                    className={`game-field__field ${this.state.isGameStarted ? "game-field__field--active" : ""}`}
                    onClick={this.handleMiss}
                >
                    {
                        this.state.isGameStarted ? <GameTarget handleStrike={this.handleStrike} handleMiss={this.handleMiss}/>
                        : <StartButton startGame={this.toggleStart}/>
                    }
                </div>
                <GameSettings/>
            </section>
        )
    }
}

export default Game