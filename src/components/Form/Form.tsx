import * as React from "react";
import { useState } from "react";

import { Button, ButtonGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";

import { Dispatch } from "@reduxjs/toolkit";
import { storageActions } from "../../features/storage/storageSlice"

const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch<Dispatch<any>>();

    const validate = (name: string) => {
        if (name === '') {
            setShowToast(true);
            toast.error("Name should not be empty!");
        }
    }

    const addNewFolder = () => {
        validate(name);
        dispatch(storageActions.addFolder(name))
    }

    const addNewFile = () => {
        validate(name);
        dispatch(storageActions.addFile(name))
    }

    return (
        <>
            { showToast &&  <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /> }
            <div>
                <TextField
                    required
                    label="Name"
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                />
                <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ margin: '10px'}}>
                    <Button color='primary' onClick={addNewFolder}>Add new folder</Button>
                    <Button color='success' onClick={addNewFile}>Add new file</Button>
                </ButtonGroup>
            </div>
        </>
    )
}

export default Form;