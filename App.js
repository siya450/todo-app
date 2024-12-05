import React, { useState } from "react";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: false, important: false },
    { id: 2, text: "Finish project report", completed: false, important: true },
    { id: 3, text: "Call the bank", completed: false, important: false },
    { id: 4, text: "Schedule dentist appointment", completed: false, important: false },
    { id: 5, text: "Plan weekend trip", completed: false, important: false },
  ]);

  const [completedTasks, setCompletedTasks] = useState([
    { id: 6, text: "Read a book", completed: true },
    { id: 7, text: "Clean the house", completed: true },
    { id: 8, text: "Prepare presentation", completed: true },
    { id: 9, text: "Update blog", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  const toggleImportant = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const toggleCompleted = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      );
      
      // Move task to completedTasks if marked as completed
      const completedTask = updatedTasks.find(task => task.id === id && task.completed);
      if (completedTask) {
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          completedTask
        ]);
        // Remove the task from the active tasks
        return updatedTasks.filter((task) => task.id !== id);
      }
      return updatedTasks;
    });
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: tasks.length + completedTasks.length + 1,
      text: newTask,
      completed: false,
      important: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObj]);
    setNewTask(""); // Clear input after adding
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1>DoIt</h1>
        <nav>
          <ul>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyWO_6BVS91YdQ2XkxR2X4mH4lnHsW9dq8KQ&s"
              alt="girl with jacket"
              width="100"
              height="100"
            /><br></br>
            Hey, ABCD
            <li>
              <img
                src="https://st3.depositphotos.com/32824554/34025/v/450/depositphotos_340258740-stock-illustration-list-icon-template-black-color.jpg"
                width="20"
                height="20"
                alt="list icon"
              />
                 All Tasks
            </li>
            <li>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8AAAAwMDDm5uaGhoajo6Pa2toUFBSWlpbp6em0tLRhYWHBwcG4uLjt7e3S0tLz8/M5OTn5+fmdnZ3KysqpqalycnIkJCR5eXlFRUXf39+KiorHx8dsbGyYmJi+vr5UVFRMTEwhISF/f38+Pj4MDAwqKiobGxs0LAfPAAAFDklEQVR4nO2dbVvqSAyGWysVeuRdXgRBPerx///DBWVZJCl0Mmkyu/vcX+2VyS2lLenMJMsAAAAAAAAAAAAAThkVvZFWqF6hFUqNyXac7xh3J/Ghut+htvGhFOnnR/qRoSq9UIqs8xPWqYRSZJb/YJZGKEUG+RmDFEJpsjxPa6kX6k0xTznnWeV5CqEUKWlapX8oTe5pWk/CUE801L1qrjL6emkx/6wU7okwDACGTsAwABg68d83fKZpKd7xn1Vzbcqk7M+m3QPbDU1rvu1K2M5pqM0x1HTWLy1+9vcqJg1D5lWvVb/nF1e9b17aO3OrhbfcgUXVit/wxlvshJuhvqDv148iLyTwrFI5Qf9hsdIUfPDWYXnQE5xdH80FtWIj89SSCEr3jaG3xwVULqkjb4uLaLyjevSWuMhjvGCqV5m/ib7apH2O7ok9T1N7lKFEPtyk/xHGfojr6wO4E/ce1Tv7RsQIMoWTLzbVQ3lgNaV/nq1KCSvmuj09hnqomHrJF9Ky0B7+OnP7o1zC1NqkQ16rtU1u2XzmYr+ak/Tskd60msj/yBEOt2PFhTt/Z2lbL2VeouZ5IRzvx9yWI6REYlwRbpRTY7o02Ds5yLrm/U4P6grHyzLm4kVHtDZkPsSNcLwse6XB6AQXa0My5ybPX4XjZdmYBqMHmb+ZoQeNheNlGa2QftCDzA0/yEE3wvE4wzt6EHOLkhbBmoW6szYsaFrS+1OzUOaG2e/zg/6IB/xzHmrBHGRvSB69p+IBG4WyNyQXN/F4JBRzYXMxPCuoxtQwm4RyMPxZFI+rQzcI5WGYlcdng3HsdMnroVwMdzfr+e6S+nujMVnyfvMVqvZntJOhITAMAYY+wDAEGPoAwxD+j4Yf61tv1u1WMdIEhjBMHxjCMH1gCMP0gSEM0weGMEwfGMLwlLtR4c0IlagQYOgDDEOAoQ8wDAGGO8r+rHOBaqi/0YOp4ZYcQPmluuY6MzVkVwYwyCeas9gZNhXU3hvQzDBk4Z7qPhZmhkFrLzWvN1aGzKKAC3Q01A5YGXKrc+pRWHJ9xMowcIGwhtoBK8NfYYaKm8kmaqi4uxMMQ4AhDGEoA4YhwBCGMJQBwxBgCEMYyoBhCDCEIQxlwDAEGMIQhjJgGAIMA1DsK2pl+BZmqKF2wMowbKP2l3ixI1aGkyBDzakKZjMVmG0ja/lUEDtiN5+G7GJWj2KfBktDZv+4GjRnYpjO+howO0dyKPfdMp25VzVYkfGm3WLbePZl8VRd4rmFTqmYQRsCDH2AYQgw9AGGIcDQBxiGAEMfYBgCDH2AYQgw9KFdQ83qvBSalNyQacujmKkUmhRtYNSUVxpMe8lrOEybLXknnSUNJu9doQWz9lje5JFpi+d/mjI5yf/tTO+e/FYxWQlc+zx5vwJ2qW87vembwi7sjKiqk842cedEPNz3JqJzD39K5PmjSq9oAUO++3LMF6d2yf1b99JeEa3QrZ05EPVuZFEXNSG4nlDNSb1n9Z7IvtXe6TcgTjDreOd/lehX6Kl/E2NuFd8Mrw/iisKdi78npkJcU+4DDWdcuCDvz3nKiDaUSIU7pXkeYRu1WKK220bP26QGxWm5o09vGYZP3alIdb3p/ZA3cq4hbE+h9lGeLLdnwtSl3Fjqb+W3pxe4c1JrzBUvMWcMOmxdw5SbjuKOTBxFtfR7yHlfVu19fKdMBsWqtGZVDNr58gEAAAAAAAAAAOBfwV+grnH9FphnNQAAAABJRU5ErkJggg==" width="20" height="20" alt="list icon"
              />
              Today
              </li>
            <li>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vyKvAkEzDpsyYiyoU_LA0D6_ax4kZBTa6g&s" width="20" height="20"alt="list icon"
              />
              Important
              </li>
            <li>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSolbWCPDt6hh5LRpIz0OF4H-bWFmqaHa0g1A&s" width="20" height="20"alt="list icon"
              />
              Planned
              </li>
            <li>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0oIX9RD--VI9lyjSJOO-Udbu0mxpCcUZv-w&s" width="20" height="20"alt="list icon"
              />
              Assigned to me
              </li>
            <li>Add List </li>
           
          </ul>
        </nav>
        <div className="tasks-summary">
          <p>Today Tasks</p>
          <div className="chart">{tasks.length}</div>
        </div>
      </aside>
      <main className="main">
        <header>
          <h2>To Do</h2>
          <input
            type="text"
            placeholder="Add a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </header>
        <section className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task.id)}
              />
              <span>{task.text}</span>
              <button onClick={() => toggleImportant(task.id)}>
                {task.important ? "★" : "☆"}
              </button>
            </div>
          ))}
        </section>
        <section className="completed-tasks">
          <h3>Completed</h3>
          {completedTasks.map((task) => (
            <div key={task.id} className="task completed">
              <input type="checkbox" checked readOnly />
              <span>{task.text}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default App;
