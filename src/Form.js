import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 60%;
    border-radius: .375rem;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .15);
`

const Title = styled.h1``

const Section = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SectionTitle = styled.h2``

const Input = styled.input``

const CheckBox = styled.input``

const SubmitButton = styled.button`
    margin: 2rem 0;
`

const Form = (props) => {
    const { formValues, change, submit, disabled } = props

    return (
        <Wrapper>
            <Title>User Onboarding</Title>
            <form onSubmit={submit}>
                <Section>
                    <SectionTitle>Name</SectionTitle>
                    <Input type='text' name='name' value={formValues.name} onChange={change} />
                </Section>
                <Section>
                    <SectionTitle>Email</SectionTitle>
                    <Input type='email' name='email' value={formValues.email} onChange={change} />
                </Section>
                <Section>
                    <SectionTitle>Password</SectionTitle>
                    <Input type='text' name='password' value={formValues.password} onChange={change} />
                </Section>
                <Section>
                    <SectionTitle>Terms of Agreement</SectionTitle>
                    <CheckBox type='checkbox' name='terms' value={formValues.terms} />
                </Section>
                <Section>
                    <SubmitButton disabled={disabled}>Submit</SubmitButton>
                </Section>
            </form>
        </Wrapper>
    )
}

export default Form