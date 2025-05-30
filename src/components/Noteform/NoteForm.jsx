import { useEffect, useRef, useState } from "react";
import Input from "../common/Input.jsx";
import styles from "./NoteForm.module.scss";
import { colors } from "../../utils/Colors.js";
import { ArchiveX, Palette, Pin, Trash2 } from "lucide-react";

const NoteForm = ({ onSaveNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    backgroundColor: "#ffffff",
    isPinned: false,
  });
  const formRef = useRef(null);
  const paletteRef = useRef(null);

  const expandInput = () => {
    setIsExpanded(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorSelect = (color) => {
    setNoteData((prev) => ({
      ...prev,
      backgroundColor: color,
    }));
    setShowColorPalette(false);
  };

  const handleTogglePin = () => {
    setNoteData((prev) => ({
      ...prev,
      isPinned: !prev.isPinned,
    }));
  };

  const handleClose = () => {
    if (noteData.title && noteData.description) {
      onSaveNote({
        title: noteData.title,
        description: noteData.description,
        backgroundColor: noteData.backgroundColor,
        isPinned: noteData.isPinned,
      });
    }
    setIsExpanded(false);
    setShowColorPalette(false);
    setNoteData({
      title: "",
      description: "",
      backgroundColor: "#ffffff",
      isPinned: false,
    });
  };

  const handleClickOutside = (event) => {
    const clickedOutsideForm =
      formRef.current && !formRef.current.contains(event.target);
    if (clickedOutsideForm) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  return (
    <div
      className={styles.noteInputWrapper}
      ref={formRef}
      style={{ backgroundColor: noteData.backgroundColor }}
    >
      {!isExpanded ? (
        <Input
          type={"text"}
          placeholder={"Take a note..."}
          className={styles.collapsedInput}
          onClick={expandInput}
        />
      ) : (
        <div className={styles.expandedInputBox}>
          <div className={styles.header}>
            <Input
              type={"text"}
              placeholder={"Title"}
              className={styles.noteTitle}
              name={"title"}
              value={noteData.title}
              onChange={handleChange}
            />
            <button
              className={`${styles.pinButton} ${
                noteData.isPinned ? styles.pinned : ""
              }`}
              onClick={handleTogglePin}
              title={noteData.isPinned ? "Unpin note" : "Pin note"}
            >
              <Pin size={18} />
            </button>
          </div>
          <textarea
            name="description"
            placeholder="Take a note..."
            className={styles.noteDescription}
            value={noteData.description}
            onChange={handleChange}
            autoFocus
          ></textarea>
          <div className={styles.actions}>
            <div className={styles.leftContainerActions}>
              <button
                className={styles.actionButton}
                onClick={() => setShowColorPalette(!showColorPalette)}
                title="Change background color"
              >
                <Palette size={18} />
              </button>
              {showColorPalette && (
                <div className={styles.colorPalette} ref={paletteRef}>
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={styles.colorSwatch}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      title={`Select ${color}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className={styles.rightContainerActions}>
              <button className={styles.closeButton} onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteForm;
