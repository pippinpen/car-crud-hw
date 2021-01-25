import React, { useContext } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./CarForm.css";

import { CarsContext } from "./../../contexts/CarsContext";

const schema = yup.object().shape({
  name: yup.string().required(),
  bhp: yup.number().positive().integer().required(),
  avatar_url: yup.string().url(),
});

export default function CarForm() {
  const { addCar, updateCar, cars } = useContext(CarsContext);
  let { id } = useParams();
  let history = useHistory();

  if (id && !cars.length) {
    history.push("/");
  }

  let defaultValues = {
    _id: '',
    name: '',
    bhp: '',
    avatar_url: ''
  };
  let submitHandler = () => {};

  if(id){
    submitHandler = updateCar;
    const carToBeUpdated = cars.find(({_id}) => _id === id);
    if(!carToBeUpdated) {
      throw new Error(`Could not find car with id: ${id} to be updated`)
    } else {
      defaultValues = carToBeUpdated;
    }
  } else {
    submitHandler = addCar;
  }

  const { register, handleSubmit, errors, reset, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const { isDirty, isValid, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="form-row">
        <label htmlFor="name" className="field-name">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          ref={register}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (<label htmlFor="name" role="alert" className="error">
          {errors.name?.message}
        </label>)}
      </div>
      <div className="form-row">
        <label htmlFor="bhp" className="field-name">
          <abbr title="break horse power">B.H.P.</abbr>
        </label>
        <input
          id="bhp"
          type="text"
          name="bhp"
          ref={register}
          aria-invalid={errors.bhp ? "true" : "false"}
        />
        {errors.bhp && (<label htmlFor="bhp" role="alert" className="error">
          {errors.bhp?.message}
        </label>)}
      </div>
      <div className="form-row">
        <label htmlFor="avatar_url" className="field-name">
          Avatar URL
        </label>
        <input
          id="avatar_url"
          type="text"
          name="avatar_url"
          ref={register}
          aria-invalid={errors.avatar_url ? "true" : "false"}
        />
        {errors.avatar_url && (<label htmlFor="avatar_url" role="alert" className="error">
          {errors.avatar_url?.message}
        </label>)}
      </div>
      <div className="form-row controls">
      {/* <p>{`${!isValid && isDirty}`}</p>
      <p>Valid: {`${isValid}`}</p>
      <p>Dirty: {`${isDirty}`}</p>
      <p>Submitting: {`${isSubmitting}`}</p> */}
      {/* <p>{JSON.stringify(errors)}</p> */}
        <button type="reset" onClick={reset}>
          Reset
        </button>
        <button type="submit" disabled={isSubmitting || !(isValid && isDirty)}>Submit</button>
      </div>
    </form>
  );
}
