/*
    {
        notes: [],
        active: null,
        active: {
            id: 'NJANGKAENGKNKKRHLNL4NLNW4JNYJ'
            title: '',
            body: '',
            imageUrl: '',
            date: 1541353155,
        }
    }
*/

import { startDeleting } from "../actions/notes";
import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = ( state = initialState, action) => {

    switch (action.type) {
        
        case types.notesActive:
            return {
                ...state,//siempre sebemos retornar el state
                active: {//recibe el arreglo de active
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }
    
        case types.notesLoad:
            return {
                ...state,//siempre sebemos retornar el state
                notes: [...action.payload]//recibe el arreglo de notes
            }

        case types.notesUpdated:
            return {
                ...state,//siempre sebemos retornar el state
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id != action.payload )
            }
            
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}