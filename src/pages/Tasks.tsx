import { useContext, useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Grid2, Button, TextField } from "@mui/material";
import axios from "axios";
import { Task } from "../Types/Task";
import { AuthContext } from "../Context/AuthContext";

const Tasks = () => {
  const { user } = useContext(AuthContext)!;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(`/api/${user.id}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks");
      }
    };
    fetchTasks();
  }, [user]);

  const handleAddTask = async () => {
    try {
      const response = await axios.post('/api/tasks/create', {
        title: newTask.title,
        description: newTask.description,
        due_date: new Date().toISOString(), 
        status: false,
      });
      if (response.data) {
        setTasks([...tasks, { ...newTask, id: response.data.id }]);
        setNewTask({ title: '', description: '' });
      }
    } catch (error) {
      console.error("Error adding task");
    }
  };

  const handleDeleteTask = async (title: string) => {
    try {
      await axios.delete('/api/tasks/delete', { data: { title } });
      setTasks(tasks.filter(task => task.title !== title));
    } catch (error) {
      console.error("Error deleting task");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Tasks</Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField
            fullWidth
            label="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleAddTask}>Add Task</Button>
        </Grid2>
        <Grid2 size={12}>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id}>
                <ListItemText primary={task.title} secondary={task.description} />
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteTask(task.title)}>Delete</Button>
              </ListItem>
            ))}
          </List>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Tasks;