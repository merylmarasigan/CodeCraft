import React from "react";
import '../styling/ProblemDescription.css'

const ProblemDescription = (props) => {
    return (
        <div className='description'>
            <h2>{props.title}</h2>

            <div className='examples'>
                example 1
            </div>
            <div className='examples'>
                example 2
            </div>

        </div>
    );
}
 
export default ProblemDescription;