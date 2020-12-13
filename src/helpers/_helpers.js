import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createBrowserHistory } from 'history';
import moment from 'moment';

export const history = createBrowserHistory();

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery('(min-width:960px)')
    return isDesktop ? children : null
}
export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery('(max-width:960px)')
    return isMobile ? children : null
}

export const cuisineType = [
    { key: 'STREET_FOOD', label: "Street food"},
    { key: 'SUSHI', label: "Sushi"},
    { key: 'PIZZA', label: "Pizza"},
    { key: 'BURGER', label: "Fast food"},
    { key: 'PASTA', label: "Makarony"},
    { key: 'KEBAB', label: "Kebab"},
    { key: 'VEGE', label: "Wegetariańska"},
    { key: 'FIT', label: "Fit"},
    { key: 'FISH', label: "Ryby"},
    { key: 'SEAFOOD', label: "Owoce morza"},
    { key: 'THAI_CUISINE', label: "Kuchnia tajska"},
    { key: 'TURKISH_CUISINE', label: "Kuchnia turecka"},
    { key: 'POLISH_CUISINE', label: "Kuchnia polska"},
    { key: 'MAXICAN_CUISINE', label: "Kuchnia meksykańska"},
    { key: 'VIETNAMSE_CUISINE', label: "Kuchnia wietnamska"}
];
export const getCuisineTypeValue=(categories)=>{
    return  categories.map(category => cuisineType.find(cuisine=> category === cuisine.key))
};
export const toLocalTime = (time)=>{
    return moment(time,'HH:mm').format("HH:mm");
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
export const worksTimeDaysTranslate = (day) =>{
    switch(day){
        case "MONDAY":
            return 'Poniedziałek';
        case "TUESDAY":
            return 'Wtorek';
        case "WEDNESDAY":
            return 'Środa';
        case "THURSDAY":
            return 'Czwartek';
        case "FRIDAY":
            return 'Piątek';
        case "SATURDAY":
            return 'Sobota';
        case "SUNDAY":
            return 'Niedziela';
        default:
            return ""

    }
}
export const restaurantInitialValues = {
    name: '',
    category: [],
    description:'',
    nip:'',
    regon:'',
    image:'',
    street:'',
    city:'',
    postCode:'',
    phoneNumber:'',
    houseNumber:'',
    worksTime:[
        {
            day:'MONDAY',
            from:'07:00',
            to:'20:00',
        },
        {
            day:'TUESDAY',
            from:'07:00',
            to:'20:00',
        },
        {
            day:'WEDNESDAY',
            from:'07:00',
            to:'20:00',
        },
        {
            day:'THURSDAY',
            from:'07:00',
            to:'20:00',
        },
        {
            day:'FRIDAY',
            from:'07:00',
            to:'20:00',
        },
        {
            day:'SATURDAY',
            from:'07:00',
            to:'20:00',
        },
        {
            day:'SUNDAY',
            from:'07:00',
            to:'20:00',
        },
    ]
};
export const menuInitialValues = {
    image:'',
    name:'',
    price:'',
    ingredients:'',
    timeToDo:'',
}

export const scaleImageByUrl = (url) =>{
    const newSecureUrl = url.split('/');
    newSecureUrl[6] = "h_200,c_scale";
    return newSecureUrl.join('/');
}
export const isValidUrl = (url) =>{
    let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let regex = new RegExp(expression);
    if (!url){
        return false;
    }else if (url.match(regex)){
        return true;
    }else{
        return false;
    }
}


