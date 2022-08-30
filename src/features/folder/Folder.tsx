import React from "react";
import Grid from "@mui/material/Grid";
import Form from "../../components/Form/Form";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Storage from "../storage/Storage";
import {Box} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {getChildren} from "../../utils/getChildren";

const Folder:React.FC = () => {
    const { path } = useParams();
    const storage = useSelector((state:RootState) => state.state.storage);
    const prevFolder = path?.substr(0, path?.lastIndexOf('-'));
    const backButton = prevFolder ? '/folders/'+ prevFolder : '/';

    let content = path ? getChildren(path, storage): storage;

    return (
        <Grid container spacing={2} >
            <Grid item xs={2}>
                <Link to={backButton}>Back</Link>
            </Grid>
            <Grid item xs={6}>
                <Form content={content}/>
            </Grid>
            <Grid item xs={4}>
                <Link to='/trash'>
                    <DeleteOutlineOutlinedIcon fontSize='large' sx={{ marginTop: '10px'}}/>
                </Link>
            </Grid>
            <Box sx={{
                width: 400,
                height: 500,
                border: '1px solid lightgrey',
                margin: 10
            }}>
                <Storage content={content}/>
            </Box>
        </Grid>
    )
}

export default Folder