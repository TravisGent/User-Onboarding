import React, { useState } from 'react';
import './App.css';
import * as yup from "yup";

function Form() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email().required("Must have a valid email address"),
    password: yup.string().required("Password is a required field"),
    terms: yup.boolean().oneOf([true], "You must agree to terms of use")
  });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  const validate = (event) => {
    yup.reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then( valid => {
      setErrors({
        ...errors,
        [e.target.name]: ""
      })
    })
    .catch( err => {
      console.log(err.errors);
      setErrors({
        ...errors,
        [event.target.name]: err.errors[0]
      })
    })
  };

  const inputChange = (event) => {
    validate(event);
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  }
  console.log(formState);
  return (
    <div className="Form">
      <form>
        <label htmlFor="name">Name:</label>
          <input 
            id="name"
            name="name"
            type="text" 
            placeholder="Enter Name" 
            value={formState.name}
            onChange={inputChange}
          />
        <label htmlFor="email">Email:</label>
          <input 
            id="email"
            name="email"
            type="text" 
            placeholder="Enter Email"
            value={formState.email}
            onChange={inputChange}
          />
        <label htmlFor="password">Password:</label>
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="Enter Password"
            value={formState.password}
            onChange={inputChange}
          />
        <label htmlFor="terms">Accept Terms Of Service:</label>
          <input 
            id="terms"
            name="terms"
            type="checkbox"
            checked={formState.terms}
            onChange={inputChange}
          />
        <button type="submit" className="Submit">Submit</button>
        </form>
    </div>
  );
}

export default Form;