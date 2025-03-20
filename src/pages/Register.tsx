import { useState, useContext } from "react";
import { TextField, Button, Typography, Modal, Box } from "@mui/material";
import api from "../api";
import { AuthContext } from "../Context/AuthContext";
import { User } from "../Types/User";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { openLogin, showRegister, closeModals, login } = useContext(AuthContext)!;

  const handleRegister = async () => {
    try {
      const response = await api.post<{ user: User, accessToken: string }>("/register", { username, password });
      if (response.data && response.data.accessToken) {
        console.log(response.data)
        login(response.data.user, response.data.accessToken); 
        alert("Registration successful, logging in...");
      }
    } catch (error) {
      alert("Registration failed");
      openLogin(); 
    }
  };

  return (
    <Modal open={showRegister} onClose={closeModals}>
      <Box sx={{ width: 400, p: 4, bgcolor: "white", mx: "auto", mt: "20vh", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>Register</Button>
        <Button color="secondary" onClick={openLogin} fullWidth>Already have an account? Login</Button>
      </Box>
    </Modal>
  );
};

export default Register;
