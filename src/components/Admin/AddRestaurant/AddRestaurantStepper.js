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
    DialogTitle,
    Box,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {history, restaurantInitialValues} from "../../../helpers/_helpers";
import {routes} from "../../../config/routes";
import {Formik} from "formik";
import RestaurantData from "./RestaurantData";
import RestaurantContact from "./RestaurantContact";
import RestaurantOpeningHours from "./RestaurantOpeningHours";
import ProgressButton from "../../ProgressButton";
import {addRestaurant} from "../../../redux/actions/restaurant";
import {useDispatch, useSelector} from "react-redux";
import {restaurantValidationSchema} from "../../../helpers/_validation";

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

const AddRestaurantStepper = ({setDialogOpen,firstRegister}) => {
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const dispatch = useDispatch();
    const isRequesting = useSelector(state=>state.restaurant.isRequesting);
    const isDialogOpen = useSelector(state=>state.restaurant.isStepperOpen);

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



    const stepperTable = ['Dane restauracji','Dane kontaktowe','Godziny otwarcia'];

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <RestaurantData withPhoto/>
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
            onClose={()=>(!firstRegister && !isRequesting) && setDialogOpen()}
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
                initialValues={restaurantInitialValues}
                validationSchema={restaurantValidationSchema}
                onSubmit={(values) => {
                    const categories = values.category.map(category => category.key);
                    const newRestaurantObject = Object.assign(values,{category:categories});
                    dispatch(addRestaurant(newRestaurantObject, localStorage.getItem('refresh_token')));
            }}
            >
                {({
                      errors,
                      handleSubmit,
                      setFieldTouched,
                      dirty
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box p={2}>
                            {getStepContent(activeStep)}
                        </Box>
                        <DialogActions>
                            {isRequesting && activeStep === stepperTable.length - 1 ? (
                                <Typography variant = "h4">
                                    Proszę czekac, trwa konfigurowanie restauracji
                                </Typography>
                            ):(
                                <Button
                                    onClick={()=>{activeStep === 0 ? finishSteps() : handleBack()}}
                                    className={classes.backButton}
                                >
                                    {activeStep === 0 ? "Anuluj" : "Cofnij"}
                                </Button>
                            )}
                            {
                                activeStep === stepperTable.length - 1 ? (
                                    <ProgressButton
                                        label="Zatwierdź"
                                        variant="contained"
                                        color="secondary"
                                        loading={isRequesting}
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
