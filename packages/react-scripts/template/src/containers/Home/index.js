import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import { Link } from 'react-router-dom';

import * as routes from '../../constants/routes';

import { selAlice, selBob, selCharles, selDidier, setAlice, setBob, setCharlesStart, setCharlesResolve, setDidierStart, setDidierReject  } from '../../business/reducer';

export class Home extends Component {
  state = {};

  render() {
    return (
      <div className="home_container">
        Home
        <p>Alice: {this.props.alice}</p>
        <Button onClick={() => this.props.setAlice('coucou')}>Coucou Alice</Button>
        <p>Bob: {this.props.bob}</p>
        <Button onClick={() => this.props.setBob(1)}>+1 bob</Button>
        <div>
          <p><b>Charles</b></p>
          <p>isLoading {this.props.charles.isLoading.toString()}</p>
          <p>data {this.props.charles.data}</p>
          <p>error {this.props.charles.error}</p>
          <Button onClick={() => this.props.setCharlesStart()}>Start Alice</Button>
          <Button onClick={() => this.props.setCharlesResolve('je reussi')}>Resolve alice</Button>
        </div>
        <div>
          <p><b>Didier</b></p>
          <p>isLoading {this.props.didier.isLoading.toString()}</p>
          <p>data {this.props.didier.data}</p>
          <p>error {this.props.didier.error}</p>
          <Button onClick={() => this.props.setDidierStart()}>Start Bob</Button>
          <Button onClick={() => this.props.setDidierReject('je plante')}>Reject Bob</Button>
        </div>

        <Link to={routes.Work}>Go to work</Link>
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
  charles: selCharles(state),
  didier: selDidier(state),
});

const mapDispatchToProps = {
  setAlice,
  setBob,
  setCharlesStart,
  setCharlesResolve,
  setDidierStart,
  setDidierReject,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
