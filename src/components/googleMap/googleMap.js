import React from 'react';

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

  onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    this.setState({
      map: map,
    })
  }

  onIdle = () => {
    let lat = this.state.map.getCenter().lat();
    let lng = this.state.map.getCenter().lng();

    this.props.setCenter([lat, lng]);
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

  handleMarkerClick = (id) => {
    console.log(id);
    // let thisPlace = this.state.results.find((result) => result.place_id === place_id);
    // console.log(thisPlace);
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

    // if searching results, populate the results
    if (this.props.markers) {
      this.props.markers.forEach((marker) => {
        let lat = Number(marker.lat);
        let lng = Number(marker.lng);

        markers.push(
          <Marker position={{lat: lat, lng: lng}} key={marker.id} onClick={() => this.handleMarkerClick(marker.id)}></Marker>
        );
      });
    }

    return (
      <>
        <LoadScript googleMapsApiKey="AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={this.onLoad}
            onIdle={this.onIdle}
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {markers}
          </GoogleMap>
        </LoadScript>
      </>
    )
  }
}
