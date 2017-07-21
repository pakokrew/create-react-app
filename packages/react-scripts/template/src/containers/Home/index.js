import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../components/Button';

import { selAlice, setAlice, selBob, setBob } from '../../business/reducerA';

export class Home extends Component {
  state = {};

  render() {
    return (
      <div className="home_container">
        Home
        <p>{this.props.alice}</p>
        <Button onClick={() => this.props.setAlice('coucou')}>Click prop</Button>
        <p>{this.props.bob}</p>
        <Button onClick={() => this.props.setBob(1)}>Click bob</Button>
      </div>
    );
  }
}

Home.propTypes = {
};

Home.defaultProps = {
};

const mapStateToProps = state => ({
  alice: selAlice(state),
  bob: selBob(state),
});

const mapDispatchToProps = {
  setAlice: setAlice,
  setBob: setBob,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
