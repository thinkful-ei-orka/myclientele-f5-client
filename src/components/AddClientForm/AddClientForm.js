import React from "react";
import './AddClientForm.scss';
// import ScheduleDropDown from "../Dropdown/Dropdown";

export default class AddClientForm extends React.Component {
  state = {
    name: "",
    location: "",
    hours_of_operation: "",
    currently_closed: false,
    general_manager: "",
    day_of_week: 0,
    notes: ""
  };

  handleSubmit = e => {
      e.preventDefault();
      const { name, location, hours_of_operation, currently_closed, general_manager, day_of_week, notes } = this.state;
      console.log(name, location, hours_of_operation, currently_closed, general_manager, day_of_week, notes);
  }
  setName = e => {
      this.setState({
        name: e.target.value
      })
  }
  setLocation = e => {
      this.setState({
          location: e.target.value
      })
  }
  setHours = e => {
      this.setState({
          hours_of_operation: e.target.value
      })
  }
  setCurrentlyClosed = e => {
      this.setState({
          currently_closed: !this.state.currently_closed
      })
  }
  setGM = e => {
      this.setState({
          general_manager: e.target.value
      })
  }
  setNotes = e => {
      this.setState({
          notes: e.target.value
      })
  }
  setDayOfWeek = e => {
      this.setState({
          day_of_week: e.target.value
      })
  }
  renderSelectField = () => {
    let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'I dont visit this client weekly']
    return (
        <select className='day_dropdown' name='day_dropdown' value={this.state.day_of_week} onChange={this.setDayOfWeek}>
            {daysOfWeek.map((day, index) => {
                return <option value={index} key={day}>{day}</option>
            })}
        </select>
    )
  }

  

  render() {
    return (
      <form className="add_client_form" onSubmit={this.handleSubmit}>
          <h2 id='title'>Add a client</h2>
        <label htmlFor="name">Name *</label>
        <input type="text" id="client_name" name="name" required value={this.state.name} onChange={this.setName}/>
        <label htmlFor="location">Location *</label>
        <input type="text" id="client_location" name="location" required value={this.state.location} onChange={this.setLocation}/>
        <label htmlFor="hours_of_operation">Hours of Operation *</label>
        <input type="text" id="client_hours_of_operation" name="hours_of_operation" required value={this.state.hours_of_operation} onChange={this.setHours}/>
        <label htmlFor="currently_closed">Is this store currently closed? If yes, check box.</label>
        <input type="checkbox" id="client_currently_closed" name="currently_closed" value={this.state.currently_closed} onChange={this.setCurrentlyClosed}/>
        <label htmlFor="general_manager">General Manager (optional)</label>
        <input type="text" id="client_general_manager" name="general_manager" value={this.state.general_manager} onChange={this.setGM}/>
        <label htmlFor="notes">Additional Notes (optional)</label>
        <input type="textarea" id="client_notes" name="notes" value={this.state.notes} onChange={this.setNotes}/>
        <p>What day of the week do you visit this client?</p>{this.renderSelectField()}
        <button type='submit' id='submit_button'>Add Client</button>
        
      </form>
    );
  }
  static defaultProps = {
    day_of_week: 0
  }
}


