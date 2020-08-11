import React from 'react';
import './ClientsMap.scss';
import PrivateContext from '../../contexts/PrivateContext';

// for react-google-maps
// import _ from 'lodash';
// import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
// import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';


const MapWithClients = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: 41.9, lng: -87.62 }}
  >
    <div position={{ lat: 41.91, lng: -87.63 }}><h1>HELLO</h1></div>
    {/* <InfoBox defaultPosition={{ lat: 41.91, lng: -87.63 }} ><h1>This is an info box</h1><p>Hello! hello!</p></InfoBox> */}
    {/* <MarkerWithLabel position={{ lat: 41.91, lng: -87.63 }} ><div><h1>This is a label</h1><p>Hello! hello!</p></div></MarkerWithLabel> */}
    {/* <Marker position={{ lat: 41.91, lng: -87.63 }} clickable={true} label="Test Label" title="Test Title" /> */}
    <Marker position={{ lat: 41.90, lng: -87.62 }} />
    <Marker position={{ lat: 41.89, lng: -87.63 }} />
  </GoogleMap>
));

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  render() {
    return (
      <>
        <MapWithClients
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `500px` }} />}
          containerElement={<div style={{ height: `500px` }} />}
          mapElement={<div style={{ height: `500px` }} />}
        />
      </>
    )
  }
}
