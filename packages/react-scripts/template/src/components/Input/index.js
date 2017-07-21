import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

import CustomTypes from '../../constants/customPropTypes';

const Input = ({
  className,
  innerClassName,
  input,
  type,
  placeholder,
  children,
  rows,
  cols,
  min,
  max,
  step,
  meta,
}) => (
  <div className={className}>
    {children}
    {(() => {
      switch (type) {
        case 'textarea':
          return (
            <textarea
              rows={rows}
              cols={cols}
              className={innerClassName}
              placeholder={placeholder}
              {...input}
            />
          );
        default :
          return (
            <input
              className={innerClassName}
              type={type}
              placeholder={placeholder}
              {...input}
            />
          );
      }
    })()}
    {
      meta.touched && meta.error &&
        <span className="input_error">{meta.error}</span>
    }
  </div>
);

Input.propTypes = {
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  input: PropTypes.shape({
    value: CustomTypes.Input,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ])),
  ]),
  rows: PropTypes.number,
  cols: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

Input.defaultProps = {
  className: '',
  innerClassName: 'button',
  type: 'text',
  input: {},
  onChange: null,
  placeholder: '',
  children: null,
  rows: 1,
  cols: 1,
  value: '',
  min: 0,
  max: 0,
  step: 1,
  meta: {},
};

export default Input;
