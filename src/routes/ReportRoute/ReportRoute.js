import React from 'react';
import ReportsApiService from '../../services/reports-api-service';
import PrivateContext from '../../contexts/PrivateContext';
import './reportroute.scss';
import ClientApiService from '../../services/client-api-service';

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,  } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
class ReportRoute extends React.Component {
  static contextType = PrivateContext;
  constructor(props) {
    super(props);
    this.state = {
      report: null,
      client: [],
    }
  }

  renderSwiper = () => {
    if (this.state.report.photos) {
      let slides = [];
      this.state.report.photos.forEach((photo, index) => {
        slides.push(<SwiperSlide key={photo}><img src={photo} alt={index} className="slide_photo" key={`slide ${index}`}/></SwiperSlide>)
      })
      let center = window.outerWidth * 0.2
      return (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          slidesOffsetBefore={center}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
        {slides}
        </Swiper>
      );
    } else {
      console.log('no photos');
    }
  };

  renderPhotos = () => {
    return (
      <div className='photo_list'>
        {this.state.report.photos.map((photo) => {
          return (
            <img
              src={photo}
              className='report_photo'
              alt='report_photo'
              key={photo}
            />
          );
        })}
      </div>
    );
  };

  componentDidMount() {
    if (this.context.clients === null) {
      ClientApiService.getAllClients().then((res) => {
        this.context.updateContext({ clients: res });
      });
    }
    ReportsApiService.getReport(this.props.match.params.report_id).then(
      (res) => {
        let client = this.context.clients.find(
          (client) => client.id === res[0].client_id
        );

        this.setState({
          report: res[0],
          client: client,
        });
      }
    );
  };

  render() {

    if(!this.state.report) {
      return (<p>Loading...</p>)
    }

    const newDate = new Date(this.state.report.date);
    return (
      <>
      <section className='single-report-section'>
        <p id='report-date'>
          <b>Report Date: </b>
          {`${newDate.toLocaleDateString()} @ ${newDate.toLocaleTimeString()}`}
        </p>
        <h2>{this.state.client.name}</h2>
        <h3>Notes:</h3>
        <div className='notes-area'>{this.state.report.notes}</div>
        <h3>Photos: </h3>
      </section>
        {Object.keys(this.state.report).length !== 0 ? this.renderSwiper() : ''}
        <div className="zoom_container"></div>
      </>
    );
  }
}

export default ReportRoute;
