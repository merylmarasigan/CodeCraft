import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import '../styling/Topic.css'
import {Link} from 'react-router-dom'



const Topic = () => {
    const {title, id} = useParams();
    const [prereqs, setPreReqs] = useState(null);
    const [fetchError, setFetchError] = useState(null)

    const problems=[
        {name: 'Contains Duplicate', Difficulty:'Easy', Status: 'Incomplete'},
        {name: 'Valid Anagram', Difficulty:'Easy', Status: 'Incomplete'}
    ]

    useEffect(() =>{
        
        const fetchPrereqs = async () => {
            // Convert string ID to integer
            const topicId = parseInt(id);
            
            const {data, error} = await supabase
            .from('prereqs')
            .select('topics!prereqs_prereq_id_fkey(name)')  
            .eq('topic_id', parseInt(id));
            
    
            if(error){
                setFetchError('Could not fetch data')
                setPreReqs(null);
                return;
            }
    
            if(data){
                setPreReqs(data)
                setFetchError(null)
            }
        }
        
        fetchPrereqs();
    },[id])

    return ( 
        <div className='topics'>
            <h1>{title}</h1>
             {/* This should show "Prereqs found" */}
            {prereqs && prereqs.length > 0 && (
                <div className='prereq'>
                    <h3>Prerequisites</h3>
                    {/* <Link to={`/topic/${topic.name}/${topic.id}`}>{topic.name}</Link> */}

                    <div className='prereq-topics'>
                        {prereqs.map((pr,index) => {
                                // return <a  key={index}>{pr.topics.name}</a>
                               return <Link to={`/learn/${pr.topics.name}`}
                               className='box'
                               style={{ textDecoration: 'none' }}
                               >{pr.topics.name}</Link>
                            })}
                    </div>
                       
                </div>
            )}

            

            <div className='problems'>
                <table>
                    <tr>
                        <th>Status</th>
                        <th>Problem</th>
                        <th>Difficulty</th>
                    </tr>
                    {problems.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.Status}</td>
                                <td>
                                <Link to={`/practice/${val.name}`}
                               style={{ textDecoration: 'none', color: 'white' }}
                               >{val.name}</Link>
                                </td>
                                <td>{val.Difficulty}</td>
                            </tr>
                        )
                    })}
                </table>

            </div>

        </div>
    );
}
 
export default Topic;