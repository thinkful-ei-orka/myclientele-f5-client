import React from 'react';
import './GoogleMap.scss';

import ClientCard from '../../components/ClientCard/ClientCard';

// for @react-google-maps/api
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

export default class GoogleMapComponent extends React.Component {
  state = {
    results: [],
    map: null,
    centerSet: false,
    infoWindow: null,
  };

  onLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    this.setState(
      {
        map: map,
      },
      () => {
        this.setCenter();
      }
    );

    //mapSetCenter does not work necessarily when onLoad is called
    // map.setCenter({lat: 27, lng: -81})
  };

  onIdle = () => {
    let lat = this.state.map.getCenter().lat();
    let lng = this.state.map.getCenter().lng();

    this.props.setCenter([lat, lng]);
  };

  onClick = () => {
    this.setState({
      infoWindow: null,
    });
  };

  setCenter = () => {
    let lat = 0;
    let lng = 0;
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;

          if (lat !== 0 && lng !== 0) {
            
            //map.setCenter does not work necessarily when map is called to load
            setTimeout(() => this.state.map.setCenter({ lat, lng }), 1000);
            // this.props.setCenter({lat, lng})
            // console.log('center set', this.state.map.center.lat(), this.state.map.center.lng())
          }
        },
        (err) => console.log(err),
        { maximumAge: Infinity }
      );
    }
  };

  handleMarkerClick = (id, lat, lng, content) => {
    this.setState({
      infoWindow: (
        <InfoWindow
          key={id}
          onLoad={this.onInfoLoad}
          position={{ lat: lat, lng: lng }}>
          <div>{content}</div>
        </InfoWindow>
      ),
    });
  };

  handleSearchMarkerClick = (id, lat, lng, content) => {
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
  };

  render() {
    console.log('props in GM', this.props)
    let markers = [];

    // if searching results, populate the results
    if (this.props.markers) {
      this.props.markers.forEach((marker) => {
        let lat = Number(marker.lat);
        let lng = Number(marker.lng);

        markers.push(
          <Marker
            key={marker.id}
            position={{ lat: lat, lng: lng }}
            onClick={() =>
              this.handleMarkerClick(
                marker.id,
                lat,
                lng,
                <ClientCard
                  className='map-card'
                  data={marker}
                  key={marker.id}
                />
              )
            }
          ></Marker>
        );
      });
    } else if (this.props.searchMarkers) {
      this.props.searchMarkers.forEach((marker) => {
        let lat = Number(marker.lat);
        let lng = Number(marker.lng);

        markers.push(
          <Marker
            key={marker.id}
            position={{lat: lat, lng: lng}}
            onClick={() => this.handleSearchMarkerClick(marker.id, lat, lng,
              <li className='result' id={marker.id} key={marker.id}>
                <div className='result-name-location'>
                  <h3 className='result-box-name'>{marker.name}</h3>
                  <p className='result-box-location'>{marker.location}</p>
                </div>
                <div className='btn-container'>
                  <Link className='btn select-button' to={{
                    pathname: "/add-client-form",
                    state: {
                      data: marker
                    }
                  }}>Select</Link>
                </div>
              </li> )}
          >
          </Marker>
        );
      });
    }

    return (
      <>
        <LoadScript googleMapsApiKey='AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0'>
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
    );
  }
}
