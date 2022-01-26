import { db } from "../firebase/firebase-config";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";

//Creamos la nueva nota
export const startNewNote = () => {
    return async( dispatch, getState ) => {//useState es parecido al useSelector

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        /*const doc = await db.collection(`${ uid }/journal/notes`).add( newNote )  //firebase v8
        console.log(doc)*/
        const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"),{//firebase v9
            title: '',
            body: '',
            date: new Date().getTime()
        });

        //mandamos la nota al dispatch...
        dispatch( activeNote( doc.id, newNote ) )
        dispatch( addNewNote( doc.id, newNote ) )
    }
}

///activamos la nota
export const activeNote = ( id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    }
});

export const addNewNote = (id,note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note,
    }
});

//cargamos las notas
export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes,
});

//actualizar la nota
export const startSaveNote = ( note ) => {
    return async(dispatch, getState) => {
 
        const { uid } = getState().auth
 
        if ( !note.url ) {//por si acaso. para no tener error undefined
            delete note.url
        }
 
        const noteToFirestore = { ...note };
        delete noteToFirestore.id
 
        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef,noteToFirestore);

        dispatch( refreshNote( note.id, noteToFirestore ) );
        Swal.fire({
            title: 'Saved!',
            imageUrl: 'http://ds3-cinders.wdfiles.com/local--files/image-sets%3Agestures/rejoice.png',
            imageWidth: 175,
            imageHeight: 175,
            imageAlt: 'Custom image',
        });
    }
};

//refresca la Sidebar
export const refreshNote = (id,note) => ({
    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active:activeNote} = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please Wait...',
            imageUrl: 'http://darksouls3.wdfiles.com/local--files/image-sets%3Agestures/rest.png',
            imageWidth: 175,
            imageHeight: 175,
            imageAlt: 'Custom image',
            allowOutsideClick: false,
        });

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        dispatch( startSaveNote( activeNote ) )

        Swal.close();
    }
}

export const startDeleting = (id)=>{
    return async(dispatch, getState) => {
 
        const uid = getState().auth.uid;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef);
 
        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
});


export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
});