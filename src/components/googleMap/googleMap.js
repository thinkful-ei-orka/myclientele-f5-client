import React from 'react';
import TokenService from '../../services/token-service';
import config from '../../config';

// for @react-google-maps/api
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

export default class GoogleMapComponent extends React.Component {
  state = {
    results: [],
    map: null,
    center: null,
    centerSet: false,
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
    let lng = this.state.map.getCenter().lng();

    console.log(lat, lng);
    this.setState({ center: [lat, lng] });
  }

  setCenter = () => {
    let lat = 0;
    let lng = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude
          lng = position.coords.longitude

          if (lat !== 0 && lng !== 0) {
            this.state.map.setCenter({lat, lng})
          }
      })
    }

    this.setState({centerSet: true});
  }

  handleMarkerClick = (place_id) => {
    console.log(place_id);
    let thisPlace = this.state.results.find((result) => result.place_id === place_id);
    console.log(thisPlace);
  }

  render() {
    // set the center of the map
    if (this.state.map !== null) {
      if (this.state.map.center !== undefined) {
        if (this.state.centerSet === false) {
          this.setCenter();
        }
      }
    }

    let markers = [];
    // if passing in clients, populate the clients
    if (this.props.clients !== null && this.state.results.length === 0) {
      this.props.clients.forEach((client) => {
        let clientPosition = {lat: Number(client.lat), lng: Number(client.lng)};
        console.log(clientPosition)
        markers.push(
          <Marker position={clientPosition} key={client.id} onClick={() => this.handleMarkerClick(client.id)}></Marker>
        );
      });
    }

    // if searching results, populate the results
    if (this.state.results) {
      this.state.results.forEach((result) => {
        console.log()
        markers.push(
          <Marker position={result.geometry.location} key={result.place_id} onClick={() => this.handleMarkerClick(result.place_id)}></Marker>
        );
      });
    }



    console.log(markers)

    return (
      <>
        <button onClick={(e) => this.handleSearch('walgreens')}>Click me</button>
        <LoadScript googleMapsApiKey="AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={this.onLoad}
            onIdle={this.onIdle}
          >
            {markers}
          </GoogleMap>
        </LoadScript>
      </>
    )
  }
}
