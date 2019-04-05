import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Search from '../Search/Search';
import Result from '../Result/Result';

import { rootActions } from '../../_actions';

class Home extends React.Component {

    componentDidMount() {
        this.props.dispatch(rootActions.showSearch())
    }

    render() {
        const { view } = this.props.root;
        return (
            <div>
                {
                    view && view === 'search' && <Search />
                }
                {
                    view && view === 'result' && <Result />
                }
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