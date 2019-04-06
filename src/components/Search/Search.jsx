import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { geocodeByAddress } from 'react-places-autocomplete';

import { searchActions } from '../../_actions';

import Autocomplete from '../general/Autocomplete';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null, passengers: 0,
        };
      }
     
      handleChange(field, value) {
        this.props.dispatch(searchActions.updateField({ [field]: value }));
      };

      handleGenericChange(field, evt) {
        this.setState({ [field]: evt.target.value });
      }
     
      handleStartSelect(address) {
        this.props.dispatch(searchActions.geocodeStartAddress(address));
      };

      handleEndSelect(address) {
        this.props.dispatch(searchActions.geocodeEndAddress(address));
      };

      handleSubmit(evt) {
        evt.preventDefault();
        const data = this.props.search;
        data.passengers = this.state.passengers;
        data.date = this.state.date;
        this.props.dispatch(searchActions.getDistance(data));
      }

    componentDidMount() {
        const { location: { search } } = this.props;
        const queries = qs.parse(search);
        if (queries.start) this.handleStartSelect(queries.start);
        if (queries.end) this.handleEndSelect(queries.end);
    }

    render() {
        const searchOptions = { types: ['geocode'] };
        const { start, end } = this.props.search;
        return (
            <div>
                <form>
                    <ul>
                        <li>
                            <Autocomplete
                                value={start || ''}
                                onChange={this.handleChange.bind(this, 'start')}
                                onSelect={this.handleStartSelect.bind(this)}
                                searchOptions={searchOptions}
                                placeholder="Enter your address"
                            />
                        </li>
                        <li>
                            <Autocomplete
                                value={end || ''}
                                onChange={this.handleChange.bind(this, 'end')}
                                onSelect={this.handleEndSelect.bind(this)}
                                searchOptions={searchOptions}
                                placeholder="Enter destination address"
                            />
                        </li>
                        <li><input onChange={this.handleGenericChange.bind(this, 'passengers')} type="number" placeholder="Number of passengers"/></li>
                        <li><input onChange={this.handleGenericChange.bind(this, 'date')} type="date"/></li>
                        <li><button onClick={this.handleSubmit.bind(this)} type="submit">Get Distance</button></li>
                    </ul>
                    
                </form>
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

export default connect(mapStateToProps)(Search);