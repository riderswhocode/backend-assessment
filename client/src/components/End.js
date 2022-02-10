import { useState } from 'react'

import { LoadQuestion } from '../queries/query'

const Start = ({onCurUserId}) => {
    
    const [email, setEmail] = useState('')
    const [totalScore, setTotalScore] = useState()

    return (
        <div className='card'>
            <div className='card-content'>
                <div className='content'>
                    <h3>{email}</h3>
                    <h2>Total Score</h2>
                    <h1>{totalScore}</h1>
                </div>
            </div>
        </div>
    )
}

export default Start