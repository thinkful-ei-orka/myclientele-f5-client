import React from 'react';
import Header from '../Header/Header';
import PrivateContext from '../../contexts/PrivateContext';
import GoogleMapComponent from '../GoogleMap/GoogleMap';

export default class ClientsMap extends React.Component {
  static contextType = PrivateContext;

  componentDidMount() {
    this.context.fetchClients();
  }

  render() {
    console.log(this.context.clients);

    return (
      <>
        <Header />
        <GoogleMapComponent clients={this.context.clients}></GoogleMapComponent>
      </>
    )
  }
}
