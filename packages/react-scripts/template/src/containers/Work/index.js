import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Home extends Component {
  state = {};

  render() {
    return (
      <div className="home_container">
        Work
      </div>
    );
  }
}

Home.propTypes = {
};

Home.defaultProps = {
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
