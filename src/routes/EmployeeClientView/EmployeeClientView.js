import React from "react";
import { Link } from "react-router-dom";
import UserApiService from "../../services/user-api-service";
import ClientApiService from "../../services/client-api-service";
import "./EmployeeClientView.scss";

export default class EmployeeClientView extends React.Component {
  //Only accessible as an adminstrator
  state = {
    error: null,
    client: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      let user = await UserApiService.getUserContactInfo();
      if (!user.admin) {
        //If the user is an admin then redirect the user to their schedule page
        const { history } = this.props;
        history.push("/schedule");
        window.location.reload();
      }
      let employee_id = window.location.pathname.split("/")[2];
      let client_id = window.location.pathname.split("/")[4];
      let employee_client = await ClientApiService.getClient(client_id);
      if (Number(employee_client.sales_rep_id) !== Number(employee_id)) {
        this.setState({
          error: "Invalid client",
          loading: false,
        });
      } else {
        this.setState({
          client: employee_client,
          loading: false,
        });
      }
    } catch (res) {
      this.setState({
        error: res.error,
        loading: false,
      });
    }
  };

  renderClient() {
    //Component that renders the client information.
    let { client } = this.state;
    let imgsrc = "https://via.placeholder.com/150";
    //imgsrc is set to default as a placeholder image
    if (client.photo) {
      imgsrc = client.photo;
    }
    return (
      <div id="employee_client_info">
        <h2 id="client_name">{client.name}</h2>
        <img src={imgsrc} alt={client.name} id="client_image"/>
        <p>{client.location}</p>
        <p>{client.hours_of_operation}</p>
        <p>General Manager: {client.general_manager}</p>
        <p>Notes: {client.notes}</p>
        <Link
              to={{
                pathname: `/employees/${this.state.client.sales_rep_id}/clients`,
              }}
            >
              <button className="btn dark">Return</button>
            </Link>
      </div>
    );
  };
  
  render() {
    if (this.state.loading) {
      return <p>loading</p>;
    }
    return (
      <div className="employee_client_box">
        <div className="employee_info"></div>
        {this.state.error ? (
          <div className="error_box">
            <p id="error_statement">
              {this.state.error}. Please return to dashboard.
            </p>
            <Link
              to={{
                pathname: "/dashboard",
              }}
            >
              <button className="btn dark">Return</button>
            </Link>
          </div>
        ) : this.state.client ? (
          this.renderClient()
        ) : (
          <p>Invalid client</p>
        )}
      </div>
    );
  }
}
