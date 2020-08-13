import React from "react";
import { Link } from "react-router-dom";
import closedsvg from "../../images/clientcard/closed.svg";
import opensvg from "../../images/clientcard/open.svg";
import editsvg from "../../images/clientcard/edit.svg";
import moreinfosvg from "../../images/clientcard/moreinfo.svg";
import edit2 from "../../images/clientcard/edit2.svg";
import OpenOrClosed from "./OpenOrClosed";
import "./ClientCard.scss";
import ClientApiService from "../../services/client-api-service";
import PrivateContext from "../../contexts/PrivateContext";

class ClientCard extends React.Component {
  static contextType = PrivateContext;
  state = {
    threeDotsActive: false,
    confirmRemoveClient: false,
  };

  renderThreeDotsButton = () => {
    return (
      <div className="dropdown_box">
        <ul className="dropdown">
          <li className="dropdown_item">
            <Link
              to={{
                pathname: "/take-report",
                state: {
                  data: this.props.data,
                },
              }}
            >View Client</Link>
          </li>
          <li className="dropdown_item">
            <Link
            to={{
              pathname: "/form",
              state: {
                data: this.props.data
              }
            }}
            >Edit client</Link>
          </li>
          <li className="dropdown_item" onClick={this.toggleRemove}>
            Remove Client
          </li>
        </ul>
      </div>
    );
  };
  
  toggleRemove = () => {
    this.setState({
      confirmRemoveClient: !this.state.confirmRemoveClient
    })
  }

  removeClient = () => {
    const id = this.props.data.id;
    ClientApiService.deleteClient(id)
    .then(() => this.context.fetchClients());
  }

  renderConfirmRemove = () => {
    return (
      <div className="confirm_remove_box">
        <p>Are you sure you want to remove this client? If you do so, all reports associated with this client will also be removed.</p>
        <div className="button_box">
          <button onClick={this.toggleRemove}>Cancel</button>
          <button onClick={this.removeClient}>Remove</button>
        </div>
      </div>
    )
  }

  toggleThreeDots = () => {
    this.setState({
      threeDotsActive: !this.state.threeDotsActive,
    });
  };

  render() {
    const closed = (
      <svg height="30" width="30">
        <circle
          cx="20"
          cy="20"
          r="10"
          stroke="none"
          strokeWidth="3"
          fill="#cc3737"
        />
      </svg>
    );
    const open = (
      <svg height="30" width="30">
        <circle
          cx="20"
          cy="20"
          r="10"
          stroke="none"
          strokeWidth="3"
          fill="#64bf49"
        />
      </svg>
    );
    const {
      name,
      id,
      location,
      currently_closed,
      day_of_week,
      general_manager,
      hours_of_operation,
      notes,
    } = this.props.data;

    //TODO: Create function to handle the visually hidden portion for screen readers

    return (
      <div className="schedule-card">
        {this.state.confirmRemoveClient
        ? this.renderConfirmRemove()
        : ""
        }
        <div className="company-logo">
          <img src="https://via.placeholder.com/150" alt={name} />
        </div>
        <div className="information-area">
          <h2>{name} </h2>
          <div className="location">{location}</div>

          <OpenOrClosed
            currently_closed={currently_closed}
            hours_of_operation={hours_of_operation}
          />
        </div>
        <div className="button-area">
          <Link
            to={{
              pathname: "/take-report",
              state: {
                data: this.props.data,
              },
            }}
          >
            <button className="edit-button  ">
              <img src={editsvg} alt="edit button" />
            </button>
          </Link>
          <button className="more-info  " onClick={this.toggleThreeDots}>
            <img src={moreinfosvg} alt="more info button" />
          </button>
        </div>
        {this.state.threeDotsActive ? this.renderThreeDotsButton() : ""}
      </div>
    );
  }
}

export default ClientCard;
