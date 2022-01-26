import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes);//renombro el active a note
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = formValues;
    const activeId = useRef(note.id);//almacena variable mutable, q no redibuja todo el componente si cambia

    useEffect(() => {//utilizamos este hook para cambiar el estado del useForm. Sino, no modifica la entry al seleccionar otra.
        if( note.id !== activeId.current ) {//esto solo dispara si la noteId cambió
            reset( note );//entonces resetea la id
            activeId.current = note.id//y cambia de nota
        }
    }, [note, reset]);//dependencias

    useEffect(() => {
        dispatch( activeNote( formValues.id, {...formValues} ) );
    }, [formValues,dispatch])

    const handleDelete = () => {
        dispatch( startDeleting(id) );
    }

    return (
        <div className="notes__main-content background-noteScreen">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    className="notes__title-input transparent"
                    type="text"
                    placeholder="Title"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    placeholder="What Happened Today"
                    className="notes__textarea transparent"
                    name="body"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    (note.url) && 
                    (<div className="notes__image">
                        <img
                            src={note.url}
                            alt="image"
                        />
                     </div>)
                }

            </div>

            <button 
                className="btn-delete"
                onClick={ handleDelete }
            >
                Delete
             </button>
        </div>
    )
}
