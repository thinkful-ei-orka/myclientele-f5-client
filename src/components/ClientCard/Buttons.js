import React from 'react';
import { Link } from 'react-router-dom';
import moreinfosvg from '../../images/clientcard/moreinfo.svg';
import addsvg from '../../images/clientcard/add.svg';
import PrivateContext from '../../contexts/PrivateContext';
import ClientApiService from '../../services/client-api-service';

class Buttons extends React.Component {
  static contextType = PrivateContext;
  //   state = { ...this.props.state };
  screenWidth = window.innerWidth;

  renderThreeDotsButton = () => {
    console.log('three dots called');
    return (
      <div className='dropdown_box'>
        <ul className='dropdown'>
          <li className='dropdown_item'>
            <Link
              to={{
                pathname: '/take-report',
                state: {
                  data: this.props.data,
                },
              }}>
              Take a report
            </Link>
          </li>
          <li className='dropdown_item'>View reports</li>
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
    const id = this.data.id;
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
          <button onClick={this.toggleRemove}>Cancel</button>
          <button onClick={this.removeClient}>Remove</button>
        </div>
      </div>
    );
  };

  //   toggleThreeDots = () => {
  //     this.setState({
  //       threeDotsActive: !this.state.threeDotsActive,
  //     });
  //   };
  render() {
    if (this.screenWidth < 600) {
      return (
        <div className='button-area'>
          <Link
            to={{
              pathname: '/take-report',
              state: {
                data: this.props.data,
              },
            }}>
            <button className='add-button  '>
              <img src={addsvg} alt='add button' />
            </button>
          </Link>
          <button className='more-info  ' onClick={this.toggleThreeDots}>
            <img src={moreinfosvg} alt='more info button' />
          </button>
          {this.props.threeDotsActive ? this.renderThreeDotsButton() : ''}
        </div>
      );
    } else {
      return (
        <div className='button-area'>
          <Link
            to={{
              pathname: '/take-report',
              state: {
                data: this.props.data,
              },
            }}>
            <button className='add-button  '>
              <img src={addsvg} alt='add button' />
            </button>
          </Link>
          <button className='more-info  ' onClick={this.toggleThreeDots}>
            <img src={moreinfosvg} alt='more info button' />
          </button>
          {this.props.threeDotsActive ? this.renderThreeDotsButton() : ''}
        </div>
      );
    }
  }
}

export default Buttons;
