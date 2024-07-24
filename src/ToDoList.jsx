/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Ensure your custom CSS is imported
import binIcon from './assets/bin.svg'; // Import the SVG file
import upIcon from './assets/up.svg';
import downIcon from './assets/down.svg';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="main-container">
            <div className="position-absolute top-0 start-0 p-3">
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="darkModeSwitch"
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <label className="form-check-label" htmlFor="darkModeSwitch">
                        {darkMode ? 'Dark Mode' : 'Light Mode'}
                    </label>
                </div>
            </div>
            <div className="to-do-list mt-5">
                <h1>To-Do List</h1>
                <div className="mb-3 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Enter your task here"
                        value={newTask}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-success" onClick={addTask}>Add</button>
                </div>
                <ol className="list-group list-group-numbered">
                    {tasks.map((task, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>{task}</span>
                            <div>
                                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => moveTaskUp(index)}>
                                    <img src={upIcon} alt="Move Up" style={{ width: '24px', height: '24px' }} />
                                </button>
                                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => moveTaskDown(index)}>
                                    <img src={downIcon} alt="Move Down" style={{ width: '24px', height: '24px' }} />
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteTask(index)}>
                                    <img src={binIcon} alt="Delete" style={{ width: '24px', height: '24px' }} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default ToDoList;
