import React from "react";
import { Link } from "react-router-dom";
import PrivateContext from "../../contexts/PrivateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faUsers, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import UserApiService from '../../services/user-api-service';

export default class EmployeeBox extends React.Component {
  static contextType = PrivateContext;

  state = {
    modalIsOpen: false,
    error: null,
  };

  setModalOpen = (bool) => {
    this.setState({ modalIsOpen: bool });
  };

  setUserDisabled = (bool) => {
    // Makes patch request to API
    UserApiService.updateUserContactInfo(
      { user_disabled: bool }
    )
    .then((res) => {
      // console.log(res);
      this.props.updateEmployees();
      this.setModalOpen(false);
    })
    .catch((res) => {
      this.setState({ error: res.error})
    })
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'test') Modal.setAppElement('.App');
  }

  render() {
    let modalContents;
    let removeButton;
    let reactivateButton;

    // if the user is disabled, set the modal contents and reactivate buttons
    if (this.props.employee.user_disabled) {
      modalContents = <div>
        <h2>Reactivate {this.props.employee.name}?</h2>
        <div className='modal-buttons'>
          <button className="btn" onClick={(e) => this.setUserDisabled(false)}>Reactivate</button>
          <button className="btn outline" onClick={(e) => this.setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>;
      reactivateButton = <button className="btn outline employee_button" onClick={(e) => this.setModalOpen(true)}>Reactivate employee</button>
    } else { // otherwise, set modal contents and disable button
      modalContents = <div>
        <h2>Disable {this.props.employee.name}?</h2>
        <p>{this.props.employee.name} will no longer to be able to log in and create reports, but you will still be able to see existing reports. You may also reenable his account later.</p>
        <div className='modal-buttons'>
          <button className="btn" onClick={(e) => this.setUserDisabled(true)}>Disable</button>
          <button className="btn outline" onClick={(e) => this.setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>;
      removeButton = <button className="remove_employee" onClick={(e) => this.setModalOpen(true)}><FontAwesomeIcon icon={faTimes} /></button>
    }

    return (
      <div className="employee_box">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={(e) => this.setModalOpen(false)}>
            {modalContents}
        </Modal>
        {removeButton}
        <div className="employee_profile">
          <i className="fas fa-user fa-3x"></i>
        </div>
        <h2 className="employee_name">{this.props.employee.name}</h2>
        <p>Username: {this.props.employee.user_name}</p>
        <div className="employee_buttons">
          <Link
            to={{
              pathname: `/employees/${this.props.employee.id}/clients`,
              state: {
                data: this.props.data,
              },
            }}
          >
            <button className="employee_button employee_client_button btn">
              <FontAwesomeIcon icon={faUsers} />
              Clients
            </button>
          </Link>
          <Link
            to={{
              pathname: `/employees/${this.props.employee.id}/reports`,
              state: {
                data: this.props.data,
              },
            }}
          >
            <button className="employee_button dark btn">
              <FontAwesomeIcon icon={faFileAlt} />
              Reports
            </button>
          </Link>
            {reactivateButton}
        </div>
      </div>
    );
  }
}
