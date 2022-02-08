import React, { useState, useEffect, useRef } from 'react'

import Option from '../components/Options'

const Question = ({ data }) => {
    
    const [selected, setSelected] = useState('');
    console.log(data)
    return (
        
        <div>
            <h2>{data.question}</h2>
            <div className='control'>
                <Option data={data.options} />
                {/* {data.options.map((choice, i) => (
                    <label key={i}>
                        <input type='radio' name="anwer" value={choice} onChange={changeHandler}/>
                        {choice}
                    </label>
                ))} */}
            </div>
        </div>
        
        // <div className="card">
        //     <div className="card-content">
        //         <div className="content">
        //         <h3>Hello</h3>
        //         <h2 className="mb-5">{data.question}</h2>
        //         <div className="control">
        //             {data.options.map((choice, i) => (
        //             <label className="radio has-background-light" key={i}>
        //                 <input type="radio" name="answer" value={choice}  />
        //                 {choice}
        //             </label>
        //             ))}
        //         </div>
        //         <button className="button is-link is-medium is-fullwidth mt-4">Next</button>
        //         </div>
        //     </div>
        //     </div>
    )
}

export default Question