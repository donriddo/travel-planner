import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Result extends React.Component {

    componentDidMount() {

    }

    render() {
        const { distance } = this.props.search;
        return (
            <div>
                { distance && <p>Distance: {distance}</p> }
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