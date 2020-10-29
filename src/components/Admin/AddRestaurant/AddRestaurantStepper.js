import React, {useState} from "react";
import {
    Dialog,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    TableContainer,
    TableCell,
    Table,
    TableHead,
    TableBody,
    TableRow,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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

const AddRestaurantStepper = ({isDialogOpen,setDialogOpen}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [image, setImage] = useState('');
    const classes = useStyles();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const finishSteps =()=>{
        setDialogOpen();
        setActiveStep(0);
    }


    const stepperTable = ['Dodaj dane restauracji','Dodaj dane kontaktowe','Dodaj godziny otwarcia'];

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <Box display="flex" flexDirection="column" p={2}>
                        <TextField label="Nazwa restauracji" fullWidth margin="dense"/>
                        <FormControl className={classes.formControl} fullWidth margin="dense">
                            <InputLabel htmlFor="age-native-simple">Typ kuchni</InputLabel>
                            <Select
                                native
                                inputProps={{
                                    name: 'type',
                                    id: 'age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Polska</option>
                                <option value={20}>Chinśka</option>
                                <option value={30}>Włoska</option>
                            </Select>
                        </FormControl>
                        <TextField label="Opis" fullWidth margin="dense" multiline/>
                        <Box mt={2}/>
                        <div>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                onChange={e=>setImage(e.target.files[0])}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" color="secondary" component="span">
                                    {image ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
                                </Button>
                            </label>
                        </div>
                        <Box mt={2}>
                            {image && <img src = {URL.createObjectURL(image)} alt = "Logo" className={classes.addedImagePreview}/>}
                        </Box>

                    </Box>);
            case 1:
                return (
                    <Box display="flex" flexDirection="column" p={2}>
                        <TextField label="Kraj" fullWidth margin="dense"/>
                        <TextField label="Miasto" fullWidth margin="dense"/>
                        <TextField label="Ulica" fullWidth margin="dense"/>
                        <TextField label="Numer lokalu" fullWidth margin="dense"/>
                        <TextField label="Numer telefonu" fullWidth margin="dense"/>
                    </Box>
                );
            case 2:
                return (
                    <Box  p={2}>
                        <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Dzień</TableCell>
                                        <TableCell>Od</TableCell>
                                        <TableCell>Do</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                    <TableCell>Poniedziałek</TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            defaultValue="07:00"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            type="time"
                                            defaultValue="20:00"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button color="primary" variant="outlined">Zamknięte</Button>
                                    </TableCell>
                                </TableRow>
                                    <TableRow>
                                        <TableCell>Wtorek</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="07:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="20:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button color="primary" variant="outlined">Zamknięte</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Środa</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="07:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="20:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button color="primary" variant="outlined">Zamknięte</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Czwartek</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="07:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="20:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button color="primary" variant="outlined">Zamknięte</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Piątek</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="07:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="20:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button color="primary" variant="outlined">Zamknięte</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Sobota</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="07:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="20:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button color="primary" variant="outlined">Zamknięte</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Niedziela</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="07:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                type="time"
                                                defaultValue="20:00"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button color="primary" variant="outlined">Zamknięte</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    }
    return(
        <Dialog
            fullWidth
            maxWidth="md"
            open={isDialogOpen}
            onClose={()=>setDialogOpen()}
            classes={{paperFullWidth: classes.dialogMobile, paper: classes.dialogMobilePaper}}
        >
            <Stepper activeStep={activeStep} alternativeLabel >
                {stepperTable.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {getStepContent(activeStep)}
            <DialogActions>
                <div>
                    {activeStep === stepperTable.length ? (
                        finishSteps()
                    ) : (
                        <div>
                            <Box p={1}>
                                <Button
                                    onClick={()=>{activeStep === 0 ? finishSteps() : handleBack()}}
                                    className={classes.backButton}
                                >
                                    {activeStep === 0 ? "Anuluj" : "Cofnij"}
                                </Button>
                                <Button variant="contained" color={activeStep === stepperTable.length - 1 ? "secondary":"primary"} onClick={handleNext}>
                                    {activeStep === stepperTable.length - 1 ? 'Zatwierdź' : 'Dalej'}
                                </Button>
                            </Box>
                        </div>
                    )}
                </div>
            </DialogActions>
        </Dialog>
    );
}
export default AddRestaurantStepper;
