import logo from "../images/logo2.png";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export default logo;

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery('(min-width:960px)')
    return isDesktop ? children : null
}
export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery('(max-width:960px)')
    return isMobile ? children : null
}

export const cuisineType = {
    STREET_FOOD: "Street food",
    SUSHI: "Sushi",
    PIZZA: "Pizza",
    BURGER: "Fast food",
    PASTA: "Makarony",
    KEBAB: "Kebab",
    VEGE: "Wegetariańska",
    FIT: "Fit",
    FISH: "Ryby",
    SEAFOOD: "Owoce morza",
    THAI_CUISINE: "Kuchnia tajska",
    TURKISH_CUISINE: "Kuchnia turecka",
    POLISH_CUISINE: "Kuchnia polska",
    MAXICAN_CUISINE: "Kuchnia meksykańska",
    VIETNAMSE_CUISINE: "Kuchnia wietnamska",
    cusineTypeOptions:["Street food","Sushi","Pizza","Fast food","Makarony","Kebab","Wegetariańska","Fit","Ryby","Owoce morza","Kuchnia tajska","Kuchnia turecka","Kuchnia polska","Kuchnia meksykańska","Kuchnia wietnamska"],

}
export const getCuisineTypeKey=(value)=>{
    return value.map(item => Object.keys(cuisineType).find(key=>cuisineType[key] === item))
}

export const getAdminType = (types, restaurantId) => {
    const typeFound = types.find(item => item.id === restaurantId);

    switch(typeFound && typeFound.role){
        case "OWNER" :
            return "Właściciel";
        case "WORKER" :
            return "Pracownik";
        default :
            return null
    }
}


