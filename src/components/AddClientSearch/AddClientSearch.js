import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import GoogleMapComponent from '../GoogleMap/GoogleMap';
import GoogleSearchBar from '../GoogleSearchBar/GoogleSearchBar';
import AddClientForm from '../AddClientForm/AddClientForm';
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
    selectClicked: false,
    selectedResult: null,
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ 
      isSearched: '', 
      selectClicked: false,
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

  onSelectClick = (e, result) => {
    return this.setState({
      selectClicked: true,
      selectedResult: result,
    })
  }

  componentDidMount() {
    this.context.fetchClients();
    this.setState({
      listClass: '',
      mapClass: 'mobile-hidden',
      selectClicked: false,
    })
  }

  render() {

    if (this.state.formattedResults !== null) {
      let display = null;
      let resultList = this.state.formattedResults;
      resultList = resultList.map(result =>
        <li className='result' id={result.id} key={result.id}>
          <p className='result-name'>{result.name}</p>
          <p className='result-location'>{result.location}</p>
          <button className='select-button btn' type='button' onClick={(e) => this.onSelectClick(e, result)}>Select</button>
        </li>
      )
      if(this.state.selectClicked && this.state.selectedResult !== null) {
        let result = this.state.selectedResult
        display = 
          <div className='search-results'>
            <AddClientForm client={result}/>
          </div>
      } else {
        display =
        <div className={`${this.state.listClass} search-results`}>
          {resultList}
        </div>
      }
      return (
        <>
          <GoogleSearchBar handleChange={this.handleChange} handleSearch={this.handleSearch}/>
          <div className={`${this.state.mapClass} search-map-container`}>{<GoogleMapComponent searchMarkers={this.state.formattedResults} setCenter={this.setCenter} onSelectClick={this.onSelectClick}></GoogleMapComponent>}</div>
          {display}
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