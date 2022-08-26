import * as React from "react";
import {
    BrowserRouter as Router, Route, Routes,
} from "react-router-dom";

import {Container} from "@mui/material";
import Folder from "./features/folder/Folder";
import Main from "./pages/Main";
import File from "./pages/File";

function App() {
    return (
      <Container sx={{ marginTop: '50px'}} maxWidth='md'>
          <Router>
              <Routes>
                  <Route path="/" element={<Main />}/>
                  <Route path="/folders/:path" element={<Folder />}/>
                  <Route path="/files/:path" element={<File />}/>
              </Routes>
          </Router>
      </Container>
  );
}

export default App;
