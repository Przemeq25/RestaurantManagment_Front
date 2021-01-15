import React, {useEffect, useState} from 'react';

const Delayed = ({children, delay= 100})=>{
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsShown(true);
        }, delay);
    }, [delay]);

    return isShown ? children : null;
}
export default Delayed;
