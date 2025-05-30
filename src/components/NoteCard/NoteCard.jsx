import { useState } from "react";
import styles from "./NoteCard.module.scss";
import {
  Archive,
  Trash2,
  Undo2,
  Delete,
  Pin,
  Palette,
  Edit2,
  Save,
} from "lucide-react";
import { colors } from "../../utils/Colors";

const NoteCard = ({
  note,
  onArchive,
  onTrash,
  onRestore,
  onDelete,
  onPin,
  onUpdate,
  onChangeBackgroundColor,
}) => {
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title || "",
    description: note.description || "",
    backgroundColor: note.backgroundColor || "#ffffff",
  });

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setShowColorPalette(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (color) => {
    if (isEditing) {
      setEditedNote((prev) => ({
        ...prev,
        backgroundColor: color,
      }));
    } else {
      onChangeBackgroundColor && onChangeBackgroundColor(note.noteId, color);
    }
    setShowColorPalette(false);
  };

  const handleSave = () => {
    onUpdate && onUpdate(note.noteId, editedNote);
    setIsEditing(false);
  };

  return (
    <div
      className={`${styles.noteCard} ${note.isPinned ? styles.pinnedNote : ""}`}
      style={{
        backgroundColor: isEditing
          ? editedNote.backgroundColor
          : note.backgroundColor,
      }}
    >
      <div className={styles.noteContent}>
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleInputChange}
              className={styles.editInput}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={editedNote.description}
              onChange={handleInputChange}
              className={styles.editTextarea}
              placeholder="Take a note..."
            />
          </>
        ) : (
          <>
            {note.title && <h3 className={styles.noteTitle}>{note.title}</h3>}
            {note.description && (
              <p className={styles.noteText}>{note.description}</p>
            )}
          </>
        )}
      </div>
      <div className={styles.noteActions}>
        {isEditing ? (
          <>
            {onUpdate && (
              <button
                className={styles.actionButton}
                onClick={handleSave}
                title="Save"
              >
                <Save size={16} color="#202124" />
              </button>
            )}
            {onChangeBackgroundColor && (
              <button
                className={styles.actionButton}
                onClick={() => setShowColorPalette(!showColorPalette)}
                title="Change color"
              >
                <Palette size={16} color="#202124" />
              </button>
            )}
          </>
        ) : (
          <>
            {onUpdate && (
              <button
                className={styles.actionButton}
                onClick={handleEditToggle}
                title="Edit"
              >
                <Edit2 size={16} color="#202124" />
              </button>
            )}
            {onPin && (
              <button
                className={`${styles.actionButton} ${
                  note.isPinned ? styles.pinned : ""
                }`}
                onClick={() => onPin(note.noteId, !note.isPinned)}
                title={note.isPinned ? "Unpin" : "Pin"}
              >
                <Pin
                  size={16}
                  color="#202124"
                  fill={note.isPinned ? "#202124" : "none"}
                  style={{
                    transform: note.isPinned ? "rotate(45deg)" : "none",
                  }}
                />
              </button>
            )}
            {onChangeBackgroundColor && (
              <button
                className={styles.actionButton}
                onClick={() => setShowColorPalette(!showColorPalette)}
                title="Change color"
              >
                <Palette size={16} color="#202124" />
              </button>
            )}
            {onArchive && (
              <button
                className={styles.actionButton}
                onClick={() => onArchive(note.noteId)}
                title="Archive"
              >
                <Archive size={16} color="#202124" />
              </button>
            )}
            {onTrash && (
              <button
                className={styles.actionButton}
                onClick={() => onTrash(note.noteId)}
                title="Move to Trash"
              >
                <Trash2 size={16} color="#202124" />
              </button>
            )}
            {onRestore && (
              <button
                className={styles.actionButton}
                onClick={() => onRestore(note.noteId)}
                title="Restore"
              >
                <Undo2 size={16} color="#202124" />
              </button>
            )}
            {onDelete && (
              <button
                className={styles.actionButton}
                onClick={() => onDelete(note.noteId)}
                title="Delete Permanently"
              >
                <Delete size={16} color="#202124" />
              </button>
            )}
          </>
        )}
      </div>
      {showColorPalette && (
        <div
          className={`${styles.colorPalette} ${
            isEditing ? styles.editModePalette : ""
          }`}
        >
          {colors.map((color) => (
            <button
              key={color}
              className={styles.colorOption}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
              title={`Change to ${color}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCard;