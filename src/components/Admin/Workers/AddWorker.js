import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Formik} from "formik";
import * as Yup from "yup";
import ProgressButton from "../../ProgressButton";

const AddWorker = ({isDialogOpen,handleToggleDialog,addWorker,isAddRequesting}) =>{

    return (
        <Dialog open={isDialogOpen} onClose={handleToggleDialog} aria-labelledby="form-dialog-title">
            <DialogTitle>Dodaj pracownika</DialogTitle>
            <DialogContent>
                <DialogContentText>
                   Dodaj pracownika do swojej restauracji wspisująć jego email!
                </DialogContentText>
                <Formik
                    initialValues={{email:''}}
                    validationSchema={
                        Yup.object().shape({
                            email: Yup.string()
                                .email("Błędny adres email")
                                .required('Pole wymagane'),
                        })
                    }
                    onSubmit={(values) => {
                        addWorker(values.email);
                        handleToggleDialog();
                    }}
                >
                    {({
                          handleSubmit,
                          values,
                          handleChange,
                          errors,
                          touched,
                          handleBlur,
                      }) => (
                          <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                                error = { errors.email && touched.email ? true : false }
                                helperText={touched.email && errors.email}
                                onBlur={handleBlur}
                            />
                            <DialogActions>
                            <Button onClick={handleToggleDialog}>Anuluj</Button>
                            <ProgressButton label="Dodaj" variant="text" loading={isAddRequesting}/>
                            </DialogActions>
                          </form>
                        )
                    }
                </Formik>
            </DialogContent>

        </Dialog>
    );
}
export default AddWorker;
