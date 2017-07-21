import React, { Component } from 'react';

export default function asyncComponent(importComponent) {

  class AsyncComponent extends Component {

    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    renderComponent(C) {
      return <C {...this.props} />;
    }

    renderLoader() {
      return <div>Loading component ...</div>;
    }

    render() {
      const C = this.state.component;

      return C
        ? this.renderComponent(C)
        : this.renderLoader();
    }

  }

  return AsyncComponent;
}