import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { searchActions } from '../../_actions';

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
              console.log(results)
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

    }

    render() {
        const searchOptions = { types: ['geocode'] };

        return (
            <div>
                <form>
                    <ul>
                    <li><PlacesAutocomplete
                        value={this.state.start}
                        onChange={this.handleChange.bind(this, 'start')}
                        onSelect={this.handleStartSelect.bind(this)}
                        searchOptions={searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                            {...getInputProps({
                                placeholder: 'Enter your address',
                                className: 'location-search-input',
                            })}
                            />
                            <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                                );
                            })}
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete>
                    </li>
                    <li>
                    <PlacesAutocomplete
                        value={this.state.end}
                        onChange={this.handleChange.bind(this, 'end')}
                        onSelect={this.handleEndSelect.bind(this)}
                        searchOptions={searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                            {...getInputProps({
                                placeholder: 'Enter your destination address',
                                className: 'location-search-input',
                            })}
                            />
                            <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                    className,
                                    style,
                                    })}
                                >
                                    <span>{suggestion.description}</span>
                                </div>
                                );
                            })}
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete></li>
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