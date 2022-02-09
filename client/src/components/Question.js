import React, { useState } from 'react'

const Question = ({ data, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) => {
    
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    
    const changeHandler = (e) => {
        setSelected(e.target.value);
        if(error) {
          setError('');
        }
      }

    const nextClickHandler = (e) => {
        if(activeQuestion < numberOfQuestions -1) {
            onSetActiveQuestion(activeQuestion + 1)
        } else {
            onSetStep(4)
        }
    }  

    return (
        <div>
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
        </div>
    )
}

export default Question