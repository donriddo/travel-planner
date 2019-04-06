import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Result extends React.Component {

    render() {
        const { distance, from, to, date, numOfPassengers } = this.props.search;
        return (
            <div className="result">
                { distance && <p>Distance: {parseFloat(distance)/1000.0} km</p> }
                { from && <p>From: {from}</p> }
                { to && <p>To: {to}</p> }
                { date && <p>Date: {new Date(date).toString()}</p> }
                { numOfPassengers && <p>Number of Passengers: {String(numOfPassengers)}</p> }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { search } = state;
    return {
        search
    };
}

export default connect(mapStateToProps)(Result);