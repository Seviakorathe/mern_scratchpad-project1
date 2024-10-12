import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, useColorModeValue } from "@chakra-ui/react";

import Add from "./pages/Add";
import ListAll from "./pages/ListAll";
import Edit from "./pages/Edit";
import View from "./pages/View";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.800")}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListAll />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
