import React, { useState } from 'react'
import { useMutation } from '@apollo/client';

import { newUser } from '../queries/query'

const Signup = ({onSignup}) => {

    const [email, setEmail] = useState('')
    const [userId, setUserId] = useState('')
    const [qError, setQError] = useState('')

    const [saveNewUser, {createdUser, loading, error}] = useMutation(newUser)
    if (error) {
        setQError(error)
        console.log(qError) 
    }
    if (createdUser) {
        setUserId(createdUser.id)
    }
    
    return (
        <div className="Signup">
            <h1 className='main-heading'>Sign up</h1>
            <form id='new-user' onSubmit={e => {
                e.preventDefault()
                saveNewUser({
                    variables: {email: email}
                })
               
            }}>
                {qError && <div className="has-text-danger">{qError}</div>}
                <div className="field">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email Address'/>
                </div>
                <button className="btn signup-btn">Submit</button>
            </form>
        </div>
    )
}

export default Signup