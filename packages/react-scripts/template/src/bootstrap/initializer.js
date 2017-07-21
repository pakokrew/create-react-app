import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

class InitializerComponent extends React.Component {
  state = {
    ready: false,
    error: null,
  };

  componentWillMount() {
    this.runBeforeLoad()
      .then(() => {
        this.setState({ ready: true, error: null });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  runBeforeLoad() {
    this.run = 0; // useless
    return Promise.all([]);
  }

  render() {
    const { ready, error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <p style={{ textAlign: 'center' }}>
          There was an error while loading the application.
        </p>
      );
    }
    return ready ? children : <Loader />;
  }
}

InitializerComponent.propTypes = {
  children: PropTypes.node,
};

InitializerComponent.defaultProps = {
  children: null,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(InitializerComponent);
