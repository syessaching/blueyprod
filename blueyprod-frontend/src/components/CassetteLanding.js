import React, {useState} from "react";
import './CassetteLanding.css';



function CassetteLanding(){
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isFixed, setIsFixed] = useState(false)

    const handleScroll = (e) => {
        console.log ('Scrolling!', e.deltaY);
       
        const newProgress = Math.max(0, Math.min(scrollProgress + e.deltaY * 0.1, 100));
        setScrollProgress(newProgress);

        if(newProgress >= 100 && !isFixed){
            setIsFixed(true);
        }
    }
    return (
        <div className="cassette-container" onWheel={handleScroll}>
            <h1> Fix the Cassette!</h1>

            <div className="cassette">
                <div className="cassette-body">
                    <div className="reel left-reel" 
                        style={{ transform: `rotate(${scrollProgress * 3.6}deg)`}}
                    />
                    <div className="reel right-reel" 
                        style={{ transform: `rotate(-${scrollProgress * 3.6}deg)`}}
                    />
                    <div 
                        className="tape-tangle"
                        style={{ opacity: 1 - scrollProgress / 100 }}
                    />
                </div>
            </div>

            <p>Progress: {Math.floor(scrollProgress)}%</p>
            {isFixed && <p>✅ Cassette Fixed!</p>}

        </div>
    )

}

export default CassetteLanding;