import react from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

const Shoes = () => {
    const [shoes, setShoes] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/all/`);
                setShoes(res.data);
                console.table(shoes)
            } catch (err) {
                console.log(err);
            }
        };

        fetchData(); // Invoke the fetchData function

        // Cleanup function
        return () => {
            // Any cleanup code here (if needed)
        };
    }, []);

    return(
        <div className='m-0 p-0'>
            
        </div>
    )
}


export default Shoes;