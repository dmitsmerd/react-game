import React from "react";

class GameTarget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hit: false
        }

        this.removeTimeout = this.removeTimeout.bind(this)

        this.tooLate = setTimeout( () => {
            this.setState({hit: true})
            this.props.handleMiss()
        }, 2000)
    }


    removeTimeout () {
        clearTimeout(this.tooLate)
        return true
    }


    render() {
        return (
            <div
                className={`target ${this.state.hit ? "target--hit" : ''}`}
                onClick={this.removeTimeout && this.props.handleStrike}
            >
            </div>
        )
    }
}

export default GameTarget