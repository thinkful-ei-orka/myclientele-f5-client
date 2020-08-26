import React from "react";
import { Link } from "react-router-dom";
import PrivateContext from "../../contexts/PrivateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faUsers, faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';

export default class EmployeeBox extends React.Component {
  static contextType = PrivateContext;

  state = {
    modalIsOpen: false,
  };

  setModalOpen = (bool) => {
    this.setState({ modalIsOpen: bool });
  };

  componentDidMount() {
    Modal.setAppElement('.App');
  }

  render() {
    return (
      <div className="employee_box">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={(e) => this.setModalOpen(false)}>
            <div>
              <h2>Disable {this.props.employee.name}?</h2>
              <p>{this.props.employee.name} will no longer to be able to log in and create reports, but you will still be able to see existing reports. You may also reenable his account later.</p>
              <div className='modal-buttons'>
                <button className="btn" onClick={this.removeEmployee}>Disable</button>
                <button className="btn outline" onClick={(e) => this.setModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
        </Modal>
        <button className="remove_employee" onClick={(e) => this.setModalOpen(true)}><FontAwesomeIcon icon={faTimes} /></button>
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
        </div>
      </div>
    );
  }
}
