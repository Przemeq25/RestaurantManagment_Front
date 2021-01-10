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
    category:'',
}
export const personalDataInitialValues = {
    forename: "",
    surname: "",
    street: "",
    city: "",
    postCode: "",
    phoneNumber: "",
    houseNumber: "",
};

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
export const renderBastekProducts = (basket) =>{
    const result = [];

    basket.forEach(function (a) {
        if (!this[a.restaurantId]) {
            this[a.restaurantId] = { restaurantId: a.restaurantId, restaurantName: a.restaurantName,  products: [] };
            result.push(this[a.restaurantId]);
        }
        this[a.restaurantId].products.push(a);
    }, Object.create(null));
    return result;
}
export const searchWriteName = (value,setQuery,query,pushToHistory)=>{
    if(value.length){
        setQuery({...query, name:value})
        pushToHistory({...query, name:value})
    }else if(query.name){
        const newQuery = {...query};
        delete newQuery.name;
        setQuery(newQuery);
        pushToHistory(newQuery)
    }
}
export const countMinTimeToPrepare = (basket) =>{
    if(basket.length){
        return Math.max.apply(Math, basket.map((product)=> product.timeToDo))
    }else{
        return "-";
    }
}
export const handleRenderMenuByCategory = (meals) => meals.reduce(
    (acc, current)=> ({
        ...acc,
        [current['category']] :[
            ...(acc[current['category']] || []),current]
    })
    ,{}
);
export const orderType={
    TAKE_AWAY:"TAKE_AWAY",
    IN_LOCAL:"IN_LOCAL",
    DELIVERY:"DELIVERY",
}
export const paymentType={
    ONLINE:"ONLINE",
    CASH:"CASH",
}
export const orderStatus={
    IN_PROGRESS:"IN_PROGRESS",
    IN_DELIVERY:"IN_DELIVERY",
    DONE:"DONE",
}
export const orderTypeTranslate = (order) => {
    switch(order) {
        case orderType.TAKE_AWAY:
            return 'Na wynos';
        case orderType.IN_LOCAL:
            return 'W lokalu';
        case orderType.DELIVERY:
            return 'Dostawa';
        default:
            return 'W lokalu'
    }
}
export const paymentTypeTranslate = (payment)=>{
    switch(payment) {
        case paymentType.CASH:
            return 'Gotówka';
        case paymentType.CASH:
            return 'Płatność online';
        default:
            return "Gotówka"
    }
}
export const orderStatusTypeTranslate = (status)=>{
    switch(status) {
        case orderStatus.IN_PROGRESS:
            return 'W trakcie';
        case orderStatus.IN_DELIVERY:
            return "W dostawie";
        case orderStatus.DONE:
            return "Zakończone";
        default:
            return "W trakcie"
    }
}


