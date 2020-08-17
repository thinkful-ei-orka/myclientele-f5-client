import React from 'react';
import ScheduleSearch from '../../components/ScheduleView/ScheduleSearch/ScheduleSearch';
import ClientCard from '../../components/ClientCard/ClientCard';
import PrivateContext from '../../contexts/PrivateContext';

export default class ClientsRoute extends React.Component {
  static contextType = PrivateContext;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  handleSearchChange = (e) => {
    this.context.setScheduleSearch(e.target.value)
  }

  componentDidMount() {
    if (this.context.clients == null) {
      this.context
        .fetchClients()
        .then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    if (this.context.clients == null) {
      return <div>Loading...</div>;
    }

    let clientsFilter = this.context.clients;

    if (this.context.scheduleSearch) {
      const searchTerm = this.context.scheduleSearch.toLowerCase();
      clientsFilter = clientsFilter.filter((client) =>
        client.name.toLowerCase().includes(searchTerm)
      );
    }

    return <>
      <div className='schedule-page'>
        <div className='schedule-drop-down'>
          <ScheduleSearch />
        </div>
        <div className='client-cards'>
          {clientsFilter.map((store) => (
            <ClientCard data={store} key={store.id} />
          ))}
        </div>
      </div>
    </>;
  }

}
