import React from 'react';
import Header from '../Header/Header';
import PrivateContext from '../../contexts/PrivateContext';
import GoogleMapComponent from '../GoogleMap/GoogleMap';

import TokenService from '../../services/token-service';
import config from '../../config';

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  state = {
    center: null,
    results: null,
    formattedResults: null,
  }

  handleSearch = (searchTerm) => {
    console.log('searching');

    return fetch(`${config.API_ENDPOINT}/places?searchTerm=${searchTerm}&center=${this.state.center}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .then(json => {
      console.log('search results', json);
      let formattedResults = [];
      json.forEach((result) => {
        formattedResults.push({
          id: result.reference,
          name: result.name,
          location: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        })
      })
      this.setState({
        results: json,
        formattedResults: formattedResults
      })
    })
  }

  setCenter = (center) => {
    this.setState({
      center: center,
    });
  }

  componentDidMount() {
    this.context.fetchClients();
  }

  render() {
    return (
      <>
        <Header />
        <button onClick={(e) => this.handleSearch('walgreens')}>Search walgreens</button>
        <GoogleMapComponent markers={this.state.formattedResults} setCenter={this.setCenter}></GoogleMapComponent>
      </>
    )
  }
}
