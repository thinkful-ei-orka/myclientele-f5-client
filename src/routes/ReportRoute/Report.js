import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import { prototype } from 'react-modal';

class Report extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      report: {}
    }
  }
  renderPhotos = () => {
    console.log(this.state.report)
    return (
      <div className="photo_list">
        {this.state.report.photos.map(photo => {
          return <img src={photo} className="report_photo" alt='report_photo'/>
        })}
      </div>
    )
  }

  componentDidMount() {
    ReportsApiService.getReport(this.props.match.params.report_id)
      .then(res =>  {
        this.setState({ 
          report: res[0]
         })
      })
  }

  render () {
    console.log('props', this.props)
    console.log('report', this.state.report)
    let photo_url = '';
    if (this.state.report) {
      if (this.state.report.photo_url === '') {
        photo_url = 'https://via.placeholder.com/150'
      } else {
        photo_url = this.state.report.photo_url
      }
    }
    console.log(photo_url)
    return (
      <section>
        <p>Client Name: {this.state.report.name}</p>
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

export default Report;