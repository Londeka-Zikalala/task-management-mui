import { useState,useContext } from "react";
import { TextField, Button, Typography,Modal, Box, } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";


const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { openLogin, showRegister, closeModals } = useContext(AuthContext)!;


  const handleRegister = async () => {
    try {
      const response = await axios.post("https://task-management-nest.onrender.com", { username, password });
      alert(response.data);
    } catch (error) {
      alert("Registration failed");
      openLogin();
    }
  };

  return (
    <Modal open={showRegister} onClose={closeModals}>
      <Box sx={{ width: 400, p: 4, bgcolor: "white", mx: "auto", mt: "20vh", borderRadius: 2 , alignContent:"center"}}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>Register</Button>
        <Button color="secondary" onClick={openLogin} fullWidth>Already have an account? Login</Button>
      </Box>
    </Modal>
  );
};

export default Register;
