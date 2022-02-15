import { useMutation } from '@apollo/client'
import { useEffect, useState, useRef } from 'react'

import { SaveAnswer, SaveAnswerV2 } from '../queries/query'

const Question = ({ data, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, loggedUser, acumPoints, onSetAcumPoints }) => {

    const [timer, setTimer] = useState('00:00:00')

    const [selected, setSelected] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [isError, setIsError] = useState('')
    const [message, setMessage] = useState('')
    const [hide, setHide] = useState('none')
    const [showScore, setShowScore] = useState('none')
    
    // const [points, setPoints] = useState()

    let points
    let question_id
    let user_id 
    let correct

    const [saveAnswer, {responseData, loading, error}] = useMutation(SaveAnswerV2)

    useEffect(() => {
        question_id = data._id
        user_id = loggedUser
        data.options.map((choice) => {
            if (choice.correct) {
                correct = choice.option
            }
        })        
    })
    
    const changeHandler = (e) => {
        setSelected(e.target.value);
        if (correct === e.target.value) {
            points = 100
            onSetAcumPoints(acumPoints + points)
        } else {
            points = 0
        }  
      }

    const nextClickHandler = (e) => {
        saveAnswer({ variables: { option: selected, points: points, question_id: question_id, user_id: user_id }})
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
        setSelected('')
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
        onSetStep(1)
    }

    return (
        <div>
            <div id='myModal' className='modal' style={{display: hide}}>
                <div className='modal-content'>
                    {isCorrect && <div><p className='correct'>Correct!</p> <p>You get 100 points</p></div>}
                    {!isCorrect && <div><p className='wrong'>Wrong!</p> <p>You get 0 point</p></div>}
                    {!isError && <p className='error'>{message}</p>}
                    <button className="button" onClick={nextClickHandler}>Next Question</button>
                </div>
            </div>

            <div id='myModal' className='modal' style={{display: showScore}}>
                <div className='modal-content'>
                    <h2>Total Score</h2>
                    <h1>{acumPoints}</h1>
                    <button className="button" onClick={doneClickHandler}>Done</button>
                </div>
            </div>
        
            <div className='control-holder'>
                <h2>{data.question}</h2>
                <div className='control'>
                    {data.options.map((choice, i) => (
                        <label key={i} className="control-key">
                            <input type='radio' name="anwer" value={choice.option} onChange={changeHandler}/>
                        {choice.option}
                    </label>
                    ))}
                </div>
                <p>{timer}</p>
                <button className="btn button" onClick={submitHandler}>Submit</button>
            </div>
        </div>
    )
}

export default Question