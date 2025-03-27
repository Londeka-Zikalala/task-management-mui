import { useState, useContext } from "react";
import { TextField, Button, Typography, Modal, Box } from "@mui/material";
import api from "../api";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { openLogin, showRegister, closeModals, login } = useContext(AuthContext)!;

  const handleRegister = async () => {
    try {
      const response = await api.post<any>("/register", { username, password },
        {
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      }
      );

      if (response.data === "user registered") {
        alert("Registration successful, redirecting to login...");
        closeModals();
        openLogin()
        login(response.data.user, response.data.accessToken); 
      }
      else {
        alert("Registration failed: " + response.data);
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
