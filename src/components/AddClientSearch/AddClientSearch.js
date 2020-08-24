import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import GoogleMapComponent from '../GoogleMap/GoogleMap';
import GoogleSearchBar from '../GoogleSearchBar/GoogleSearchBar';
import { Link } from 'react-router-dom';

import ListMapToggle from '../ListMapToggle/ListMapToggle'
import './AddClientSearch.scss';

import TokenService from '../../services/token-service';
import config from '../../config';

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  state = {
    center: null,
    results: null,
    formattedResults: null,
    searchTerm: '',
    listClass: '',
    mapClass: 'mobile-hidden',
    isSearchedClass: '',
  }

  // get a list of places from search
  handleSearch = (e) => {
    e.preventDefault();
    this.setState({
      isSearchedClass: 'is-searched',
    })
    return fetch(`${config.API_ENDPOINT}/places?searchTerm=${this.state.searchTerm}&center=${this.state.center}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((json) => {
        let formattedResults = [];
        json.forEach((result) => {
          let photo_reference = null;
          if(result.photos) {
            photo_reference = result.photos[0].photo_reference
          }
          formattedResults.push({
            id: result.reference,
            name: result.name,
            location: result.formatted_address,
            photos: result.photos,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            photo_reference,
          });
        });
        this.setState({
          results: json,
          formattedResults: formattedResults,
        });
      });
  };

  syncCenter = (center) => {
    this.setState({
      center: center,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      searchTerm: e.currentTarget.value,
    });
  };

  listClick = () => {
    this.setState({
      listClass: '',
      mapClass: 'mobile-hidden',
    })
  }

  mapClick = () => {
    this.setState({
      listClass: 'mobile-hidden',
      mapClass: '',
    })
  }

  componentDidMount() {
    this.context.fetchClients();
  }

  render() {
    let resultList;
    if (this.state.formattedResults !== null) {
      resultList = this.state.formattedResults;
      resultList = resultList.map(result =>
        <li className='result' id={result.id} key={result.id}>
          <div className='result-name-location'>
            <h3 className='result-name'>{result.name}</h3>
            <p className='result-location'>{result.location}</p>
          </div>
          <div className="btn-container">
            <Link className='btn select-button' to={{
              pathname: "/add-client-form",
              state: {
                client: result
              }
            }}>Select</Link>
          </div>
        </li>
      )
    }

    return (
      <>
        <div className="results-map-container">
          <div className={`search-results ${this.state.listClass} ${this.state.isSearchedClass}`}>
            <GoogleSearchBar handleChange={this.handleChange} handleSearch={this.handleSearch}/>
            <Link className='link' to="/add-client-form">Manually add a client</Link>
            <ul className='search-results-list'>
              {resultList}
            </ul>
          </div>
          <div className={`search-map-container ${this.state.mapClass}`}>
            <GoogleMapComponent searchMarkers={this.state.formattedResults} syncCenter={this.syncCenter} onSearchMarkerClick={this.onSearchMarkerClick} centerOnCurrentLocation={true}></GoogleMapComponent>
          </div>
        </div>
        <ListMapToggle listClick={this.listClick} mapClick={this.mapClick}></ListMapToggle>
      </>
    )
  }
}
