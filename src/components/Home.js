import '../styling/Home.css'
import '../styling/layout.css'

import { supabase } from '../services/supabase';
import { useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [mainTopics, setMainTopics] = useState(null);

    useEffect(() => {
        const fetchMainTopics = async () => {
            const {data, error} = await supabase.from('concepts').select('*');

            if(error){
                setFetchError('Could not fetch data');
                setMainTopics(null);
                console.log(error)
            }

            if(data){
                const hasPrereqs = data.filter((concept)=> {return concept['prereqs'] !== null})
                setMainTopics(hasPrereqs);
                console.log(data);
                setFetchError(null);
            }

        }
        fetchMainTopics();
    } , [])
    return ( 
        <div className='practice main-section'>
            <h1>Practice</h1>
            <h2>DSA Topics</h2>
            
            {/* Display error if there is one */}
            {fetchError && <p className="error">{fetchError}</p>}
            
            {/* Display topics if data exists */}
            {mainTopics && (
                <div className="topics-container">
                    {mainTopics.map((topic) => (
                        <div key={topic.concept_id} className="topic box">
                            <Link to={`/topic/${topic.name}/${topic.concept_id}`} 
                            style={{ textDecoration: 'none', color: 'white'}}
                            >{topic.name}</Link>
                            {/* Add other topic properties as needed */}
                        </div>
                    ))}
                </div>
            )}
            
            {/* Display loading state */}
            {!mainTopics && !fetchError && <p>Loading topics...</p>}
        </div>
    );
}
 
export default Home;