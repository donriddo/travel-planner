import React from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0,
            from: '',
            to: '',
            date: null,
            numOfPassengers: 0
        };
    }

    componentDidMount() {
        const { location: { search } } = this.props;
        const queries = qs.parse(search);
        const values = Object.assign({}, this.props.search);
        this.setState(Object.assign({}, values, queries));
    }

    render() {
        const { distance, from, to, date, numOfPassengers } = this.state;
        return (
            <div className="result">
                <p>Distance: {parseFloat(distance || 0)/1000.0} km</p>
                { from && <p>From: {from}</p> }
                { to && <p>To: {to}</p> }
                { date && <p>Date: {new Date(date).toString()}</p> }
                <p>Number of Passengers: {String(numOfPassengers || 0)}</p>
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