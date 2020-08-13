import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import GoogleMapComponent from '../GoogleMap/GoogleMap';
import GoogleSearchBar from '../GoogleSearchBar/GoogleSearchBar';
import { Link } from 'react-router-dom';
// import AddClientForm from '../AddClientForm/AddClientForm';
import './GoogleExperiment.scss';

import TokenService from '../../services/token-service';
import config from '../../config';

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  state = {
    center: null,
    results: null,
    formattedResults: null,
    searchTerm: '',
    listView: false,
    mapView: false,
  }

  handleSearch = (searchTerm) => {
    e.preventDefault();
    console.log('searching');

    return fetch(`${config.API_ENDPOINT}/places?searchTerm=${this.state.searchTerm}&center=${this.state.center}`, {
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

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      searchTerm: e.currentTarget.value
    })
  }

  componentDidMount() {
    this.context.fetchClients();
  }

  render() {
    console.log('searchterm', this.state.searchTerm)

    //defaults to listView is neither is selected for mobile
    if (this.state.formattedResults !== null) {
      let resultList = this.state.formattedResults;
      console.log('resultList', resultList)
      resultList = resultList.map(result =>
        <li id={result.id} key={result.id}>
          <span>{result.name}</span>
          <p>{result.location}</p>
          <Link to={{
            pathname: "/form",
            state: {
              data: result
            }
          }}><button type='button'>Select</button></Link>
        </li>
      )
    if (!this.state.mapView) {
      return (
        <>
          <h2>Add Client</h2>
          <GoogleSearchBar handleChange={this.handleChange} handleSearch={this.handleSearch}/>
          <ul>
            {resultList}
          </ul>
          <div className='hidden'>{<GoogleMapComponent markers={this.state.formattedResults} setCenter={this.setCenter}></GoogleMapComponent>}</div>
        </>
      )}
      else if (this.state.mapView) {
        return (
          <>
            <h2>Add Client</h2>
            <GoogleSearchBar handleChange={this.handleChange} handleSearch={this.handleSearch}/>
            <GoogleMapComponent markers={this.state.formattedResults} setCenter={this.setCenter}></GoogleMapComponent>
          </>
        )}
    }
      return (
        <>
          <h2>Add Client</h2>
          <GoogleSearchBar handleChange={this.handleChange} handleSearch={this.handleSearch}/>
          <Link to="/form">Manually add a client</Link>
          <div className='hidden'>{<GoogleMapComponent markers={this.state.formattedResults} setCenter={this.setCenter}></GoogleMapComponent>}</div>
        </>
      )

  }
}
