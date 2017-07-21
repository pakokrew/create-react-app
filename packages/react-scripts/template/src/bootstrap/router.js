import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import * as routes from '../constants/routes';
import asyncComponent from '../helpers/asyncComponent';

import Layout from '../components/Layout';

// Bundled
import Home from '../containers/Home';

// Async loaded
const Work  = asyncComponent(() => import('../containers/Work'));

const RouterContainer = () => {
  return (
    <Layout>
      <Router path={routes.Root}>
        <Switch>
          <Route exact path={routes.Home} component={Home} />
          <Route exact path={routes.Work} component={Work} />
          <Redirect from="*" to={routes.Home} />
        </Switch>
      </Router>
    </Layout>
  );
};

RouterContainer.propTypes = {
};

RouterContainer.defaultProps = {
};

export default connect(null, null)(RouterContainer);
