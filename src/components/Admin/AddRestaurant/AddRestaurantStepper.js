import React,{ useState} from "react";
import {
    Dialog,
    Stepper,
    Step,
    StepLabel,
    Button,
    useTheme,
    useMediaQuery,
    DialogActions,
    DialogTitle
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {history} from "../../../helpers/_helpers";
import {routes} from "../../../config/routes";
import {Formik} from "formik";
import RestaurantData from "./RestaurantData";
import RestaurantContact from "./RestaurantContact";
import RestaurantOpeningHours from "./RestaurantOpeningHours";
import ProgressButton from "../../ProgressButton";
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    dialogMobile:{
        width: 'calc(100% - 10px)',
    },
    dialogMobilePaper:{
        margin:"32px 0px",
    },
    addedImagePreview:{
        objectFit:'cover',
        maxHeight:200,
        maxWidth:"100%",
    }


}));

const AddRestaurantStepper = ({isDialogOpen,setDialogOpen,firstRegister}) => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () =>{
        setActiveStep((prevActiveStep)=> prevActiveStep -1);
    }

    const finishSteps =()=>{
        firstRegister ? history.push(routes.HOMEPAGE) : setDialogOpen();
        setActiveStep(0);
    }


    const validationSchema = Yup.object().shape({
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
        country: Yup.string()
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

    const stepperTable = ['Dane restauracji','Dane kontaktowe','Godziny otwarcia'];

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <RestaurantData/>
                    );
            case 1:
                return (
                    <RestaurantContact/>
                );
            case 2:
                return (
                    <RestaurantOpeningHours/>
                );
            default:
                return 'Unknown step';
        }
    }
    return(
        <Dialog
            fullWidth
            fullScreen = {matches}
            maxWidth="md"
            open={isDialogOpen}
            onClose={()=>!firstRegister && setDialogOpen()}
            classes={{paperFullWidth: classes.dialogMobile, paper: classes.dialogMobilePaper}}
        >
            {
                firstRegister &&
                    <DialogTitle>Stwórz swoją restaurację!</DialogTitle>
            }
            <Stepper activeStep={activeStep} alternativeLabel >
                {stepperTable.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Formik
                initialValues={{
                    restaurantName: '',
                    category: [],
                    categoryEnum:[],
                    description:'',
                    nip:'',
                    regon:'',
                    image:'',
                    street:'',
                    city:'',
                    postCode:'',
                    phoneNumber:'',
                    houseNumber:'',
                    openingHours:[
                        {
                            label:"Poniedziałek",
                            day:'MONDAY',
                            openFrom:'07:00',
                            openUntil:'20:00',
                        },
                        {
                            label:"Wtorek",
                            day:'TUESDAY',
                            openFrom:'07:00',
                            openUntil:'20:00',
                        },
                        {
                            label:"Środa",
                            day:'WEDNESDAY',
                            openFrom:'07:00',
                            openUntil:'20:00',
                        },
                        {
                            label:'Czwartek',
                            day:'THURSDAY',
                            openFrom:'07:00',
                            openUntil:'20:00',
                        },
                        {
                            label:"Piątek",
                            day:'FRIDAY',
                            openFrom:'07:00',
                            openUntil:'20:00',
                        },
                        {
                            label:"Sobota",
                            day:'SATURDAY',
                            openFrom:'07:00',
                            openUntil:'20:00',
                        },
                        {
                            label:'Niedziela',
                            day:'SUNDAY',
                            openFrom:'07:00',
                            openUntil:'20:00',
                        },
                    ]


                }}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting }) => {
                    setTimeout(()=> {
                        console.log(values)
                        setSubmitting(false);
                    },300)

                }}
            >
                {({
                      errors,
                      handleSubmit,
                      isSubmitting,
                      setFieldTouched,
                      dirty
                  }) => (
                    <form onSubmit={handleSubmit}>
                        {getStepContent(activeStep)}
                        <DialogActions>
                            <Button
                                onClick={()=>{activeStep === 0 ? finishSteps() : handleBack()}}
                                className={classes.backButton}
                            >
                                {activeStep === 0 ? "Anuluj" : "Cofnij"}
                            </Button>
                            {
                                activeStep === stepperTable.length - 1 ? (
                                    <ProgressButton
                                        label="Zatwierdź"
                                        variant="contained"
                                        color="secondary"
                                        loading={isSubmitting}
                                    />
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            if(activeStep === 0){
                                                setFieldTouched("restaurantName");
                                                setFieldTouched("category");
                                                setFieldTouched("nip");
                                                setFieldTouched("regon");
                                                if (errors['restaurantName'] || errors['nip'] || errors['category'] || errors['regon'] || !dirty) {
                                                    setActiveStep(0)
                                                } else {
                                                    handleNext()
                                                }
                                            }
                                            if(activeStep === 1){
                                                setFieldTouched("city");
                                                setFieldTouched("street");
                                                setFieldTouched("postCode");
                                                setFieldTouched("houseNumber");
                                                setFieldTouched("phoneNumber");
                                                if (errors['city'] || errors['street'] || errors['postCode'] || errors['houseNumber'] || errors['phoneNumber'] || !dirty) {
                                                    setActiveStep(1)
                                                } else {
                                                    handleNext()
                                                }

                                            }
                                        }}

                                    >
                                        Dalej
                                    </Button>
                                )
                            }

                        </DialogActions>
                    </form>
                )}
            </Formik>

        </Dialog>
    );
}
export default AddRestaurantStepper;
