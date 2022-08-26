import * as React from "react";
import { useState } from "react";

import { Button, ButtonGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";

import { Dispatch } from "@reduxjs/toolkit";
import { storageActions } from "../../features/storage/storageSlice"
import {useParams} from "react-router-dom";
import {getChildren} from "../../utils/getChildren";

type Folder = {
    path: string
    name: string,
    type: 'folder',
    children: Array<Folder | File>
}

type File = {
    path: string,
    name: string,
    type: 'file',
    data: string,
}
const Form:React.FC<{content: Array<Folder | File>}> = (props) => {
    const [name, setName] = useState('');
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch<Dispatch<any>>();
    const { path } = useParams();

    const validate = (name: string, type: 'file' | 'folder') => {
        if (name === '') {
            setShowToast(true);
            toast.error("Name should not be empty!");
            return false
        }

        let children = path ? getChildren(path, props.content): props.content;
        if (children.find((el: { name: string; type: string; }) => el.name === name && el.type === type )) {
            setShowToast(true);
            toast.error("Name should not be duplicated");
            return false
        }
        return true
    }

    const addNewFolder = () => {
        if (validate(name, 'folder')){
            dispatch(storageActions.addFolder({
                name,
                path
            }));
            setName('');
        }
    }

    const addNewFile = () => {
        if (validate(name, 'file')){
            dispatch(storageActions.addFile({
                name,
                path
            }));
            setName('');
        }
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
                    value={name}
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