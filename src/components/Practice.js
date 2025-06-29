import '../styling/Home.css'
import '../styling/layout.css'
import '../styling/Practice.css'

import { supabase } from '../services/supabase';
import { useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';

const Practice = () => {
    const {title} = useParams();
    return(
        <div className='coding-problem'>
            <h1>{title}</h1>
        </div>
    )
}

 
export default Practice;