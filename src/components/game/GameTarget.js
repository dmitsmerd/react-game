import React from "react";

class GameTarget extends React.Component {
    constructor(props) {
        super(props);
        this.tooLate = null;
        this.state = {
            hit: false,
            late: false
        }


        this.hit = this.hit.bind(this)
        this.beingLate = this.beingLate.bind(this)
    }

    componentDidMount() {
        console.log('component render')
        this.tooLate = setTimeout(this.beingLate.bind(this), 2000) //здесь настройка игры
    }

    beingLate() {
        if(!this.state.hit && !this.state.late) {
            this.setState({...this.state, late:true})
            this.props.handleLate(this.props.id)
        }
    }

    componentDidUpdate() {
        if (this.tooLate) {
            clearTimeout(this.tooLate)
        }
    }

    hit(e) {
        if (!this.state.hit && !this.state.late) {
            this.setState({...this.state, hit:true})
            this.props.handleStrike(e, this.props.id)
        }
    }


    render() {
        return (
            <div
                className={`target ${this.state.hit ? "target--hit" : ''} ${this.state.late ? "target--late" : ''}`}
                onClick={this.hit}
                style={{ left: this.props.coordX, top: this.props.coordY }}
            >
            </div>
        )
    }
}

export default GameTarget

//* 1 - повторное нажатие на цель, в которую попали не должно приводить к промаху и отъему жизней
// * 2 - попадание в цель, которая уже недоступна по причине опоздания, не должно приводить к повышению баллов или их понижению
// * 3 - первая цель должна появляться незамедлительно
// *//