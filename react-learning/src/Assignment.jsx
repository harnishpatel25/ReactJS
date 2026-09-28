import { useState, useEffect } from 'react'
import './App.css'

function Assignment() {

    const [like, setLikeCount] = useState(0);

    useEffect(() => {
        console.log("Assignment rendered");
    });


    const handleLikeIncrement = () => {
        setLikeCount(like + 1);
    }
    return(
        <div>
            <h1>{like}</h1>
            <button onClick={handleLikeIncrement}>Like increment</button>
        </div>
    );
}

export default Assignment;