import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { openLogin, openRegister } = useContext(AuthContext)!;

  return (
    <>
    <Typography variant="h4" style={{textAlign:"center"}}>Welcome To Your Task Manager</Typography>

    <Container maxWidth="sm" style={{ 
      display: "flex", 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "auto",
      marginBlock:"10%"
    }}>
      <Button variant="contained" color="primary" onClick={openLogin} style={{ marginRight: 10 }}>Login</Button>
      <Button variant="outlined" color="secondary" onClick={openRegister}>Register</Button>
    </Container>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router basename="/task-management-mui">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks/>} />
      </Routes>
      <Login />
      <Register />
    </Router>
  </AuthProvider>
);

export default App;

