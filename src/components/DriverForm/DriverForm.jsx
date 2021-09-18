import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './DriverForm.css';

import { DriversContext } from './../../contexts/DriversContext';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().positive().integer().required(),
  email: yup.string().email(),
});

let defaultValues = {
  _id: '',
  firstName: '',
  lastName: '',
  age: '',
  email: '',
};

export default function DriverForm({ driver }) {
  let history = useHistory();
  const { addDriver, updateDriver } = useContext(DriversContext);

  let submitHandler = () => {};

  if (driver) {
    submitHandler = (vals, e) => {
      console.log('update vals', vals);
      updateDriver(driver._id, vals);
      history.push('/'); // don't need to reset form because unmounting...
    };
    // Do something
  } else {
    submitHandler = (vals, e) => {
      console.log('add vals', vals);
      reset(defaultValues);
      addDriver(vals);
    };
  }

  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: driver || defaultValues,
  });

  const { isDirty, isValid, isSubmitting, errors } = formState;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="form-row">
        <label htmlFor="firstName" className="field-name">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          firstName="firstName"
          {...register('firstName')}
          aria-invalid={errors.firstName ? 'true' : 'false'}
        />
        {errors.name && (
          <label htmlFor="firstName" role="alert" className="error">
            {errors.firstName?.message}
          </label>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="lastName" className="field-name">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          {...register('lastName')}
          aria-invalid={errors.lastName ? 'true' : 'false'}
        />
        {errors.lastName && (
          <label htmlFor="lastName" role="alert" className="error">
            {errors.lastName?.message}
          </label>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="age" className="field-name">
          Age
        </label>
        <input
          id="age"
          type="text"
          name="age"
          {...register('age')}
          aria-invalid={errors.age ? 'true' : 'false'}
        />
        {errors.age && (
          <label htmlFor="age" role="alert" className="error">
            {errors.age?.message}
          </label>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="email" className="field-name">
          Email
        </label>
        <input
          id="email"
          type="text"
          name="email"
          ref={register}
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <label htmlFor="email" role="alert" className="error">
            {errors.email?.message}
          </label>
        )}
      </div>
      <div className="form-row controls">
        {/* <p>{`${!isValid && isDirty}`}</p>
        <p>Valid: {`${isValid}`}</p>
        <p>Dirty: {`${isDirty}`}</p>
        <p>Submitting: {`${isSubmitting}`}</p> */}
        <button type="reset" onClick={reset}>
          Reset
        </button>
        <button type="submit" disabled={isSubmitting || !isValid || !isDirty}>
          Submit
        </button>
      </div>
    </form>
  );
}
