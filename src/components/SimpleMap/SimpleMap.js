import React from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';

// for @react-google-maps/api
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

export default class SimpleMap extends React.Component {
  state = {
    results: [],
    map: null,
    center: null,
  }

  handleClick = () => {
    console.log('button clicked');

    let searchTerm = 'walgreens';

    return fetch(`${config.API_ENDPOINT}/places?searchTerm=walgreens&center=${this.state.center}`, {
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
      console.log(json);
      this.setState({results: json})
    })
  }

  onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    this.setState({
      map: map,
    })
  }

  onIdle = () => {
    // this.setState({center: this.state.map.getCenter()})
    let lat = this.state.map.getCenter().lat();
    let lng = this.state.map.getCenter().lng() - 360;

    console.log(lat, lng);
    this.setState({ center: [lat, lng] });
  }

  handleMarkerClick = (place_id) => {
    console.log(place_id);
    let thisPlace = this.state.results.find((result) => result.place_id === place_id);
    console.log(thisPlace);
  }

  render() {
    let stores = [];
    this.state.results.forEach((store) => {
      stores.push(store.name);
    });

    return (
      <>
        <button onClick={this.handleClick}>Click me</button>
        <LoadScript googleMapsApiKey="AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={this.onLoad}
            onIdle={this.onIdle}
          >
            {this.state.results.map((result) => {
              console.log(result.geometry.location)
              return <Marker position={result.geometry.location} onClick={() => this.handleMarkerClick(result.place_id)}></Marker>
            })}
          </GoogleMap>
        </LoadScript>

        <div>{stores}</div>
      </>
    )
  }
}
