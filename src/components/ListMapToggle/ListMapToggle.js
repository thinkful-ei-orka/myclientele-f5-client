import React from 'react';
import './ListMapToggle.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default class MobileNav extends React.Component {
  state = {
    listClass: '',
    mapClass: 'outline',
  }

  handleListClick = () => {
    this.setState({
      listClass: '',
      mapClass: 'outline',
    })

    this.props.listClick();
  }

  handleMapClick = () => {
    this.setState({
      listClass: 'outline',
      mapClass: '',
    })

    this.props.mapClick();
  }

  render() {
    return (
      <div className="list-map-buttons">
        <button className={`btn ${this.state.listClass}`} onClick={this.handleListClick}>
          <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
          List view
        </button>
        <button className={`btn ${this.state.mapClass}`} onClick={this.handleMapClick}>
          <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
          Map view
        </button>
      </div>
    );
  }
}
