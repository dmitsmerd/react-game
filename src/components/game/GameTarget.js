import React from "react";

class GameTarget extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div
                style={{ backgroundColor: 'red', width: '50px', height: '50px' }}
                onClick={this.handleStrike}
            >
                box
            </div>
        )
    }
}

export default GameTarget