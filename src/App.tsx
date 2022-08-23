import * as React from "react";

import Grid from "@mui/material/Grid";
import Form from "./components/Form/Form";
import {Box, Container} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Storage from "./features/storage/Storage";

function App() {
  return (
      <Container sx={{ marginTop: '50px'}} maxWidth='md'>
          <Grid container spacing={2} >
              <Grid item xs={8}>
                  <Form />
              </Grid>
              <Grid item xs={4}>
                <DeleteOutlineOutlinedIcon fontSize='large' sx={{ marginTop: '10px'}}/>
              </Grid>
          </Grid>
          <Box sx={{
              width: 400,
              height: 500,
              border: '1px solid lightgrey',
              margin: 10
          }}>
              <Storage />
          </Box>
      </Container>
  );
}

export default App;
