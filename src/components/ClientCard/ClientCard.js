import React from 'react';
import { Link } from 'react-router-dom';
import moreinfosvg from '../../images/clientcard/moreinfo.svg';
import addsvg from '../../images/clientcard/add.svg';
import OpenOrClosed from './OpenOrClosed';
import './ClientCard.scss';
import ClientApiService from '../../services/client-api-service';
import PrivateContext from '../../contexts/PrivateContext';
import Modal from 'react-modal';

class ClientCard extends React.Component {
  static contextType = PrivateContext;

  state = {
    threeDotsActive: false,
    modalIsOpen: false,
  };

  renderThreeDotsButton = () => {
    return (
      <div className='dropdown_box'>
        <ul className='dropdown'>
          {window.outerWidth < 600 && <li className='dropdown_item'><Link
          to={{
            pathname: `/clients/${this.props.data.id}/reports`,
            state: {
              data: this.props.data
            }
          }}>
            View reports
          </Link></li>}
          <li className='dropdown_item'>
            <Link
              to={{
                pathname: '/add-client-form',
                state: {
                  data: this.props.data,
                },
              }}>
              Edit client
            </Link>
          </li>
          <li className='dropdown_item' onClick={(e) => this.setModalOpen(true)}>
            <span>Remove</span>
          </li>
        </ul>
      </div>
    );
  };

  setModalOpen = (bool) => {
    this.setState({ modalIsOpen: bool });
  };

  removeClient = () => {
    const id = this.props.data.id;
    ClientApiService.deleteClient(id).then(() => this.context.fetchClients());
  };


  toggleThreeDots = () => {
    this.setState({
      threeDotsActive: !this.state.threeDotsActive,
    });
  };

  componentDidMount() {
    Modal.setAppElement('.App');
  }

  render() {
    const {
      name,
      location,
      currently_closed,
      hours_of_operation,
    } = this.props.data;
    let reportPath;
    if (window.outerWidth < 600) {
      reportPath = `/clients/${this.props.data.id}/add`
    } else {
      reportPath = '/take-report'
    }
    let imgsrc = 'https://via.placeholder.com/150';
    if (this.props.data.photo) {
      imgsrc = this.props.data.photo;
    }
    return (
      <div className='client-card'>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={(e) => this.setModalOpen(false)}>
            <div className='confirm_remove_box'>
              <p>
                Are you sure you want to remove this client? If you do so, all reports
                associated with this client will also be removed.
              </p>
              <div className='button_box'>
                <button id='cancel-client-remove-button' onClick={(e) => this.setModalOpen(false)}>
                  Cancel
                </button>
                <button onClick={this.removeClient}>Remove</button>
              </div>
            </div>
        </Modal>
        <div className='company-logo'>
          <img src={imgsrc} alt={name} />
        </div>
        <div className='information-area'>
          <h2>{name} </h2>
          <div className='location'>{location}</div>

          <OpenOrClosed
            currently_closed={currently_closed}
            hours_of_operation={hours_of_operation}
          />
        </div>
        <div className='button-area'>
          <button className='add-button  '>
            <Link
              to={{
                pathname: reportPath,
                state: {
                  data: this.props.data,
                },
              }}>
              <div className='inner-button'>
                <img src={addsvg} alt='add button' />
                <span className='button-text'>Take Report</span>
              </div>
            </Link>
          </button>

          <button className='more-info  ' onClick={this.toggleThreeDots}>
            <div className='inner-button'>
              <img src={moreinfosvg} alt='more info button' />{' '}
              <span className='button-text' >More Info</span>
            </div>
          </button>
          {this.state.threeDotsActive ? this.renderThreeDotsButton() : ''}
        </div>
      </div>
    );
  }
}

export default ClientCard;
