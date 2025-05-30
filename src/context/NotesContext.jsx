import { createContext, useContext, useEffect, useState } from "react";
import useAPI from "../hooks/useAPI.js";
import { useAuth } from "../context/AuthContext.jsx";

export const NotesContext = createContext(null);

export const NotesContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { loading, error, request } = useAPI();

  const fetchNotes = async () => {
    try {
      setIsRefreshing(true);
      const response = await request({
        method: "GET",
        url: "/api/Notes/GetAllNotes",
        data: null,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const normalizedNotes = response.data.map((note) => ({
        ...note,
        isPinned: !!note.pin,
      }));
      const filteredNotes = normalizedNotes.filter(
        (note) => !note.trash && !note.archive
      );
      setNotes(filteredNotes);
      setArchivedNotes(
        normalizedNotes.filter((note) => note.archive && !note.trash)
      );
      setTrashedNotes(
        normalizedNotes.filter((note) => note.trash && !note.archive)
      );
    } catch (error) {
      return error.message;
    } finally {
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [user]);

  const createNote = async (note) => {
    try {
      const response = await request({
        method: "POST",
        url: "/api/Notes/CreateNotes",
        data: note,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setNotes((prev) => [response.data, ...prev]);
    } catch (error) {
      return error.message;
    }
  };

  const archiveNote = async (noteId) => {
    const formData = new FormData();
    formData.append("noteId", noteId);
    try {
      await request({
        method: "PATCH",
        url: "/api/Notes/Archive",
        data: formData,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.noteId !== noteId)
      );
      setArchivedNotes((prev) => [
        ...prev,
        notes.find((note) => note.noteId === noteId),
      ]);
    } catch (error) {
      return error.message;
    }
  };

  const trashNote = async (noteId) => {
    const formData = new FormData();
    formData.append("noteId", noteId);
    try {
      await request({
        method: "PATCH",
        url: "/api/Notes/TrashNote",
        data: formData,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.noteId !== noteId)
      );
      setTrashedNotes((prev) => [
        ...prev,
        notes.find((note) => note.noteId === noteId),
      ]);
    } catch (error) {
      return error.message;
    }
  };

  const restoreNote = async (noteId, fromArchive = false) => {
    const formData = new FormData();
    formData.append("noteId", noteId);
    try {
      await request({
        method: "PATCH",
        url: "/api/Notes/RestoreNote",
        data: formData,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const source = fromArchive ? archivedNotes : trashedNotes;
      const note = source.find((note) => note.noteId === noteId);
      setNotes((prev) => [note, ...prev]);
      if (fromArchive) {
        setArchivedNotes((prev) =>
          prev.filter((note) => note.noteId !== noteId)
        );
      } else {
        setTrashedNotes((prev) =>
          prev.filter((note) => note.noteId !== noteId)
        );
      }
    } catch (error) {
      return error.message;
    }
  };

  const deleteNote = async (title, fromArchive = false) => {
    const formData = new FormData();
    formData.append("title", title);
    try {
      await request({
        method: "DELETE",
        url: "/api/Notes/DeleteNote",
        data: formData,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      if (fromArchive) {
        setArchivedNotes((prev) => prev.filter((note) => note.title !== title));
      } else {
        setTrashedNotes((prev) => prev.filter((note) => note.title !== title));
      }
    } catch (error) {
      console.error("Error deleting note:", error.message);
      throw error;
    }
  };

  const togglePinNote = async (noteId, isPinned) => {
    const formData = new FormData();
    formData.append("noteId", noteId);
    formData.append("isPinned", isPinned);
    try {
      const response = await request({
        method: "PATCH",
        url: "/api/Notes/PinUnpin",
        data: formData,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const updatedPinStatus = response.data;

      if (notes.some((note) => note.noteId === noteId)) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.noteId === noteId
              ? { ...note, isPinned: updatedPinStatus }
              : note
          )
        );
      } else if (archivedNotes.some((note) => note.noteId === noteId)) {
        setArchivedNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.noteId === noteId
              ? { ...note, isPinned: updatedPinStatus }
              : note
          )
        );
      } else if (trashedNotes.some((note) => note.noteId === noteId)) {
        setTrashedNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.noteId === noteId
              ? { ...note, isPinned: updatedPinStatus }
              : note
          )
        );
      }
    } catch (error) {
      console.error("Error toggling pin:", error.message);
      throw error;
    }
  };

  const changeBackgroundColor = async (noteId, backgroundColor) => {
    const formData = new FormData();
    formData.append("noteId", noteId);
    formData.append("backgroundColor", backgroundColor);
    try {
      const response = await request({
        method: "PATCH",
        url: "/api/Notes/BackgroundColorNote",
        data: formData,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const updatedColor = response.data;
      if (notes.some((note) => note.noteId === noteId)) {
        setNotes((prev) =>
          prev.map((note) =>
            note.noteId === noteId
              ? { ...note, backgroundColor: updatedColor }
              : note
          )
        );
      } else if (archivedNotes.some((note) => note.noteId === noteId)) {
        setArchivedNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.noteId === noteId
              ? { ...note, backgroundColor: updatedColor }
              : note
          )
        );
      } else if (trashedNotes.some((note) => note.noteId === noteId)) {
        setTrashedNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.noteId === noteId
              ? { ...note, backgroundColor: updatedColor }
              : note
          )
        );
      }
    } catch (error) {
      return error.message;
    }
  };

  const updateNote = async (noteId, updatedNote) => {
    try {
      const response = await request({
        method: "PUT",
        url: `/api/Notes/UpdateNote?noteId=${noteId}`,
        data: updatedNote,
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const updatedNoteData = response.data;
      if (notes.some((note) => note.noteId === noteId)) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.noteId === noteId ? { ...note, ...updatedNoteData } : note
          )
        );
      } else if (archivedNotes.some((note) => note.noteId === noteId)) {
        setArchivedNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.noteId === noteId ? { ...note, ...updatedNoteData } : note
          )
        );
      }
    } catch (error) {
      return error.message;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        createNote,
        archiveNote,
        trashNote,
        archivedNotes,
        trashedNotes,
        deleteNote,
        restoreNote,
        togglePinNote,
        changeBackgroundColor,
        isRefreshing,
        fetchNotes,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
