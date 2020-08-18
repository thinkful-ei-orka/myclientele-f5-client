import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import PrivateContext from '../../contexts/PrivateContext';
// import { prototype } from 'react-modal';
import ClientApiService from '../../services/client-api-service';
class ReportRoute extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props)
    this.state = {
      report: {},
      client: [],
    }
  }
  renderPhotos = () => {
    return (
      <div className="photo_list">
        {this.state.report.photos.map(photo => {
          return <img src={photo} className="report_photo" alt='report_photo' key={photo}/>
        })}
      </div>
    )
  }

  componentDidMount() {
    if(this.context.clients === null) {
      ClientApiService.getAllClients().then((res) => {
        this.context.updateContext({ clients: res })
      } 
      );
    }
    ReportsApiService.getReport(this.props.match.params.report_id)
      .then(res =>  {
        let client = this.context.clients.find(client => client.id === res[0].client_id);

        this.setState({
          report: res[0],
          client: client
         })
      })
  }

  render () {
    let photo_url = '';
    if (this.state.report) {
      if (this.state.report.photo_url === '') {
        photo_url = 'https://via.placeholder.com/150'
      } else {
        photo_url = this.state.report.photo_url
      }
    }
    return (
      <section>
        <p>Client Name: {this.state.client.name}</p>
        <p>Notes: {this.state.report.notes}</p>
        <p><img src={photo_url} alt={this.state.report.name}></img></p>
        <p>Report Date: {this.state.report.date}</p>
        {/* <p>Sales Rep Name: {this.state.report.name}</p> */}
        {Object.keys(this.state.report).length !== 0
        ? this.renderPhotos()
        : ""
        }
      </section>
    )
  }
}

export default ReportRoute;
