import React from 'react';
import Header from '../Header/Header';
import PrivateContext from '../../contexts/PrivateContext';

// for @react-google-maps/api
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  state = {
    map: null,
    center: null,
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
    // let thisPlace = this.state.results.find((result) => result.place_id === place_id);
    // console.log(thisPlace);
  }

  componentDidMount() {
    this.context.fetchClients();
  }

  render() {
    let clientMarkers = [];

    if (this.context.clients !== null) {
      console.log(this.context);
      this.context.clients.forEach((client) => {
        let clientPosition = {lat: Number(client.lat), lng: Number(client.lng)};
        clientMarkers.push(
          <Marker position={clientPosition} onClick={() => this.handleMarkerClick(client.id)}></Marker>
        );
      });
    }

    console.log('clientMakers', clientMarkers);

    return (
      <>
        <Header />
        <LoadScript googleMapsApiKey="AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={this.onLoad}
            onIdle={this.onIdle}
          >
            <Marker position={{lat: 151.235, lng: -33.74}}></Marker>
            {clientMarkers}
          </GoogleMap>
        </LoadScript>
      </>
    )
  }
}
