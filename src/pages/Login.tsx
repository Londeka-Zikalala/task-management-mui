import { useState, useContext } from "react";
import { TextField, Button, Typography, Modal, Box } from "@mui/material";
import axios from "axios";
import { User } from "../Types/User";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";


const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, openRegister, showLogin, closeModals } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<User | null>("https://task-management-nest.onrender.com", { username, password });
      if (response.data) {
        login(response.data);
        navigate("/tasks");
      } else {
        alert("Invalid credentials, redirecting to register...");
        openRegister();
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <Modal open={showLogin} onClose={closeModals}>
      <Box sx={{ width: 400, p: 4, bgcolor: "white", mx: "auto", mt: "20vh", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} margin="normal" />
        <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>Login</Button>
        <Button color="secondary" onClick={openRegister} fullWidth>Don't have an account? Register</Button>
      </Box>
    </Modal>
  );
};

export default Login;
