import React, { useState } from 'react';
import './App.css';
import * as yup from "yup";
import axios from "axios";

function Form() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email().required("Must include a valid email address"),
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

  const [allMyData, setAllMyData] = useState({
      createdAt: "",
      email: "",
      id: "",
      name: "",
      password: "",
      terms: false
  })

  const validate = (event) => {
    yup.reach(formSchema, event.target.name)
    .validate(event.target.value)
    .then( valid => {
      setErrors({
        ...errors,
        [event.target.name]: ""
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

  const formSubmit = (event) => {
      event.preventDefault();
      axios.post("https://reqres.in/api/users", formState)
        .then( response => {
            setAllMyData(response.data)
            console.log(allMyData)
        })
        .catch(err => console.log(err))
  };

  const inputChange = (event) => {
    event.persist()
    validate(event);
    let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormState({
      ...formState,
      [event.target.name]: value
    });
  }

  return (
    <div className="Form">
      <form onSubmit={formSubmit}>
        <label htmlFor="name">Name:
          <input 
            id="name"
            name="name"
            type="text" 
            placeholder="Enter Name" 
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        </label>
        <label htmlFor="email">Email:
          <input 
            id="email"
            name="email"
            type="text" 
            placeholder="Enter Email"
            value={formState.email}
            onChange={inputChange}
          />
          {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
        </label>
        <label htmlFor="password">Password:
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="Enter Password"
            value={formState.password}
            onChange={inputChange}
          />
          {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
        </label>
        <label htmlFor="terms">Accept Terms Of Service:
          <input 
            id="terms"
            name="terms"
            type="checkbox"
            checked={formState.terms}
            onChange={inputChange}
          />
        </label>
        <button type="submit" className="Submit">Submit</button>
        </form>
        <div>
          <p>Name: {allMyData.name}</p>
          <p>Email: {allMyData.email}</p>
          <p>Pass: {allMyData.password}</p>
        </div>
    </div>
  );
}

export default Form;