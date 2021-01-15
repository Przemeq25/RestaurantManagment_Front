import React from 'react';
import {history} from "../helpers/_helpers";
import {routes} from "../config/routes";
import ErrorPageWrapper from "../components/ErrorPageWrapper";

const Page404 = () =>{
   return(
       <ErrorPageWrapper
           code="404"
           message="Taka strona nie istnieje!"
           action={()=>history.push(routes.HOMEPAGE)}
           actionText="Strona startowa"
       />
    )
}
export default Page404;
