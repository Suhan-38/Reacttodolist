import { useState } from "react";
import "./Todo.css"
export default function Todo({ todo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const handleSaveClick = () => {
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsCompleted(checked);
    onEdit(todo.id, todo.title, checked);
  };

  return (
    <li style={{ border: isCompleted ? "2px solid yellow" : "2px solid white" }} className="litodo">
      {!isEditing && (
        <div className="checkelemnt">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
          />
          <span>{todo.title}</span>
        </div>
      )}
      {isEditing && (
        <div className="editdiv">
          <input
            type="text"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
          className="addtodoedit"/>
          <div className="firstvisible">
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      )}
      <div className="firstvisible"><button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button></div>
    </li>
  );
}
