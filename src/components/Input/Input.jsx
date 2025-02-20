import { useState } from "react";
import "./Input.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText } : task
      )
    );
    setEditingTask(null);
  };

  return (
    <div className="task-container">
      <div className="add-task">
        <input
          type="text"
          placeholder="Введите задачу..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Добавить</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
            {editingTask === task.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}

            <div className="buttons">
              {editingTask === task.id ? (
                <button className="save" onClick={() => saveEdit(task.id)}>💾</button>
              ) : (
                <>
                  <button className="edit" onClick={() => startEditing(task)}>✏️</button>
                  <button className="complete" onClick={() => toggleComplete(task.id)}>✔</button>
                </>
              )}
              <button className="delete" onClick={() => deleteTask(task.id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
