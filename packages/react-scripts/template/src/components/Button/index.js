import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

// replace span par children
const Button = ({ className, children, onClick, disabled }) => (
  <span
    aria-label="button"
    role="button"
    tabIndex={0}
    className={`button ${className} ${disabled ? 'disabled' : ''}`}
    onClick={!disabled && onClick}
  >
    {children}
  </span>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  onClick: () => 0,
  children: null,
  disabled: false,
};

export default Button;
