import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const InputField = forwardRef((props, ref) => {
  const formProps = { ...props };
  delete formProps.label;
  delete formProps.className;
  delete formProps.error;
  delete formProps.touched;

  return (
    <div
      className={classnames('form__group', props.className, {
        'form__group--error': props.touched && props.error
      })}
    >
      {props.label && <label>{props.label} </label>}

      <input
        type="text"
        ref={ref}
        id={props.id}
        name={props.id}
        className="form__input"
        {...formProps}
      />
      {props.touched && props.error && (
        <p className="form__error">{props.error}</p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

InputField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  touched: PropTypes.bool
};
