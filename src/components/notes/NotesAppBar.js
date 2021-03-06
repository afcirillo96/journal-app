import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';
import moment from 'moment';

export const NotesAppBar = () => {

    const noteDate = moment(new Date()).format("MMMM Do YYYY");
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    const handleSave = () => {
        dispatch( startSaveNote(active) );
    }

    const handlePictureUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }   
    return (
        <div className="notes__appbar background-appBar">
            <span>{noteDate}</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display:'none'}}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn-picture"
                    onClick={ handlePictureUpload }
                >
                    Picture
                </button>

                <button 
                    className="btn-save"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
