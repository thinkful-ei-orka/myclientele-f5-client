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
    isSearched: 'mobile-hidden',
  }

  handleSearch = (e) => {
    console.log('e', e);
    e.preventDefault();
    this.setState({ isSearched: '' })
    return fetch(`${config.API_ENDPOINT}/places?searchTerm=${this.state.searchTerm}&center=${this.state.center}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((json) => {
        console.log('search results', json);
        let formattedResults = [];
        json.forEach((result) => {
          formattedResults.push({
            id: result.reference,
            name: result.name,
            location: result.formatted_address,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
          });
        });
        this.setState({
          results: json,
          formattedResults: formattedResults,
        });
      });
  };

  setCenter = (center) => {
    console.log('setCenter in GE', center);
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
    console.log('compDidMount')
    this.context.fetchClients();
    this.setState({
      listClass: '',
      mapClass: 'mobile-hidden'
    })
  }

  render() {
    if (this.state.formattedResults !== null) {
      let resultList = this.state.formattedResults;
      resultList = resultList.map(result =>
        <li className='result' id={result.id} key={result.id}>
          <p className='result-name'>{result.name}</p>
          <p className='result-location'>{result.location}</p>
          <Link to={{
            pathname: "/add-client-form",
            state: {
              data: result
            }
          }}><button className='select-button btn' type='button'>Select</button></Link>

        </li>
      )
      return (
        <>
          <GoogleSearchBar handleChange={this.handleChange} handleSearch={this.handleSearch}/>
          <div className={`${this.state.mapClass} search-map-container`}>{<GoogleMapComponent searchMarkers={this.state.formattedResults} setCenter={this.setCenter} onSearchMarkerClick={this.onSearchMarkerClick}></GoogleMapComponent>}</div>
          <div className={`${this.state.listClass} search-results`}>
            {resultList}
          </div>
          <ListMapToggle listClick={this.listClick} mapClick={this.mapClick}></ListMapToggle>
        </>
      )


    }
      return (
        <>
          <GoogleSearchBar handleChange={this.handleChange} handleSearch={this.handleSearch}/>
          <Link className='link' to="/add-client-form">Manually add a client</Link>
          <div className={`${this.state.isSearched} ${this.state.mapClass}`}>{<GoogleMapComponent searchMarkers={this.state.formattedResults} setCenter={this.setCenter}></GoogleMapComponent>}</div>
          <ListMapToggle listClick={this.listClick} mapClick={this.mapClick}></ListMapToggle>
        </>
      )
  }
}