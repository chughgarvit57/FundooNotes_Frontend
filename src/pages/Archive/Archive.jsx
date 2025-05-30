import { Lightbulb } from "lucide-react";
import { useNotes } from "../../context/NotesContext";
import NoteCard from "../../components/NoteCard/NoteCard";
import SnackBar from "../../components/Snackbar/Snackbar";
import { useState } from "react";
import styles from "./Archive.module.scss";

const Archive = () => {
  const { archivedNotes, loading, restoreNote, deleteNote, updateNote, togglePinNote } = useNotes();

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
      await restoreNote(noteId, true);
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

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId, true);
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

  const handleUpdateNote = async (noteId, updatedNote) => {
    try {
      await updateNote(noteId, updatedNote);
      setSnackbarData({
        open: true,
        message: "Note Updated!",
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

  const handleTogglePin = async (noteId, isPinned) => {
    try {
      await togglePinNote(noteId, isPinned);
      setSnackbarData({
        open: true,
        message: isPinned ? "Note Pinned!" : "Note Unpinned!",
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
    <div className={styles.archiveContainer}>
      <div
        className={`${styles.noteCardContainer} ${
          (archivedNotes.length === 0 || archivedNotes == null) && !loading
            ? styles.emptyContainer
            : ""
        }`}
      >
        {archivedNotes.length === 0 && !loading ? (
          <div className={styles.emptyState}>
            <Lightbulb size={48} color="#80868b" className={styles.bulbIcon} />
            <p>No archived notes</p>
          </div>
        ) : (
          archivedNotes.map((note) => (
            <NoteCard
              key={note.noteId}
              note={note}
              onRestore={() => handleRestoreNote(note.noteId)}
              onDelete={() => handleDeleteNote(note.noteId)}
              onUpdate={handleUpdateNote}
              onPin={handleTogglePin}
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

export default Archive;