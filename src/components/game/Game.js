import React from 'react';
import GameStatistics from "./GameStatistics";
import GameSettings from "./GameSettings";
import GameTarget from "./GameTarget"
import StartButton from "../UI/StartButton";
import LocalStorageHandler from "../tools/LocalStorageHandler";
import GameMessage from "./GameMessage";

 class Game extends React.Component {
    constructor(props) {
        super(props); //здесь - настройки игры
        this.state = {
            ...props.initialState,
            targets: [],
            targetsCount: 0,
            containerWH: [],
            message: ''
        }


        this.handleStrike = this.handleStrike.bind(this)
        this.toggleStart = this.toggleStart.bind(this)
        this.handleMiss = this.handleMiss.bind(this)
        this.gameOverHandler = this.gameOverHandler.bind(this)
        this.targetsHolder = this.targetsHolder.bind(this)
        this.makeGame = this.makeGame.bind(this)
        this.handleLate = this.handleLate.bind(this)
        this.deleteTarget = this.deleteTarget.bind(this)
    }

    componentDidMount() {
        window.addEventListener('load', () => {
            let container = document.querySelector('.game-field__field')
            let w = parseFloat(window.getComputedStyle(container).getPropertyValue('width'))
            let h = parseFloat(window.getComputedStyle(container).getPropertyValue('height'))
            this.setState({...this.state, containerWH: [w, h]})
        })
    }

    toggleStart (bool) {
        this.setState({...this.state, isGameStarted: bool, targets: [], targetsCount: 0})
        this.makeGame()
    }

    handleStrike (e, id) {
        e.stopPropagation()
        this.setState({...this.state, strikes: this.state.strikes + 1, message: 'strike!'})
        this.deleteTarget(id)
        //Логика по удалению текущей цели и поставке следующей
    }

    deleteTarget(targetId) {
        console.log('here')
        let targetsCopy = [...this.state.targets]
        console.log('her1e')
        targetsCopy.forEach(
            (target) => {
                console.log('reduce')
                if (target.props.id == targetId) {
                    console.log(i)
                    arr.splice(i, 1)
                    this.setState({
                        ...this.state,
                        targets: targetsCopy
                    })
                }
            }
        )
    }

    /*
    * Метод для обработки отнятия жизней при опоздании и удаления цели
    * **/
    handleLate (id) {
        // this.deleteTarget(id)
        this.setState({...this.state, life: this.state.life - 1, message: 'late!'})
    }

    /* Метод для обработки клика,
    *  не попавшего в цель
    * **/
    handleMiss (e) {
        if (!this.state.isGameStarted ) {//если игра не началась, мы не фиксируем промах
            return
        }
        this.setState({...this.state, life: this.state.life - 1,  miss: this.state.miss + 1, message: 'miss!'})
        if (this.state.life === 0) {
            this.gameOverHandler()
        }
    }

    targetsHolder () {
        return setInterval( () => {
            this.setState({...this.state, targets: [...this.state.targets,
                        <GameTarget
                            handleStrike={this.handleStrike}
                            handleLate={this.handleLate}
                            coordX={Math.random() * (this.state.containerWH[0] - 30)}
                            coordY={Math.random() * (this.state.containerWH[1] - 30)}
                            id={this.state.targetsCount}
                            key={this.state.targetsCount}
                        />
                    ], targetsCount: ++this.state.targetsCount
                })
        }, 1000) //Здесь - одна из настроек игры
    }

    gameOverHandler () {
        alert(`Вы програли. Ваш счет: ${this.state.strikes}.`)
        this.setState({...this.props.initialState, gameOver: true})
        LocalStorageHandler({best: this.state.strikes})
    }

    makeGame () {
        let targetIterator = this.targetsHolder()
        setTimeout(
            () => {
                clearInterval(targetIterator)
            },
            1000 //Здесь - одна из настроек игры (определяет, сколько целей будут отрендерены этоттаймаут/таймаут выше)
        )
    }

    render () {
        return (
            <section className="game-field">
                <GameStatistics
                    strikesCount={this.state.strikes}
                    lifesCount={this.state.life}
                    missCount={this.state.miss}
                />
                <div className="game-field__game-holder">
                    <div className="game-field__message">
                        <GameMessage message={this.state.message}/>
                    </div>
                    <div
                        className={`game-field__field ${this.state.isGameStarted ? "game-field__field--active" : ""}`}
                        onClick={this.handleMiss}
                    >
                        {
                            this.state.isGameStarted ? this.state.targets
                                : <StartButton startGame={this.toggleStart}/>
                        }
                    </div>
                </div>
                <GameSettings/>
            </section>
        )
    }
}

export default Game