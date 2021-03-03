import React from 'react';
import GameStatistics from "./GameStatistics";
import GameSettings from "./GameSettings";
import GameTarget from "./GameTarget"
import StartButton from "../UI/StartButton";

 class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGameStarted: false,
            strikes: 0
        }

        this.handleStrike = this.handleStrike.bind(this)
        this.observeStart = this.observeStart.bind(this)
        this.handleStart = this.handleStart.bind(this)
    }

    handleStart () {
        console.log('click')
        this.setState({...this.state, isGameStarted: this.state.isGameStarted = true})
    }

    observeStart () {
        if (this.state.isGameStarted) {
            return <GameTarget />
        } else {
            return <StartButton onClick={this.handleStart}/>
        }
    }

    handleStrike () {
        this.setState({...this.state, strikes: this.state.strikes + 1})
    }

    render () {
        return (
            <section className="game-field">
                <GameStatistics strikesCount={this.state.strikes} />
                <div className="game-field__field">
                    {this.observeStart()}
                </div>
                <GameSettings/>
            </section>
        )
    }
}

export default Game