import React from "react";
import { Link } from "react-router-dom";
import UserApiService from "../../services/user-api-service";
import ClientApiService from "../../services/client-api-service";
import "./EmployeeClientsRoute.scss";

export default class EmployeeClientsRoute extends React.Component {
  state = {
    error: null,
    employee: null,
    clients: null,
    clientSearch: "",
    loading: true,
  };

  async componentDidMount() {
    try {
      let user = await UserApiService.getUserContactInfo();
      if (!user.admin) {
        const { history } = this.props;
        history.push("/schedule");
        window.location.reload();
      }
      let employee_id = window.location.pathname.split("/")[2];
      if (isNaN(Number(employee_id))) {
        this.setState({
          error: "Invalid employee",
          loading: false
        });
      } else {
        let employee_clients = await ClientApiService.getClientsBySalesRepId(
          employee_id
        );
        this.setState({
          employee: employee_clients.employee,
          clients: employee_clients.clients,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        error: error.error,
        loading: false,
      });
    }
  }

  setClientSearch = (e) => {
    this.setState({
      clientSearch: e.target.value,
    });
  };

  renderClients = () => {
    let clients = this.state.clients.filter((client) =>
      client.name.toLowerCase().includes(this.state.clientSearch.toLowerCase())
    );
    return (
      <div className="clients_box">
        <div className="employee_info_box">
          <i className="fas fa-user fa-3x"></i>
          <h1 id="employee_name">{this.state.employee.name}</h1>
          <input
            type="text"
            placeholder="Search for client"
            id="client_search_box"
            value={this.state.clientSearch}
            onChange={this.setClientSearch}
          />
        </div>
        {clients.length === 0 ? (
          <div id="no_clients_statement">
            <p id="no_clients_sentence">
              <strong>{this.state.employee.name}</strong> Does not currently
              have any clients
            </p>
            <Link
              to={{
                pathname: "/dashboard",
              }}
            >
              <button id="employee_back_button">Back</button>
            </Link>
          </div>
        ) : (
          clients.map((client, index) => {
            let client_path = `/employees/${this.state.employee.id}/clients/${client.id}`;
            return (
              <div className="client_box" key={`client ${index}`}>
                {client.photo && (
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="client_img"
                  />
                )}
                <h1>{client.name}</h1>
                <p>{client.location}</p>
                <Link
                  to={{
                    pathname: client_path,
                  }}
                >
                  <button className="employee_view_client_button">
                    View Client
                  </button>
                </Link>
              </div>
            );
          })
        )}
      </div>
    );
  };

  render() {
    console.log(this.state.clients);
    if (this.state.loading) {
      return <p>Loading...</p>;
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
              <button id="employee_back_button">Return</button>
            </Link>
          </div>
        ) : this.state.clients ? (
          this.renderClients()
        ) : (
          <p>This employee has no clients</p>
        )}
      </div>
    );
  }
}
