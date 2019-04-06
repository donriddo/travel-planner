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
            start: '', startLat: '', startLng: '',
            end: '', endLat: '', endLng: '',
            date: null, passengers: 0
        };
      }
     
      handleChange(field, value) {
        console.log({ [field]: value });
        this.setState({ [field]: value });
      };

      handleGenericChange(field, evt) {
        this.setState({ [field]: evt.target.value });
      }
     
      handleStartSelect(address) {
        geocodeByAddress(address)
          .then((results) => {
              console.log(results)
              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();
              this.setState({
                  start: results[0].formatted_address,
                  startLat: lat,
                  startLng: lng
                });
              
            })
          .catch(error => console.error('Error', error));
      };

      handleEndSelect(address) {
        geocodeByAddress(address)
          .then((results) => {
              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();
              this.setState({
                  end: results[0].formatted_address,
                  endLat: lat,
                  endLng: lng
                });
              
            })
          .catch(error => console.error('Error', error));
      };

      handleSubmit(evt) {
        evt.preventDefault();
        this.props.dispatch(searchActions.getDistance(this.state));
      }

    componentDidMount() {
        const { location: { search } } = this.props;
        const values = qs.parse(search);
        this.setState(values);
        if (values.start) this.handleStartSelect(values.start);
        if (values.end) this.handleEndSelect(values.end);
    }

    render() {
        const searchOptions = { types: ['geocode'] };
        
        return (
            <div>
                <form>
                    <ul>
                        <li>
                            <Autocomplete
                                value={this.state.start}
                                onChange={this.handleChange.bind(this, 'start')}
                                onSelect={this.handleStartSelect.bind(this)}
                                searchOptions={searchOptions}
                                placeholder="Enter your address"
                            />
                        </li>
                        <li>
                            <Autocomplete
                                value={this.state.end}
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
    // const {  } = state;
    return {
    };
}

export default connect(mapStateToProps)(Search);