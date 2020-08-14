import React from 'react';
import PrivateContext from '../../contexts/PrivateContext';
import GoogleMapComponent from '../GoogleMap/GoogleMap';

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  state = {
    center: null,
  }

  setCenter = (center) => {
    this.setState({
      center: center,
    });
  }

  componentDidMount() {
    this.context.fetchClients();
  }

  render() {
    console.log('clients', this.context.clients);

    return (
      <>
        <GoogleMapComponent markers={this.context.clients} setCenter={this.setCenter}></GoogleMapComponent>
      </>
    )
  }
}
