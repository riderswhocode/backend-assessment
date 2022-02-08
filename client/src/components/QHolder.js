import React, { useState } from 'react';
import { useQuery } from '@apollo/client'

import { LoadQuestion } from '../queries/query'
import Question from '../components/Question'

const QHolder = () => {
    const { loading, error, data } = useQuery(LoadQuestion)
    const [activeQuestion, setActiveQuestion] = useState(0)

    if (loading) { return <div>Loading....</div>}
    if (error) { return <div>{error}</div>}
  
    return (
        <Question data={data.questions[0]} />     
     )
    
}

export default QHolder


// { step === 3 && <Question 
//     data={data.questions[activeQuestion]}
//     onAnswerUpdate={setAnswers}
//     numberOfQuestions={data.questions.length}
//     activeQuestion={activeQuestion}
//     onSetActiveQuestion={setActiveQuestion}
//     onSetStep={setStep}
//     />}