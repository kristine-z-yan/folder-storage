import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, createTheme, ThemeProvider} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { getFile } from "../utils/getFile";
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";
import { storageActions } from "../features/storage/storageSlice";
import { toast, ToastContainer } from "react-toastify";

const File:React.FC = () => {
    const { path } = useParams();
    const dispatch = useDispatch<Dispatch<any>>();
    const storage = useSelector((state:RootState) => state.state.storage);
    const errorMessage = useSelector((state:RootState) => state.state.errorMessage);
    const successMessage = useSelector((state:RootState) => state.state.successMessage);
    const [showToast, setShowToast] = useState(false);
    const prevFolder = path?.substr(0, path?.lastIndexOf('-'));
    const backButton = prevFolder ? '/folders/'+ prevFolder : '/';
    const file = getFile(path, storage);
    const myTheme = createTheme();
    const textRef = useRef<TMUIRichTextEditorRef>(null);

    useEffect(() => {
        if (errorMessage) {
            setShowToast(true);
            toast.error(errorMessage);
        }
        if (successMessage) {
            setShowToast(true);
            toast.success(successMessage);
        }
        dispatch(storageActions.clearMessages())
    }, [errorMessage, successMessage, dispatch])

    const handleSave = (data: string) => {
        dispatch(storageActions.saveFile({data, path}))
    }

    const handleClick = () => {
        textRef.current?.save()
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
            <Grid container spacing={2} >
                <Grid item xs={2}>
                    <Link to={backButton}>Back</Link>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{
                        marginTop: '30px'
                    }}>
                        <CardContent>
                            <Box sx={{
                                width: 700,
                                height: 300,
                                border: '1px solid lightgrey',
                                margin: '30px auto'
                            }}>
                                <ThemeProvider theme={myTheme}>
                                    <MUIRichTextEditor
                                        label="Type something here..."
                                        onSave={handleSave}
                                        ref={textRef}
                                        defaultValue={file.data}
                                        controls={["bold", "italic", "underline", "quote", "clear"]}
                                    />
                                </ThemeProvider>
                            </Box>
                        </CardContent>
                        <CardActions sx={{
                            justifyContent: 'center',
                            marginBottom: '20px'
                        }}>
                            <Button color='success' variant='contained' onClick={handleClick}>Save</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default File;