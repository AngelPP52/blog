import React from 'react';
import {connect} from 'react-redux';
import {default as actions} from '../react-store/actions'

class Counter extends React.Component{
    render(){
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.async_add}>+</button>
                <button onClick={this.props.stop_add}>x</button>
            </div>
        )
    }
} 

export default connect(
    state => state,
    actions
)(Counter)