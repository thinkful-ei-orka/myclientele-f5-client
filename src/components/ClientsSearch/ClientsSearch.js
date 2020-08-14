import React from 'react';
import './ClientsSearch.scss';
import PrivateContext from '../../contexts/PrivateContext';

// for react-google-maps
// import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

// for @react-google-maps/api
// import { StandaloneSearchBox } from '@react-google-maps/api';

// using react-google-maps
const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `500px` }} />,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `500px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}
      // let boundsTimer = null;
      // let boundsChanging = false;

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
          // lat: 0, lng: 0
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          // used to set bounds here
        },
        onIdle: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            // center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          // const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            // center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={13}
    center={props.center}
    // onBoundsChanged={props.onBoundsChanged}
    onIdle={props.onIdle}
  >
    {/* <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.BOTTOM_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search"
        className="searchBox"
        style={{
        }}
      />
    </SearchBox> */}
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position}></Marker>
      // <MarkerWithLabel key={index} position={marker.position}><div>Hello There!</div></MarkerWithLabel>
    )}
  </GoogleMap>
  {/* <StandaloneSearchBox ref={props.onSearchBoxMounted} bounds={props.bounds} onPlacesChanged={props.onPlacesChanged} ><input type="text" className="searchBox"></input></StandaloneSearchBox> */}
  <SearchBox
    ref={props.onSearchBoxMounted}
    bounds={props.bounds}
    controlPosition={window.google.maps.ControlPosition.BOTTOM_LEFT}
    onPlacesChanged={props.onPlacesChanged}
  >
    <input
      type="text"
      placeholder="Search"
      className="searchBox"
      style={{
      }}
    />
  </SearchBox>
  </>
);

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  render() {
    return (
      <>
        <MapWithASearchBox />
      </>
    )
  }
}
