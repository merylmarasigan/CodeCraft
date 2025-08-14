import React, { useEffect } from "react";
import '../styling/ProblemDescription.css'
import { useState } from "react";
import { supabase } from '../services/supabase';

const ProblemDescription = (props) => {
    
    const [desc, setDescription] = useState(null);

    useEffect(() => {
        const fetchProblemDesc =  async () => {
            const {data, error} = await supabase
            .from('problems')
            .select('*')
            .eq('title', props.title)
            .single();

            if(data){
                console.log(data);
                setDescription(data)
            }

            if(error){
                console.log('ERROR!');
            }
        }

        fetchProblemDesc();

        
    },[])
     
    

    return (
        <div className='description'>
            <h2>{desc?.title || "Loading..."}</h2>
            <p>{desc?.description || 'Loading...'}</p>
            <div className='examples'>

                {desc !== null && <div className='example'>
                    <p className='example-title'>Example 1</p>
                    <p>Input: {desc['example1']['input']}</p>
                    <p>Output: {desc['example1']['output']}</p>
                </div>}
                {desc !== null && <div className='example'>
                    <p className='example-title'>Example 2</p>
                    <p>Input: {desc['example2']['input']}</p>
                    <p>Output: {desc['example2']['output']}</p>
                </div>}
            </div>

            

        </div>
    );
}
 
export default ProblemDescription;