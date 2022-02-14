import { useMutation } from '@apollo/client'
import { useEffect, useState, useRef } from 'react'

import { SaveAnswer } from '../queries/query'

const Question = ({ data, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, loggedUser, acumPoints, onSetAcumPoints }) => {
    
    const intervalRef = useRef(null)
    const [timer, setTimer] = useState('00:00:00')

    const [selected, setSelected] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [isError, setIsError] = useState('')
    const [message, setMessage] = useState('')
    const [hide, setHide] = useState('none')
    const [showScore, setShowScore] = useState('none')
    
    // const [points, setPoints] = useState()

    const [saveAnswer, {responseData, loading, error}] = useMutation(SaveAnswer)

    let points
    let question_id
    let user_id 
    let correct

    // interface Choices {
    //     id: string
    //     option: string
    //     correct: boolean
    // }

    useEffect(() => {
        question_id = data.id
        user_id = loggedUser
        data.options.map((choice) => {
            if (choice.correct) {
                correct = choice.option
            }
        })

        // Timer Related
        // clearTimer(getDeadlineTime())
        // return () => { if(intervalRef.current) clearInterval(intervalRef.current) }
        
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


    // COPY PASTED TIMER RELATED CODE
    // function getTimeRemaining(endtime: any) {
    //     const total = Date.parse(endtime) - Date.parse(new Date())
    //     const seconds = Math.floor( (total/1000) % 60)
    //     const minutes = Math.floor( (total/1000/60) % 60)
    //     const hours = Math.floor( (total/1000*60*60) % 24)
    //     const days = Math.floor( total/(1000*60*60*24));
    //     return { total, days, hours, minutes, seconds }
    // }

    // function startTimer(deadline: any) {
    //     let {total, days, hours, minutes, seconds} = getTimeRemaining(deadline)
    //     if(total >= 0) {
    //         setTimer(
    //             (hours > 9 ? hours : '0'+hours) + ':' + 
    //             (minutes > 9 ? minutes : '0'+minutes) + ':' +
    //             (seconds > 9 ? seconds : '0'+seconds)
                
    //         )} else {
    //             clearInterval(intervalRef.current)
    //         }
    // }

    // function clearTimer(endtime: any) {
    //     setTimer('00:00:10');
    //     if(intervalRef.current) clearInterval(intervalRef.current)
    //     const id = setInterval(() => {
    //         startTimer(endtime)
    //     }, 1000)
    //     intervalRef.current = id
    // }

    // function getDeadlineTime(){
    //     let deadline = new Date();
    //     deadline.setSeconds(deadline.getSeconds()+10)
    //     return deadline
    // }
    //END OF COPY PASTED TIMER RELATED CODE

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