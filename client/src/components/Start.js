import React from 'react'

const Start = ({onQuizStart}) => {
    
    const startQuiz = () => {
        onQuizStart(3)
    }

    return (
        <div className='card'>
            <div className='card-content'>
                <div className='content'>
                    <h1>Enter</h1>
                    <button className="button is-info is-medium" onClick={startQuiz}>Start</button>
                </div>
            </div>
        </div>
    )
}

export default Start