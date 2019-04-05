import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Result extends React.Component {

    componentDidMount() {

    }

    render() {
        const { distance, from, to, date, numOfPassengers } = this.props.search;
        return (
            <div>
                { distance && <p>Distance: {parseFloat(distance)/1000.0} km</p> }
                { from && <p>from: {from}</p> }
                { to && <p>to: {to}</p> }
                { date && <p>date: {date}</p> }
                { numOfPassengers && <p>numOfPassengers: {numOfPassengers}</p> }
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