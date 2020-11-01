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
    let postCodeRegEx =  /^[0-9]{2}-[0-9]{3}$/;
    return  postCode.length ? postCodeRegEx.test(postCode) : true;
}
