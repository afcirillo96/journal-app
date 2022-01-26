import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const { name } = useSelector(state => state.auth);

    const handleAddNewEntry = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar background-sidebar">
            <div className="journal__sidebar-navbar ">

                <button 
                    className="btn-name"
                >
                    <img
                        src="https://static.wikia.nocookie.net/darksouls/images/7/78/Item_Estus_Flask.png"
                        alt="image"
                        width="25" height="25"
                    />
                    <p className="mt-3">
                        <span> {name}</span>
                    </p>
                </button>

                <button 
                    className="btn-logout"
                    onClick={ handleLogout }
                > 
                    Logout
                </button>
            </div>
            
            <button 
                className="btn-darksing"
                onClick={ handleAddNewEntry }
            >
                <img
                    src="https://static.wikia.nocookie.net/darksouls/images/8/8a/Darksign_%28DSIII%29.png"
                    alt="image"
                    width="80" height="80"
                />
                <p className="mt-3">
                    NEW ENTRY
                </p>
            </button>

            <JournalEntries />
        </aside>
    )
}
