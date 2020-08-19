import React from "react";
import { withRouter } from "react-router-dom";
import "./AddClientForm.scss";
// import ScheduleDropDown from "../Dropdown/Dropdown";
import ClientApiService from "../../services/client-api-service";
import PrivateContext from "../../contexts/PrivateContext";
import TokenService from '../../services/token-service';
import config from '../../config';
import S3ApiService from "../../services/s3-api-service";

class AddClientForm extends React.Component {
  state = {
    name: "",
    location: "",
    lat: 0,
    lng: 0,
    googlePhoto: '',
    hours_of_operation: "",
    currently_closed: false,
    general_manager: "",
    day_of_week: 0,
    notes: "",
    header_text: "Add a Client",
    button_text: "Add Client",
  };
  static contextType = PrivateContext;

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      location,
      lat,
      lng,
      day_of_week,
      hours_of_operation,
      currently_closed,
      notes,
      general_manager,
    } = this.state;
    const photoInput = e.target["client-photo-input"];
    const file = photoInput.files[0];
    console.log(file);
    let res = await S3ApiService.getUploadUrl(file.name, file.type)
    let data = await fetch(res.url, {
          method: 'PUT',
          body: file,
        });
    let photo = data.url.split('?')[0];
    let newClient = {
      name,
      location,
      lat,
      lng,
      day_of_week,
      hours_of_operation,
      currently_closed,
      notes,
      photo,
      general_manager,
    };
    if (this.props.location.state) {
      if (this.props.location.state.data) {
        ClientApiService.updateClient(
          this.props.location.state.data.id,
          newClient
        )
          .then(() => {
            this.context.fetchClients();
          })
          .then(() => this.props.history.push("/schedule"));
      } else {
        console.log('went into the else in the if props exists part')
        console.log('newClient', newClient)
        ClientApiService.addClient(newClient)
        .then(() => {
          this.context.fetchClients();
        })
        .then(() => this.props.history.push("/schedule"));
      }
    } else {
      ClientApiService.addClient(newClient)
        .then(() => {
          this.context.fetchClients();
        })
        .then(() => this.props.history.push("/schedule"));
    }
  };
  setName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  setLocation = (e) => {
    this.setState({
      location: e.target.value,
    });
  };
  setHours = (e) => {
    this.setState({
      hours_of_operation: e.target.value,
    });
  };
  setCurrentlyClosed = (e) => {
    this.setState({
      currently_closed: !this.state.currently_closed,
    });
  };
  setGM = (e) => {
    this.setState({
      general_manager: e.target.value,
    });
  };
  setNotes = (e) => {
    this.setState({
      notes: e.target.value,
    });
  };
  setDayOfWeek = (e) => {
    this.setState({
      day_of_week: e.target.value,
    });
  };

  renderSelectField = () => {
    let daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "I dont visit this client weekly",
    ];
    return (
      <select
        className="day_dropdown"
        name="day_dropdown"
        value={this.state.day_of_week}
        onChange={this.setDayOfWeek}
      >
        {daysOfWeek.map((day, index) => {
          return (
            <option value={index} key={day}>
              {day}
            </option>
          );
        })}
      </select>
    );
  };

  checkProps = () => {
    if(this.props.location.state.data) {
      const {
        name,
        location,
        lat,
        lng,
        hours_of_operation,
        general_manager,
        notes,
        photo_reference,
      } = this.props.location.state.data;

      if (photo_reference) {
        this.getGoogleImage(photo_reference);
      }

      this.setState({
        name,
        location,
        lat,
        lng,
        hours_of_operation,
        general_manager,
        notes,
        header_text: 'Edit Client',
        button_text: 'Update Client'
      });
    } else if (this.props.location.state.client) {
      const {
        name,
        location,
        lat,
        lng,
        photo_reference,
      } = this.props.location.state.client;

      if (photo_reference) {
        this.getGoogleImage(photo_reference);
      }

      this.setState({
        name,
        location,
        lat,
        lng
      });
    }
  };

  getGoogleImage = (photo_reference) => {
    return fetch(`${config.API_ENDPOINT}/places/photo_reference?photo_reference=${photo_reference}&max_width=600`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((json) => {
        this.setState({googlePhoto: json});
        console.log('this.state.googlePhoto should be:', json);
      });
  }

  componentDidMount() {
    this.checkProps();
  }

  render() {
    return (
      <form className="add_client_form" onSubmit={(e) => this.handleSubmit(e)}>
        <h2 id="title">{this.state.header_text}</h2>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="client_name"
          name="name"
          required
          value={this.state.name}
          onChange={this.setName}
        />
        <label htmlFor="location">Location *</label>
        <input
          type="text"
          id="client_location"
          name="location"
          required
          value={this.state.location}
          onChange={this.setLocation}
        />
        <label htmlFor="hours_of_operation">Hours of Operation *</label>
        <input
          type="text"
          id="client_hours_of_operation"
          name="hours_of_operation"
          required
          value={this.state.hours_of_operation}
          onChange={this.setHours}
        />
        <label htmlFor="currently_closed">
          Is this store currently closed? If yes, check box.
        </label>
        <input
          type="checkbox"
          id="client_currently_closed"
          name="currently_closed"
          value={this.state.currently_closed}
          onChange={this.setCurrentlyClosed}
        />
        <label htmlFor="client-photo-input">Add a photo:</label>
        <input
          type="file"
          accept="image/*"
          name="client-photo-input"
          id="client-photo-input"
          alt="alt_text"
          required
        ></input>
        <label htmlFor="general_manager">General Manager (optional)</label>
        <input
          type="text"
          id="client_general_manager"
          name="general_manager"
          value={this.state.general_manager}
          onChange={this.setGM}
        />
        <label htmlFor="notes">Additional Notes (optional)</label>
        <input
          type="textarea"
          id="client_notes"
          name="notes"
          value={this.state.notes}
          onChange={this.setNotes}
        />
        <p>What day of the week do you visit this client?</p>
        {this.renderSelectField()}
        <button className="btn" type="submit" id="submit_button">
          {this.state.button_text}
        </button>
      </form>
    );
  }
  static defaultProps = {
    day_of_week: 0,
  };
}

export default withRouter(AddClientForm);
