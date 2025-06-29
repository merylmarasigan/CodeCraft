import '../styling/Home.css'
import '../styling/layout.css'
import { supabase } from '../services/supabase';
import { useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'

const Learn = () => {
    const {title} = useParams();
    return(
        <div>
            <h1>{title}</h1>
        </div>
    );
    // const [fetchError, setFetchEror] = useState(null);
    // const [mainTopics, setMainTopics] = useState(null);

    // useEffect(() => {
    //     const fetchMainTopics = async () => {
    //         const {data, error} = await supabase.from('topics').select().eq('main_topic', true);

    //         if(error){
    //             setFetchEror('Could not fetch data');
    //             setMainTopics(null);
    //             console.log(error)
    //         }

    //         if(data){
    //             setMainTopics(data);
    //             setFetchEror(null);
    //         }

    //     }
    //     fetchMainTopics();
    // } , [])
    // return ( 
    //     <div className='learn main-section'>
    //         <h1>Learn</h1>
    //         <h2>DSA Topics</h2>
            
    //         {/* Display error if there is one */}
    //         {fetchError && <p className="error">{fetchError}</p>}
            
    //         {/* Display topics if data exists */}
    //         {mainTopics && (
    //             <div className="topics-container">
    //                 {mainTopics.map((topic) => (
    //                     <div key={topic.id} className="topic-item">
    //                         <Link to={`/topic/${topic.name}/${topic.id}`}>{topic.name}</Link>
    //                         {/* Add other topic properties as needed */}
    //                     </div>
    //                 ))}
    //             </div>
    //         )}
            
    //         {/* Display loading state */}
    //         {!mainTopics && !fetchError && <p>Loading topics...</p>}
    //     </div>
    // );
}
 
export default Learn;