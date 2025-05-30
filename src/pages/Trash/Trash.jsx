import { Lightbulb } from "lucide-react";
import { useNotes } from "../../context/NotesContext";
import NoteCard from "../../components/NoteCard/NoteCard";
import SnackBar from "../../components/Snackbar/Snackbar";
import { useState } from "react";
import styles from "./Trash.module.scss";

const Trash = () => {
  const { trashedNotes, loading, restoreNote, deleteNote } = useNotes();

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackBar = () => {
    setSnackbarData((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleRestoreNote = async (noteId) => {
    try {
      await restoreNote(noteId, false);
      setSnackbarData({
        open: true,
        message: "Note Restored!",
        severity: "success",
      });
    } catch (error) {
      setSnackbarData({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleDeleteNote = async (title) => {
    try {
      await deleteNote(title, false);
      setSnackbarData({
        open: true,
        message: "Note Deleted Permanently!",
        severity: "success",
      });
    } catch (error) {
      setSnackbarData({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  return (
    <div className={styles.trashContainer}>
      <div
        className={`${styles.noteCardContainer} ${
          (trashedNotes.length === 0 || trashedNotes == null) && !loading
            ? styles.emptyContainer
            : ""
        }`}
      >
        {trashedNotes.length === 0 && !loading ? (
          <div className={styles.emptyState}>
            <Lightbulb size={48} color="#80868b" className={styles.bulbIcon} />
            <p>No trashed notes</p>
          </div>
        ) : (
          trashedNotes.map((note) => (
            <NoteCard
              key={note.noteId}
              note={note}
              onRestore={() => handleRestoreNote(note.noteId)}
              onDelete={() => handleDeleteNote(note.title)}
            />
          ))
        )}
      </div>
      <SnackBar
        open={snackbarData.open}
        handleClose={handleCloseSnackBar}
        severity={snackbarData.severity}
        message={snackbarData.message}
      />
    </div>
  );
};

export default Trash;
