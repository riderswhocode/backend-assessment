import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';

import { newUser, newUserV2 } from '../queries/query'

const Signup = ({onQuizStart, onUserId, onClient}) => {

    const [email, setEmail] = useState('')
    const [qError, setQError] = useState('')
    const [userId, setUserId] = useState()

    let Id;

    const [saveNewUser, { data, loading, error }] = useMutation(newUserV2)
    
    const submitData = () => {
        onClient
        .query({
            query: gql`
                query BrowseUser {
                    user(email: "${email}") {
                        id
                        email
                    }
                }
            `
        })
        .then(result => {
            if (result.data.user) {
                setUserId(result.data.user.id)
            }

            if(!result.data.user) {
                console.log("cannot find email..")
                saveNewUser({
                    variables: {email: email} })
            }
        })
    }
 
    if (loading) {
        console.log(`loading`)
    }

    if (error) {
        setQError(error)
        console.log(qError) 
    }

    if (data) {
        console.log(data)
        // userId = data.addUser.id
        // setUserId(data.addUser.id)
        Id = data.addUser._id
        onUserId(Id)
    }
  
    const startQuiz = () => {
        onQuizStart(2)
    }

    return (
        <div className="Signup">
            {!Id && <h1 className='main-heading'>Sign up</h1>}
            {Id && <h1 className='main-heading'>Welcome</h1>}
            <form id='new-user' onSubmit={e => {
                e.preventDefault()
                saveNewUser({
                    variables: {email: email} })
            }}>
                {qError && <div className="has-text-danger">{qError}</div>}
                {!Id && <div className="field">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email Address'/>
                </div> }
                {!Id && <button className="btn signup-btn">Submit</button> }
                {Id && <button className="btn signup-btn" onClick={startQuiz}>Start</button> }
            </form>
            {/* <button onClick={() => submitData()}>TEST USER</button> */}
        </div>
    )
}

export default Signup