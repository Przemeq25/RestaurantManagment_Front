import React, {useEffect, useState} from "react";
import {
    Drawer,
    TextField,
    Typography,
    Avatar,
    Button,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails, CircularProgress, Card
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Formik} from "formik";
import {menuValidationSchema, onlyNumbers} from "../../../helpers/_validation";
import ProgressButton from "../../ProgressButton";
import AppLogo from "../../AppLogo";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme=>({
    drawerStyle:{
        top: 64,
        padding:20,
        alignItems:'center',
        height:'calc(100% - 64px)',
        maxWidth:380,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    imageStyle:{
        width: theme.spacing(22),
        height: theme.spacing(22),
        backgroundColor:'#ededed',
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    closeIconPosition:{
        position:'absolute',
        top: 10,
        right:10,
        cursor:'pointer',
    },
    input:{
        display:'none',
    },
    accordionSummary:{
        padding: 0,
    }
}));

const AddMenu =({menuIsOpen,handleCloseDrawer,handleSubmitForm,isAddRequesting,isEditRequesting,menuInitialValues,isEditing,isDeleteRequesting,handleDeleteMeal})=>{
    const classes = useStyles();
    const [isCollapseOpen,setCollapseOpen] = useState(false);

    const handleToggleCollapse = () =>{
        setCollapseOpen(!isCollapseOpen);
    }

    useEffect(()=>{
        !menuIsOpen && setCollapseOpen(false);
    },[menuIsOpen]);

    return(
        <>
            <Drawer open={menuIsOpen} anchor="right" variant="persistent" classes={{paper:classes.drawerStyle}}>
                <CloseIcon className={classes.closeIconPosition} onClick={handleCloseDrawer}/>
                <Typography variant="h4" paragraph>Dodaj posiłek:</Typography>
                <Formik
                    initialValues={menuInitialValues}
                    enableReinitialize={true}
                    validationSchema={menuValidationSchema}
                    onSubmit={(values,{resetForm}) => {
                        handleSubmitForm(values);
                        !isEditing && resetForm();
                    }}
                >
                    {({
                          handleSubmit,
                          setFieldValue,
                          values,
                          handleChange,
                          errors,
                          touched,
                          handleBlur,
                          resetForm
                      }) => (
                          <>
                                {values.image ? (
                                        <Avatar src = {(typeof values.image === 'string' || values.image instanceof String) ? values.image : URL.createObjectURL(values.image)} variant="rounded" className={classes.imageStyle}/>
                                    ):(
                                        <Avatar variant="rounded" className={classes.imageStyle}>
                                            <AppLogo size={12}/>
                                        </Avatar>
                                    )
                                }
                                <Box mt={2}>
                                    <input
                                          accept="image/*"
                                          className={classes.input}
                                          id="contained-button-file"
                                          type="file"
                                          onChange={e=>setFieldValue("image",e.target.files[0])}
                                          name="image"
                                    />
                                    <label htmlFor="contained-button-file">
                                          <Button variant="contained" color="secondary" component="span" size="small">
                                              {values.image ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
                                          </Button>
                                    </label>
                                </Box>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Nazwa posiłku:"
                                        fullWidth
                                        margin="dense"
                                        name="name"
                                        onChange={handleChange}
                                        value={values.name}
                                        error = { errors.name && touched.name ? true : false }
                                        helperText={touched.name && errors.name}
                                        onBlur={handleBlur}
                                    />
                                    <TextField
                                        label="Cena (zł):"
                                        fullWidth
                                        margin="dense"
                                        name="price"
                                        InputProps={{
                                            inputProps: {
                                                min: 0,
                                            }
                                        }}
                                        onChange={handleChange}
                                        value={values.price}
                                        error = { errors.price && touched.price ? true : false }
                                        helperText={touched.price && errors.price}
                                        onBlur={e=>{
                                            handleBlur(e);
                                            if(e.target.value.indexOf('.') === -1 && e.target.value.length >= 1)
                                            {
                                                values.price = e.target.value.concat('.00')
                                            }
                                        }}
                                        onInput={(e)=>onlyNumbers(e)}
                                    />
                                    <TextField
                                        label="Czas wykonania (min):"
                                        fullWidth
                                        margin="dense"
                                        name="timeToDo"
                                        type="text"
                                        InputProps={{
                                            inputProps: {
                                                min: 0,
                                            },
                                        }}
                                        onChange={handleChange}
                                        value={values.timeToDo}
                                        error = { errors.timeToDo && touched.timeToDo ? true : false }
                                        helperText={touched.timeToDo && errors.timeToDo}
                                        onBlur={handleBlur}
                                        onInput = {(e)=>onlyNumbers(e)}
                                    />
                                    <TextField
                                        label="Opis (składniki):"
                                        fullWidth
                                        margin="dense"
                                        name="ingredients"
                                        multiline
                                        onChange={handleChange}
                                        value={values.ingredients}
                                        error = { errors.ingredients && touched.ingredients ? true : false }
                                        helperText={touched.ingredients && errors.ingredients}
                                        onBlur={handleBlur}
                                    />

                                    <Box mt={2} display="flex" justifyContent ="space-between" alignItems = "center" >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={resetForm}
                                        >
                                            Reset
                                        </Button>
                                        <ProgressButton
                                            color="secondary"
                                            variant = "contained"
                                            size="small"
                                            label={isEditing ? "Edytuj":"Dodaj"}
                                            loading={isEditing ? isEditRequesting : isAddRequesting}
                                        />
                                    </Box>
                                    {isEditing ?
                                        <Box mt={2} display="flex" justifyContent="center">
                                            <Accordion square elevation={0} expanded={isCollapseOpen}>
                                                <AccordionSummary classes={{root:classes.accordionSummary}}>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<DeleteIcon/>}
                                                        size="small"
                                                        onClick={handleToggleCollapse}
                                                        fullWidth
                                                    >
                                                        Usuń posiłek
                                                    </Button>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box display="flex" alignItems="center" flexDirection="column" p={2} pt={0}>
                                                        {isDeleteRequesting ? (
                                                            <>
                                                                <Typography variant="h4" color="primary" paragraph align="center">
                                                                    Proszę czekać, trwa usuwanie posiłku ...
                                                                </Typography>
                                                                <CircularProgress color="inherit"/>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Typography paragraph>
                                                                    Czy na pewno chcesz usunąć ten posiłek?
                                                                </Typography>
                                                                <Typography variant="subtitle2" gutterBottom>
                                                                    Usuwając nie będziesz miał możliwości przywrócenia go do swojego menu!
                                                                </Typography>
                                                                <Box mt={2}>
                                                                    <Button
                                                                        variant="text"
                                                                        startIcon={<DoneIcon/>}
                                                                        onClick={()=>handleDeleteMeal(values.id)}
                                                                    >
                                                                        Usuń
                                                                    </Button>
                                                                    <Button
                                                                        variant="text"
                                                                        startIcon={<CloseIcon/>}
                                                                        onClick={handleToggleCollapse}
                                                                    >
                                                                        Anuluj
                                                                    </Button>
                                                                </Box>
                                                            </>
                                                        )}
                                                    </Box>

                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                        : null
                                    }

                                </form>
                            </>
                        )}
                </Formik>
            </Drawer>
        </>
    );

}
export default AddMenu;
