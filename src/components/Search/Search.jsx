import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { geocodeByAddress } from 'react-places-autocomplete';

import { searchActions } from '../../_actions';

import Autocomplete from '../general/Autocomplete';

class Search extends React.Component {
     
      handleChange(field, value) {
        this.props.dispatch(searchActions.updateField({ [field]: value }));
      };

      handleGenericChange(field, evt) {
        this.props.dispatch(searchActions.updateField({ [field]: evt.target.value }));
      }
     
      handleStartSelect(address) {
        this.props.dispatch(searchActions.geocodeStartAddress(address));
      };

      handleEndSelect(address) {
        this.props.dispatch(searchActions.geocodeEndAddress(address));
      };

      handleSubmit(evt) {
        evt.preventDefault();
        this.props.dispatch(searchActions.getDistance(this.props.search));
      }

    componentDidMount() {
        const { location: { search } } = this.props;
        const queries = qs.parse(search);
        if (queries.start) this.handleStartSelect(queries.start);
        if (queries.end) this.handleEndSelect(queries.end);
        if (queries.passengers) this.handleGenericChange('passengers', { target: { value: queries.passengers } });
        if (queries.date) this.handleGenericChange('date', { target: { value: queries.date } });
    }

    render() {
        const searchOptions = { types: ['geocode'] };
        const { start, end, passengers, date } = this.props.search;
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
                        <li><input value={passengers} onChange={this.handleGenericChange.bind(this, 'passengers')} type="number" placeholder="Number of passengers"/></li>
                        <li><input value={date} onChange={this.handleGenericChange.bind(this, 'date')} type="date"/></li>
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