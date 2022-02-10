import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { SaveAnswer } from '../queries/query'

const Question = ({ data, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, loggedUser }) => {
    
    const [selected, setSelected] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [isError, setIsError] = useState('')
    const [message, setMessage] = useState('')
    const [hide, setHide] = useState('none')
    const [showScore, setShowScore] = useState('none')
    const [totalScore, setTotalScore] = useState()
 
    const [saveAnswer, {responseData, loading, error}] = useMutation(SaveAnswer)

    let points  
    let totalPoints;
    let question_id
    let user_id 
    let correct

    useEffect(() => {
        // countDown(15)
        question_id = data.id
        user_id = loggedUser
        data.options.map(choice => {
            if (choice.correct) {
                correct = choice.option
            }
        })
        
    })
    
    const changeHandler = (e) => {
        setSelected(e.target.value);
        if (correct === selected) {
            points = 100
            totalPoints = totalPoints + points
        } else {
            points = 0
        }
        console.log(`Total Points: ${totalPoints}`)
        setTotalScore(totalPoints)
      }

    const nextClickHandler = (e) => {
        
        saveAnswer({ variables: {question_id: question_id, user_id: user_id, option: selected, points: points }})
        setHide('none')
        if (error) {
            console.log(error)
        }
        
        if(activeQuestion < numberOfQuestions -1) {
            onSetActiveQuestion(activeQuestion + 1)
        }

        if (activeQuestion === numberOfQuestions - 1) {
            setShowScore('block')
        } else {
            setShowScore('hide')
        }
        console.log(`Total Score: ${totalScore}`)
    }
    
    const submitHandler = (e) => {
        if (correct === selected) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
        setHide('block')
    }

    const doneClickHandler = () => {
        onSetStep(3)
    }

    return (
        <div>
            <div id='myModal' className='modal' style={{display: hide}}>
                <div className='modal-content'>
                    {isCorrect && <p className='correct'>Correct!</p>}
                    {!isCorrect && <p className='wrong'>Wrong!</p>}
                    {!isError && <p className='error'>{message}</p>}
                    <button className="button" onClick={nextClickHandler}>Next Question</button>
                </div>
            </div>

            <div id='myModal' className='modal' style={{display: showScore}}>
                <div className='modal-content'>
                    <h2>Total Score</h2>
                    <h1>{totalScore}</h1>
                    <button className="button" onClick={doneClickHandler}>Done</button>
                </div>
            </div>
        
            <div className='control-holder'>
                <h2>{data.question}</h2>
                <div className='control'>
                    {data.options.map((choice, i) => (
                        <label key={i}>
                            <input type='radio' name="anwer" value={choice.option} onChange={changeHandler}/>
                        {choice.option}
                    </label>
                    ))}
                </div>
                <button className="button" onClick={submitHandler}>Submit</button>
                {/* <p>{timeLeft}</p> */}
            </div>
        </div>
    )
}

export default Question