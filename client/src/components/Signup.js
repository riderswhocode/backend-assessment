import React, { useState } from 'react'
import { useMutation } from '@apollo/client';

import { newUser } from '../queries/query'

const Signup = ({onQuizStart, onUserId}) => {

    const [email, setEmail] = useState('')
    // const [userId, setUserId] = useState('1')
    const [qError, setQError] = useState('')

    let userId;

    const [saveNewUser, { data, loading, error }] = useMutation(newUser)
    // , 
    if (loading) {
        console.log(`loading`)
    }

    if (error) {
        setQError(error)
        console.log(qError) 
    }
    if (data) {
        userId = data.addUser.id
        onUserId(userId)
    }
  
    const startQuiz = () => {
        onQuizStart(2)
    }

    return (
        <div className="Signup">
            {!userId && <h1 className='main-heading'>Sign up</h1>}
            {userId && <h1 className='main-heading'>Welcome</h1>}
            <form id='new-user' onSubmit={e => {
                e.preventDefault()
                saveNewUser({
                    variables: {email: email} })
            }}>
                {qError && <div className="has-text-danger">{qError}</div>}
                {!userId && <div className="field">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email Address'/>
                </div> }
                {!userId && <button className="btn signup-btn">Submit</button> }
                {userId && <button className="btn signup-btn" onClick={startQuiz}>Start</button> }
            </form>
            
        </div>
    )
}

export default Signup