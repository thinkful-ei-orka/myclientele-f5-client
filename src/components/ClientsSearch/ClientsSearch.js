import React from 'react';
import './ClientsSearch.scss';
import PrivateContext from '../../contexts/PrivateContext';

// for react-google-maps
import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
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
      let boundsTimer = null;
      let boundsChanging = false;

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
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
          // this.updateBoundsAndCenter();
        },
        // updateBoundsAndCenter: () => {
        //   if (boundsTimer === null) {
        //     // initiating timer
        //     boundsTimer = window.setTimeout(() => {
        //       // setting bounds
        //       this.setState({
        //         bounds: refs.map.getBounds(),
        //         center: refs.map.getCenter(),
        //       })
        //       boundsChanging = false;
        //       boundsTimer = null;
        //     }, 500);
        //     boundsChanging = true;
        //   }

        //   // if bounds are changing, reset the timer
        //   if (boundsChanging) {
        //     // resetting bounds
        //     window.clearTimeout(boundsTimer);
        //     boundsTimer = window.setTimeout(() => {
        //       // setting bounds
        //       this.setState({
        //         bounds: refs.map.getBounds(),
        //         center: refs.map.getCenter(),
        //       })
        //       boundsChanging = false;
        //       boundsTimer = null;
        //     }, 500);
        //     boundsChanging = true;
        //   }
        // },
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
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
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
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={13}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
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
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position}></Marker>
      // <MarkerWithLabel key={index} position={marker.position}><div>Hello There!</div></MarkerWithLabel>
    )}
  </GoogleMap>
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
