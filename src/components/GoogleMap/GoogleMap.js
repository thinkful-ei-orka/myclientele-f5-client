import React from 'react';
import './GoogleMap.scss';

import ClientCard from '../../components/ClientCard/ClientCard';

// for @react-google-maps/api
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

export default class GoogleMapComponent extends React.Component {
  state = {
    results: [],
    map: null,
    centerSet: false,
    infoWindow: null,
  }

  onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    this.setState({
      map: map,
    })
    this.setCenter();
  }

  onIdle = () => {
    let lat = this.state.map.getCenter().lat();
    let lng = this.state.map.getCenter().lng();

    this.props.setCenter([lat, lng]);
    console.log(lat, lng);
  }

  onClick = () => {
    this.setState({
      infoWindow: null,
    })
  }

  setCenter = () => {
    let lat = 0;
    let lng = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;

          if (lat !== 0 && lng !== 0) {
            console.log(lat, lng);
            this.state.map.setCenter({lat, lng})
            this.props.setCenter({lat, lng})
            console.log('center set', this.state.map.center.lat(), this.state.map.center.lng())
          }
      })
    }
  }

  handleMarkerClick = (id, lat, lng, content) => {
    // let thisPlace = this.state.results.find((result) => result.place_id === place_id);
    // console.log(thisPlace);
    this.setState({
      infoWindow: <InfoWindow
          key={id}
          onLoad={this.onInfoLoad}
          position={{lat: lat, lng: lng}}
        >
          <div>
            {content}
          </div>
        </InfoWindow>
    })
  }

  onInfoLoad = (infoWindow) => {
    // console.log('infoWindow: ', infoWindow)
  }

  render() {
    let markers = [];
    // console.log('props in Map', this.props)
    // if searching results, populate the results
    if (this.props.markers) {
      this.props.markers.forEach((marker) => {
        let lat = Number(marker.lat);
        let lng = Number(marker.lng);

        console.log(marker);

        markers.push(
          <Marker
            key={marker.id}
            position={{lat: lat, lng: lng}}
            onClick={() => this.handleMarkerClick(marker.id, lat, lng, <ClientCard className="map-card" data={marker} key={marker.id} />)}
            // onClick={() => this.handleMarkerClick(marker.id, lat, lng, <div><p>This event is fired when the containing the InfoWindow's content is attached to the DOM. You may wish to monitor this event if you are building out your info window content dynamically.</p><button>button</button></div>)}
          >
          </Marker>
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
            onClick={this.onClick}
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {markers}
            {this.state.infoWindow}
          </GoogleMap>
        </LoadScript>
      </>
    )
  }
}
