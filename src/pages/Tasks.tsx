import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {List, ListItem, ListItemText, Grid2, Button, TextField, AppBar, Toolbar, Checkbox, Box, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography, Alert, Snackbar } from "@mui/material";
import api from "../api";
import { Task } from "../Types/Task";
import { AuthContext } from "../Context/AuthContext";

const Tasks = () => {
  const { user, logout } = useContext(AuthContext)!;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '', status: false });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [noTasksSnackbarOpen, setNoTasksSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      if(tasks.length === 0){

      }
      try {
        const response = await api.get<Task[]>(`/${user.id}/tasks`, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks");
      }
    };
    fetchTasks();
  }, [user]);

  useEffect(() => {
    if (tasks.length === 0) {
      setNoTasksSnackbarOpen(true);
    } else {
      setNoTasksSnackbarOpen(false);
    }
  }, [tasks]);

  const handleAddTask = async () => {

    if (newTask.title.trim() === "" || newTask.description.trim() === "") {
      alert("Please provide both a title and a description for the task.");
      return
    }

    try {
      const response = await api.post('/tasks/create', {
        title: newTask.title,
        description: newTask.description,
        due_date: new Date().toISOString(),
        status: false,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      });
      if (response.data) {
        setTasks([...tasks, { ...newTask, id: response.data.id }]);
        setNewTask({ title: '', description: '', due_date: '', status:false});
        setOpenAddModal(false);
      }
    } catch (error) {
      console.error("Error adding task");
    }
  };

  const handleTaskStatus = async (task: Task) => { 
    try {
     
      const response = await api.patch('/tasks/update', {
        title: task.title,
        status: !task.status, 
      }, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      });
      if (response.data) {
        setTasks(tasks.map(t => t.id === task.id ? { ...t, status: !t.status } : t));
      }
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };


  const handleDeleteTask = async (task: Task) => {

    if (!window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
      return;
    }

    try {
      await api.delete('/tasks/delete', {
        data: { id : task.id},
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      });
      setTasks(tasks.filter(t => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task");
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") {
      return task.status === true;
    }
    if (filter === "due") {
      return task.status === false;
    }
    return true; 
  });

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")){
      logout();
      navigate("/"); 
    }
   
  };


  

  return (
   
    <>
    {/* Navigation bar */}
    <Typography variant="h6" sx={{ fontWeight:"800", color: "#fff", mb: 1 }}>
            Your Tasks
          </Typography>
    <AppBar position="static" sx={{ backgroundColor: "#f57c00", boxShadow: "none", borderRadius: "0 0 16px 16px", mb: 4 }}>
    
    <Toolbar>
      <Button color="inherit" onClick={() => setFilter("all")}>All Tasks</Button>
      <Button color="inherit" onClick={() => setFilter("due")}>Still Due</Button>
      <Button color="inherit" onClick={() => setFilter("completed")}>Completed</Button>
      <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: "auto" }}>
        Logout
      </Button>
    </Toolbar>
  </AppBar>
  <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#fff", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
  <Snackbar
        open={noTasksSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setNoTasksSnackbarOpen(false)}
        style={{ position: 'absolute', bottom: "45%", marginInline:"40%" }}
      >
        <Alert  onClose={() => setNoTasksSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          You have no tasks, start adding!
        </Alert>
      </Snackbar>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
        <List>
          {filteredTasks.map((task: Task) => (
            <ListItem key={task.id} divider>
              <ListItemText 
                primary={task.title} 
                secondary={
                  <>
                    {task.description}<br/>
                    Due: {task.due_date && new Date(task.due_date).toLocaleDateString()}
                  </>
                } 
              />

              {/* Checkbox for toggling status and delete button for each task */}
              <Checkbox 
                checked={task.status} 
                onChange={() => handleTaskStatus(task)} 
                color="primary"
              />

              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => handleDeleteTask(task)}
              >
                Delete
              </Button>
            </ListItem>

          ))}
        </List>
        </Grid2>
      </Grid2>
      </Paper>
       {/* Add Task button to open modal */}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button variant="contained" onClick={() => setOpenAddModal(true)}>
            Add Task
          </Button>
        </Box>

      {/* Add Task Modal */}
      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Task Title"
            fullWidth
            variant="standard"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Task Description"
            fullWidth
            variant="standard"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={newTask.due_date}
            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Tasks;