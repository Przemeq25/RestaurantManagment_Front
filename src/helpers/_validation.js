import * as Yup from "yup";
import moment from "moment";


export const onlyNumbers = (e)=> {
    e.target.value = e.target.value.replace(/[^0-9-.]/g, '');
}
export const onlyLetters = (e)=>{
    e.target.value = e.target.value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/g, '');
}

export const restaurantValidationSchema = Yup.object().shape({
    name: Yup.string()
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
export const paymentOnlineValidationSchema = Yup.object().shape({
    posId: Yup.string()
        .required('Pole wymagane'),
    md5: Yup.string()
        .required('Pole wymagane'),
    clientId: Yup.string()
        .required('Pole wymagane'),
    clientSecret: Yup.string()
        .required('Pole wymagane'),
});

export const menuValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Pole wymagane'),
    price:Yup.string().test(
        'is-decimal',
        'Kwota niepoprawna',
        value => (value + "").match(/^(0|0?[1-9]\d*)\.\d\d$/g),
    ).required("Pole wymagane"),
    timeToDo:Yup.string()
        .test(
            'is-integer',
            'Podaj czas w minutach',
            value => (value + "").match(/^[0-9]*$/g))
        .required('Pole wymagane'),
    ingredients: Yup.string()
        .required('Pole wymagane'),
    category: Yup.string()
        .required('Pole wymagane'),
});

export const personalDataValidationSchema = Yup.object().shape({
    forename: Yup.string()
        .required('Pole wymagane'),
    surname: Yup.string()
        .required('Pole wymagane'),
    city: Yup.string()
        .required('Pole wymagane'),
    street: Yup.string()
        .required('Pole wymagane'),
    postCode: Yup.string()
        .matches(/^[0-9]{2}-[0-9]{3}$/, "Podany kod pocztowy jest błędny")
        .required('Pole wymagane'),
    phoneNumber: Yup.string()
        .matches(/(?<!\w)(\(?(\+|00)?([0-9]{2})\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/, "Podany numer telefonu jest błędny")
        .required('Pole wymagane'),
    houseNumber: Yup.string()
        .required('Pole wymagane'),
});

export const reservationValidationSchema = Yup.object().shape({
    numberOfSeats: Yup.string()
        .required("Pole wymagane"),
    day: Yup.string()
        .required("Pole wymagane"),
    from: Yup.string()
        .required("Pole wymagane"),
    to : Yup.string()
        .required("Pole wymagane")
        .test("is-greater", "Godzina końcowa nie może być mniejsza niż początkowa", function(value) {
            const { from } = this.parent;
            return moment(value, "HH:mm").isSameOrAfter(moment(from, "HH:mm"));
        })
});
export const reservationPersonalValidationSchema = Yup.object().shape({
    forename: Yup.string()
        .required('Pole wymagane'),
    surname: Yup.string()
        .required('Pole wymagane'),
    phoneNumber: Yup.string()
        .matches(/(?<!\w)(\(?(\+|00)?([0-9]{2})\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/, "Podany numer telefonu jest błędny")
        .required('Pole wymagane'),
});

