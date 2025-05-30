import { Lightbulb } from "lucide-react";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useNotes } from "../../context/NotesContext";
import styles from "./Home.module.scss";
import NoteCard from "../../components/NoteCard/NoteCard";
import { useState } from "react";
import SnackBar from "../../components/Snackbar/Snackbar";

const Home = () => {
  const {
    notes,
    loading,
    createNote,
    archiveNote,
    trashNote,
    togglePinNote,
    changeBackgroundColor,
    updateNote,
  } = useNotes();

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseSnackBar = () => {
    setSnackbarData({
      open: false,
      message: "",
      severity: "error",
    });
  };

  const handleSaveNote = async (newNote) => {
    try {
      await createNote(newNote);
      setSnackbarData({
        open: true,
        message: "Note Created!",
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

  const handleArchiveNote = async (noteId) => {
    try {
      await archiveNote(noteId);
      setSnackbarData({
        open: true,
        message: "Note Archived!",
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

  const handleTrashNote = async (noteId) => {
    try {
      await trashNote(noteId);
      setSnackbarData({
        open: true,
        message: "Note Trashed!",
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

  const handleChangeBackgroundColor = async (noteId, backgroundColor) => {
    try {
      await changeBackgroundColor(noteId, backgroundColor);
      setSnackbarData({
        open: true,
        message: "Note Color Updated",
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
        message: "Note Updated",
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

  const pinnedNotes = notes.filter((note) => note.isPinned);
  const otherNotes = notes.filter((note) => !note.isPinned);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.noteFormContainer}>
        <NoteForm onSaveNote={handleSaveNote} />
      </div>
      <div className={styles.noteCardContainer}>
        {(notes.length === 0 || notes == null) && !loading ? (
          <div className={styles.emptyState}>
            <Lightbulb size={48} color="#5f6368" className={styles.bulbIcon} />
            <p>Notes you add appear here</p>
          </div>
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <>
                <h3 className={styles.sectionHeader}>Pinned</h3>
                <div className={styles.noteSection}>
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note.noteId}
                      note={note}
                      onArchive={() => handleArchiveNote(note.noteId)}
                      onTrash={() => handleTrashNote(note.noteId)}
                      onPin={handleTogglePin}
                      onChangeBackgroundColor={handleChangeBackgroundColor}
                      onUpdate={(id, updatedNote) => handleUpdateNote(id, updatedNote)}
                    />
                  ))}
                </div>
              </>
            )}
            {otherNotes.length > 0 && (
              <>
                {pinnedNotes.length > 0 && (
                  <h3 className={styles.sectionHeader}>Others</h3>
                )}
                <div className={styles.noteSection}>
                  {otherNotes.map((note) => (
                    <NoteCard
                      key={note.noteId}
                      note={note}
                      onArchive={() => handleArchiveNote(note.noteId)}
                      onTrash={() => handleTrashNote(note.noteId)}
                      onPin={handleTogglePin}
                      onChangeBackgroundColor={handleChangeBackgroundColor}
                      onUpdate={(id, updatedNote) => handleUpdateNote(id, updatedNote)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <SnackBar
        open={snackbarData.open}
        message={snackbarData.message}
        severity={snackbarData.severity}
        onClose={handleCloseSnackBar}
      />
    </div>
  );
};

export default Home;
