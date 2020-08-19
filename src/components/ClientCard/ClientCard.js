import React from 'react';
import { Link } from 'react-router-dom';
import moreinfosvg from '../../images/clientcard/moreinfo.svg';
import addsvg from '../../images/clientcard/add.svg';
import OpenOrClosed from './OpenOrClosed';
import './ClientCard.scss';
import ClientApiService from '../../services/client-api-service';
// import PrivateContext from '../../contexts/PrivateContext';
// import Buttons from './Buttons';

class ClientCard extends React.Component {
  // static contextType = PrivateContext;
  state = {
    threeDotsActive: false,
    confirmRemoveClient: false,
  };

  renderThreeDotsButton = () => {
    return (
      <div className='dropdown_box'>
        <ul className='dropdown'>
          {/* <li className='dropdown_item'>
            <Link
              to={{
                pathname: '/take-report',
                state: {
                  data: this.props.data,
                },
              }}>
              Take a report
            </Link>
          </li> */}
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
          <li className='dropdown_item' onClick={this.toggleRemove}>
            Remove
          </li>
        </ul>
      </div>
    );
  };

  toggleRemove = () => {
    this.setState({
      confirmRemoveClient: !this.state.confirmRemoveClient,
    });
  };

  removeClient = () => {
    const id = this.props.data.id;
    ClientApiService.deleteClient(id).then(() => this.context.fetchClients());
  };

  renderConfirmRemove = () => {
    return (
      <div className='confirm_remove_box'>
        <p>
          Are you sure you want to remove this client? If you do so, all reports
          associated with this client will also be removed.
        </p>
        <div className='button_box'>
          <button id='cancel-client-remove-button' onClick={this.toggleRemove}>
            Cancel
          </button>
          <button onClick={this.removeClient}>Remove</button>
        </div>
      </div>
    );
  };

  toggleThreeDots = () => {
    this.setState({
      threeDotsActive: !this.state.threeDotsActive,
    });
  };

  render() {
    const {
      name,
      // id,
      location,
      currently_closed,
      // day_of_week,
      // general_manager,
      hours_of_operation,
      // notes,
    } = this.props.data;
    let reportPath;
    if(window.outerWidth < 600) {
      reportPath = `/clients/${this.props.data.id}/add`
    } else {
      reportPath = '/take-report'
    }
    return (
      
      <div className='client-card'>
        {this.state.confirmRemoveClient ? this.renderConfirmRemove() : ''}
        <div className='company-logo'>
          <img src='https://via.placeholder.com/150' alt={name} />
        </div>
        <div className='information-area'>
          <h2>{name} </h2>
          <div className='location'>{location}</div>

          <OpenOrClosed
            currently_closed={currently_closed}
            hours_of_operation={hours_of_operation}
          />
        </div>
        {/* <Buttons
            threeDotsActive={this.state.threeDotsActive}
            // renderThreeDotsButton={() => this.renderThreeDotsButton()}
            data={this.props.data}
            // state={this.state}
            toggleThreeDots={() => this.toggleThreeDots()}
          /> */}
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
