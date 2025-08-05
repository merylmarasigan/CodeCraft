import React from "react";
import '../styling/ProblemDescription.css'

const ProblemDescription = (props) => {


    const descriptions = {
        'Contains Duplicate': 'Given an integer array, nums, return true if any value appears more than once in the aray, otherwise return false'
    }

    const inputs = {
        'Contains Duplicate': [`Input: nums = [1,2,3,3]`,
            `Input: nums = [1,2,3,4]`]
    }
    const outputs = {
        'Contains Duplicate': [`Output: true`, 'Output:false']
    }
    return (
        <div className='description'>
            <h2>{props.title}</h2>
            <div className='examples'>

                <div className='example'>
                    <p className='example-title'>Example 1</p>
                    <p>{inputs[props.title][0]}</p>
                    <p>{outputs[props.title][0]}</p>
                </div>
                <div className='example'>
                    <p className='example-title'>Example 2</p>
                    <p>{inputs[props.title][1]}</p>
                    <p>{outputs[props.title][1]}</p>
                </div>
            </div>

            

        </div>
    );
}
 
export default ProblemDescription;