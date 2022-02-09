import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

import { SaveAnswer } from '../queries/query'

const Question = ({ data, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, loggedUser }) => {
    
    const [selected, setSelected] = useState('')
    // const [correct, setCorrect] = useState('')
    const [msg, setMsg] = useState('')
    const [timeLeft, setTimeLeft] = useState()

    const [saveAnswer, {response, loading, error}] = useMutation(SaveAnswer)

    let points;
    let question_id;
    let user_id;
    let correct;
    
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
    
    let countDown = (timer) => {
        if (timer > 0) {
            setInterval(() => {
                timer--
                console.log(timer)
            }, 1000)   
        }
        return clearInterval(countDown)
    }

    const changeHandler = (e) => {
        setSelected(e.target.value);
      }

    const nextClickHandler = (e) => {
        if (correct === selected) {
            console.log("YOU GET 100 points!")
            points = 100
        } else {
            console.log("Better luck next time")
            points = 0
        }
        debugger
        saveAnswer({ variables: {question_id: question_id, user_id: user_id, option: selected, points: points }})
        
        if (error) {
            console.log(error)
        }
        if (response){
            if(activeQuestion < numberOfQuestions -1) {
                onSetActiveQuestion(activeQuestion + 1)
            } else {
                onSetStep(3)
            }
        }
        
    }  

    return (
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
            <button className="button" onClick={nextClickHandler}>Submit</button>
            <p>{timeLeft}</p>
        </div>
    )
}

export default Question