import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from '../Search/Search';
import Result from '../Result/Result';

import { rootActions } from '../../_actions';
import { history } from '../../_helpers';

class Home extends React.Component {

    componentDidMount() {
        history.push('/search');
    }

    render() {
        const { view } = this.props.root;
        return (
            <div>
                <div className="info">Plan your travels</div>
                <Route path="/search" component={Search} />
                <Route path="/result" component={Result} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { root } = state;
    return {
        root
    };
}

export default connect(mapStateToProps)(Home);