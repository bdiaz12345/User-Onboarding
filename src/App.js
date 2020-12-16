import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import axios from 'axios'
import Form from './Form'
import Schema from './Schema'
import styled from 'styled-components/macro'
import User from './User'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;

`

const defaultValues = {
  name: '',
  email: '',
  password: ''
}

const defaultErrors = {
  name: '',
  email: '',
  password: '',
  terms: ''
}

const App = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  const [savedInfo, setSavedInfo] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState(defaultErrors)
  const [post, setPost] = useState([])
  const change = (event) => {
    const { name, value } = event.target
    validate(name, value)
    setFormValues({ ...formValues, [name]: event.target.value === 'checkbox' ? event.target.checked : event.target.value })
  }

  const submit = (event) => {
    event.preventDefault()
    axios
      .post('https://reqres.in/api/users', formValues)
      .then(res => {
        console.log(res.data)
        setPost(res.data)
      })
      .catch(err => {console.log(err)})
      const newData = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password.trimEnd()
      }
    
      setSavedInfo([...savedInfo, newData])
      setFormValues(defaultValues)
  }
  
  const validate = (name, value) => {
    yup
      .reach(Schema, name)
      .validate(value)
      .then((valid) => {
        setErrors({ ...errors, [name]: '' })
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] })
      })
  }

  useEffect(() => {
    Schema.isValid(formValues).then((valid) => {
      setDisabled(!valid)
    })
  }, [formValues])

  return (
    <Wrapper>
      <Form 
      formValues={formValues}
      change={change}
      submit={submit}
      disabled={disabled}
      />
      <UserWrapper>
        {savedInfo.map((user) => {
          return (<User name={user.name} email={user.email} />)
        })}
      </UserWrapper>
    </Wrapper>
  )





}

export default App;
