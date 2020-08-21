import React from 'react';
import './ClientsSearch.scss';
import PrivateContext from '../../contexts/PrivateContext';

import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

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

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onIdle: () => {
          this.setState({
            bounds: refs.map.getBounds(),
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

          this.setState({
            markers: nextMarkers,
          });
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
    onIdle={props.onIdle}
  >
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position}></Marker>
    )}
  </GoogleMap>
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
