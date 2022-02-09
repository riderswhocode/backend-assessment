import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import { LoadQuestion } from '../queries/query'
import Question from '../components/Question'

const QHolder = (onSetStep, onCurrentUser ) => {

    const { loading, error, data } = useQuery(LoadQuestion)
    const [activeQuestion, setActiveQuestion] = useState(0)

    console.log("666666666666666666666666666")
    console.log(onCurrentUser)

    if (loading) { return <div>Loading....</div>}
    if (error) { return <div>{error}</div>}
    
    return (
        <Question 
            data={data.questions[activeQuestion]}
            numberOfQuestions={data.questions.length}
            activeQuestion={activeQuestion}
            onSetActiveQuestion={setActiveQuestion}
            onSetStep={onSetStep}
            loggedUser={onCurrentUser} />     
     )
    
}

export default QHolder