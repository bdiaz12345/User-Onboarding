import logo from './logo.svg';
import React,{ useState, useEffect } from 'react';
import { Component } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import './App.css';


const schema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().required('email is required'),
  password: yup.string().required('password is required').min(6, 'at least 6 characters'),
  agree: yup.boolean().oneOf([true], 'you must agree to terms of service')
})
function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '', agree: false })
  const [errors, setErrors] = useState({ name: '', email: '', password: '', agree: '' })
  const [disabled, setDisabled] = useState(true)
  const [post, setPost] = useState([])
  const [users, setUsers] = useState([])


  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setErrors({ ...errors, [name]: ''}))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  const change = event => {
    const { checked, value, name, type } = event.target
    const valueToUse = type === 'checkbox' ? checked : value
    setFormErrors(name, valueToUse)
    setForm({ ...form, [name]: valueToUse })
  }

  const submit = event => {
    event.preventDefault()
    axios
      .post('https://reqres.in/api/users', form)
      .then(res => {
        setUsers([ ...users, res.data ]);
        setPost(res.data);
        console.log('success', res);
      })
      .catch(err => console.log(err.response));
      
  }
  useEffect(() => {
    schema.isValid(form).then(valid => setDisabled(!valid))
  }, [form])
  return (
    <div className="App">
      <div style={{ color: 'red' }}>
        <div>{errors.name}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.agree}</div>
      </div>
      <form onSubmit={submit}>
        <label>Name
          <input onChange={change} value={form.name} name="name" type="text" />
        </label>
        <label>Email
          <input onChange={change} value={form.email} name="email" type="text" />
        </label>
        <label>Password
          <input onChange={change} value={form.password} name="password" type="text" />
        </label>
        <label>Terms of Service
          <input onChange={change} checked={form.agree} name="agree" type="checkbox" />
        </label>
        <button disabled={disabled}>Submit</button>
      </form>
      <pre>{JSON.stringify(post, null)}</pre>
    </div>
  );
}

export default App;
