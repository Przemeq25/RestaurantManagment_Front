import React, {useEffect, useState} from 'react';
import {routes} from "../../config/routes";
import {Redirect} from 'react-router-dom';
import * as PropTypes from "prop-types";


const DelayedRedirect = ({path,from,delay})=>{
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        const redirectTimer =  setTimeout(()=>{
            setRedirect(true);
        },delay)
        return ()=>clearTimeout(redirectTimer);
    },[delay]);

    return(
        <>
            {
                redirect ? (
                    <Redirect
                        to={{
                            pathname: path,
                            from: from
                        }}
                    />
                ) : null
            }
        </>
    )
}
export default DelayedRedirect;

DelayedRedirect.defaultProps ={
    path: routes.LOGIN,
    from:'/',
    delay:300,
}
DelayedRedirect.propTypes = {
    path: PropTypes.string,
    from: PropTypes.string,
    delay: PropTypes.number,
}
