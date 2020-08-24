import React from "react";
import Header from "../../components/Header/Header";
import Modal from "react-modal";
import "./Homepage.scss";
import map from "../../images/homepage/map.png";
import counting from "../../images/homepage/counting-money.jpg";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default class HomepageRoute extends React.Component {
  //Main landing page
  state = {
    signUpIsOpen: false,
  };

  setSignUpOpen = (bool) => {
    this.setState({ signUpIsOpen: bool });
  };

  componentDidMount() {
    Modal.setAppElement(".App");
  }

  render() {
    return (
      <>
        <Header />
        <div className="signup-modal">
          <Modal
            isOpen={this.state.signUpIsOpen}
            onRequestClose={(e) => this.setSignUpOpen(false)}
          >
            <SignUpForm closeModal={(e) => this.setSignUpOpen(false)} />
          </Modal>
        </div>
        <section className="hero-banner">
          <div className="hero-text">
            <button className="btn" onClick={(e) => this.setSignUpOpen(true)}>
              Sign Up Now!
            </button>
            <p>
              Keep track of clients, write reports, and organize your weekly
              schedule, all in one place! With MyClientele, you have access to
              all your information no matter where you are.
            </p>
          </div>
        </section>

        <section>
          <div className="homepage-extrainfo">
            <div className="wrapper-left">
              <img src={counting} alt="Saving money"></img>
              <p>
                Start saving money by reducing missed leads and ensure correct
                product ordering for all of your clients.
              </p>
            </div>
            <div className="wrapper-right">
              <p>
                Integrated map and routing to ensure timely check-ins to each of
                your clients.
              </p>
              <img src={map} alt="Map check-ins"></img>
            </div>
          </div>
        </section>
      </>
    );
  }
}
