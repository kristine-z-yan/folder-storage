import React from "react";
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";
import Form from "../components/Form/Form";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Box} from "@mui/material";
import Storage from "../features/storage/Storage";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

const Main:React.FC = () => {
    const storage = useSelector((state:RootState) => state.state.storage);

    return (
        <Grid container spacing={2} >
            <Grid item xs={2}>
                <Link to='/'/>
            </Grid>
            <Grid item xs={6}>
                <Form content={storage}/>
            </Grid>
            <Grid item xs={4}>
                <DeleteOutlineOutlinedIcon fontSize='large' sx={{ marginTop: '10px'}}/>
            </Grid>
            <Box sx={{
                width: 400,
                height: 500,
                border: '1px solid lightgrey',
                margin: 10
            }}>
                <Storage content={storage} />
            </Box>
        </Grid>
    )
}

export default Main;