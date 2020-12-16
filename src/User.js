import React from 'react'
import styled from 'styled-components/macro'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 2rem;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .15);
    border-radius: .375rem;
    background: #E7E7E7;
    width: 20rem;
`

const Name = styled.h1``

const Email = styled.p``

const User = (props) => {
    const { name, email } = props

    return (
        <Wrapper>
            <Name>{name}</Name>
            <Email>{email}</Email>
        </Wrapper>
    )
}

export default User