// For Add Client:
// - Default the map to the user’s location
// - Add a search input (instead of Click me)
// - Integrate with add-client router
// - Populate add client form when selecting a client

// Remove satellite and street view functions
// Display a list of results in addition to the markers (using place_id as a correlation)
// Show labels next to markers (like the store name)
// Show more information when clicking a label
// Style for mobile and desktop

import React from 'react';
import SimpleMap from '../SimpleMap/SimpleMap'

class AddClient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currLocation: []
    }
  }

  componentDidMount() {
    let lat = 0;
    let lng = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('lat', position.coords.latitude)
          console.log('lng', position.coords.longitude)
          lat = position.coords.latitude
          lng = position.coords.longitude
          if (lat !== 0 && lng !== 0) {
            this.setState({
              currLocation: [lat, lng]
            })
          }
      })
    }
  }

  render() {
    console.log('state', this.state)
    
    return (
      <section>
        <SimpleMap />
      </section>
    )
  }
}

export default AddClient