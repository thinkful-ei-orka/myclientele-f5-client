import React from 'react';
import './GoogleExperiment.scss';
import PrivateContext from '../../contexts/PrivateContext';

// for react-google-maps
import _ from 'lodash';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

// for @react-google-maps/api
// import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, Autocomplete } from '@react-google-maps/api';

// for google-map-react
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


// for react-places-autocomplete
// import { compose, withProps, lifecycle } from 'recompose';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// for react-geocode
import Geocode from "react-geocode";



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
      <MarkerWithLabel key={index} position={marker.position}><div>Hello There!</div></MarkerWithLabel>
    )}
  </GoogleMap>
);

export default class GoogleExperiment extends React.Component {
  static contextType = PrivateContext;

  render() {
    return (
      <>
        <MapWithASearchBox />
      </>
    )
  }
}





// using @react-google-maps/api
// StandAloneSearch is a global search, while Autocomplete is localized. Don't know how to incorporate it into the map yet.
// export default class ClientsMap extends React.Component {
//   static contextType = PrivateContext;

//   constructor(props) {
//     super(props);

//     this.autocomplete = null;
//     this.searchBox = null;
//     this.map = null;
//     this.center = {
//       lat: 59.95,
//       lng: 30.33
//     };
//     this.zoom = 3;
//   }

//   // Autocomplete functions
//   onAutocompleteLoad = (autocomplete) => {
//     console.log('autocomplete: ', autocomplete);

//     this.autocomplete = autocomplete;
//   }

//   onAutocompletePlaceChanged = () => {
//     console.log('autocomplete place changed', this.autocomplete);

//     if (this.autocomplete !== null) {
//       console.log(this.autocomplete.getPlace())
//     } else {
//       console.log('Autocomplete is not loaded yet!')
//     }
//   }

//   // Search Box functions
//   onSearchBoxLoad = (searchBox) => {
//     console.log('searchBox: ', searchBox);

//     this.searchBox = searchBox;
//   }

//   onSearchBoxPlaceChanged = () => {
//     console.log('search box place changed', this.searchBox);

//     if (this.searchBox !== null) {
//       console.log(this.searchBox.getPlace())
//     } else {
//       console.log('Searchbox is not loaded yet!')
//     }
//   }


//   onMapLoad = (map) => {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     this.map = map;
//     // this.setState({ map: map })
//   }

//   onBoundsChanged = () => {
//     console.log('bounds changed');
//     console.log('searchbox', this.searchBox);
//     console.log('autocomplete', this.autocomplete);
//     console.log('map', this.map);
//     // console.log(this.map.getBounds());
//     // console.log(this.map.getCenter());

//     console.log('searchbox bounds', this.searchBox.getBounds());
//     console.log('searchbox places', this.searchBox.getPlaces());


//   }

//   onUnmount = (map) => {
//     this.map = null;
//     // this.setState({ map: null });
//   }

//   render() {
//     const containerStyle = {
//       width: '100%',
//       height: '500px'
//     };

//     return (
//       <>
//         <LoadScript googleMapsApiKey="AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0" libraries={['places']}>


//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             defaultCenter={this.center}
//             defaultZoom={this.zoom}
//             // center={this.center}
//             // zoom={this.zoom}
//             onLoad={this.onMapLoad}
//             onBoundsChanged={this.onBoundsChanged}
//             onUnmount={this.onUnmount}
//           >
//             <StandaloneSearchBox onLoad={this.onSearchBoxLoad} onPlaceChanged={this.onPlaceChanged} ><input type="text" className="searchBox"></input></StandaloneSearchBox>
//             <Autocomplete className="autocomplete" onLoad={this.onAutocompleteLoad} onPlaceChanged={this.onPlaceChanged}><input type="text" placeholder="Search"></input></Autocomplete>
//             <Marker position={{ lat: -34.397, lng: 150.644 }}/>
//             <Marker position={{ lat: -14.397, lng: 130.644 }}/>
//             <Marker position={{ lat: -17.397, lng: 140.644 }}/>
//             <Marker position={{ lat: -24.397, lng: 133.644 }} >
//               <div>Hello</div>
//             </Marker>
//           </GoogleMap>
//         </LoadScript>
//       </>
//     )
//   }
// }



// using react-places-autocomplete
// this isn't working since the script isn't loaded
// export default class ClientsMap extends React.Component {
//   constructor(props) {
//     super(props)

//     const script = document.createElement("script");

//     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0";
//     // https://maps.googleapis.com/maps/api/js?key=AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0&libraries=places
//     script.async = true;

//     document.body.appendChild(script);
//   }

//   static contextType = PrivateContext;

//   state = {
//     search: '',
//   }

//   handleChange = search => {
//     this.setState({search: search})
//   }

//   handleSelect = search => {
//     geocodeByAddress(search)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error));
//   };

//   render() {
//     return (
//       <>
//         <PlacesAutocomplete
//           value={this.state.search}
//           onChange={this.handleChange}
//           onSelect={this.handleSelect}
//         >
//           {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: 'Search Places ...',
//                   className: 'location-search-input',
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map(suggestion => {
//                   const className = suggestion.active
//                     ? 'suggestion-item--active'
//                     : 'suggestion-item';
//                   // inline style for demonstration purpose
//                   const style = suggestion.active
//                     ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                     : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//       </>
//     )
//   }
// }




// using google-map-react
// export default class ClientsMap extends React.Component {
//   static contextType = PrivateContext;

//   state = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 10
//   }

//   render() {
//     return (
//       <>
//         <form style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
//           <input type="text"></input>
//         </form>
//         <div style={{ height: '100vh', width: '100%'}}>

//           <GoogleMapReact
//             bootstrapURLKeys={{ key: 'AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0' }}
//             defaultCenter={this.state.center}
//             defaultZoom={this.state.zoom}
//             yesIWantToUseGoogleMapApiInternals
//             >
//               <FontAwesomeIcon icon={faMapMarkerAlt} lat={60} lng={30} text="Island" />
//               <FontAwesomeIcon icon={faMapMarkerAlt} lat={60} lng={31} text="Something" />

//           </GoogleMapReact>
//       </div>
//       </>
//     )
//   }
// }


// geocode function
Geocode.setApiKey("AIzaSyALTeDJY0y4Ui6Q8wtOE0hZooVKsPTapt0");
// Geocode.setLanguage("en"); // default language is English

function geocode(address) { // need to figure out how to save lat and lng
  Geocode.fromAddress(address).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    error => {
      console.error(error);
    }
  );
}

let address = '6150 W Touhy Ave, Niles, IL 60714';
