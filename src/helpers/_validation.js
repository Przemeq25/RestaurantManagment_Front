import * as Yup from "yup";

export const  phoneIsValid =(phone)=>{
    let phoneRe = /(?<!\w)(\(?(\+|00)?([0-9]{2})\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
    return phone.length ? phoneRe.test(phone) : true;
}

export const onlyNumbers = (e)=> {
    e.target.value = e.target.value.replace(/[^0-9+-]/g, '');
}
export const onlyLetters = (e)=>{
    e.target.value = e.target.value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/g, '');
}
export const postCodeIsValid = (postCode) =>{
    let postCodeRegEx =  /(^[0-9]{2}-)?(^[0-9]{2})[0-9]{3}$/;
    return  postCode.length ? postCodeRegEx.test(postCode) : true;
}
export const isValidNip =(nip)=> {
    nip = nip.replace(/[\ \-]/gi, '');

    let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    let controlNumber = parseInt(nip.substring(9, 10));
    let weightCount = weight.length;
    for (let i = 0; i < weightCount; i++) {
        sum += (parseInt(nip.substr(i, 1)) * weight[i]);
    }

    return sum % 11 === controlNumber;
}

export const isValidRegon = (regon) =>{
    let digits = (""+regon).split("");
    let checksum = (8*parseInt(digits[0]) + 9*parseInt(digits[1]) + 2*parseInt(digits[2]) + 3*parseInt(digits[3]) + 4*parseInt(digits[4]) + 5*parseInt(digits[5]) + 6*parseInt(digits[6]) + 7*parseInt(digits[7]))%11;
    if(checksum == 10)
        checksum = 0;

    return (parseInt(digits[8])==checksum);
}

export const validationSchema = Yup.object().shape({
    restaurantName: Yup.string()
        .required('Pole wymagane'),
    category: Yup.string()
        .required('Pole wymagane'),
    nip: Yup.string()
        .min(10, "Podany nip jest za krótki")
        .required('Pole wymagane'),
    regon: Yup.string()
        .min(9, "Podany nip jest za krótki")
        .required('Pole wymagane'),
    street:Yup.string()
        .required('Pole wymagane'),
    city:Yup.string()
        .required('Pole wymagane'),
    postCode:Yup.string()
        .matches(/^[0-9]{2}-[0-9]{3}$/, "Podany kod pocztowy jest błędny")
        .required('Pole wymagane'),
    phoneNumber:Yup.string()
        .matches(/(?<!\w)(\(?(\+|00)?([0-9]{2})\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/, "Podany numer telefonu jest błędny")
        .required('Pole wymagane'),
    houseNumber:Yup.string()
        .required('Pole wymagane'),

});
