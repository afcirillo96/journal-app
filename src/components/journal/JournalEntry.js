import React from 'react';
import moment from 'moment';
import { activeNote } from '../../actions/notes';
import { useDispatch } from 'react-redux';

//CREAR ITEMS Q ME AYUDENA VER INFO DE LAS ENTRADAS QUE TENGA
export const JournalEntry = ({ id, date, title, body, url }) => {

    const noteDate = moment(date);

    const dispatch = useDispatch();//udeDispatch sirve para hacer dispatch de acciones

    const handleEntryClick = () =>{
        dispatch( 
            activeNote(id, {
                date, title, body, url
            })
        );
    }

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={handleEntryClick}
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        //backgroundImage: 'url(https://pbs.twimg.com/profile_images/1277025005960716288/A4-rMCFM_400x400.jpg)'
                        backgroundImage: `url(${ url })`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>

                <p className="journal__entry-content">
                    {body}
                </p>

            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>
        </div>
    )
}
