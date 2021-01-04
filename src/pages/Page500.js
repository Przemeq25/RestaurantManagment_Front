import React from 'react';
import ErrorPageWrapper from "../components/ErrorPageWrapper";

const Page500 = () =>{
    return(
        <ErrorPageWrapper
           code="500"
           message="Błąd serwera! Spróbuj odświeżyć stronę..."
        />
    )
}
export default Page500;
