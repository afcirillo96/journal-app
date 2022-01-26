/**

* @jest-environment node

*/
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { disableNetwork } from "firebase/firestore"; 
import { doc, deleteDoc, getDoc } from "@firebase/firestore";
import * as fs from 'fs';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg';
    })
}))



 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: 'NNadTd5WDxZe3t6horTB',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

let store = mockStore(initState);


describe('Pruebas con las acciones de notes', () => {

    beforeEach( () => {

        store = mockStore(initState);

    });


    test('debe de crear una nueva nota startNewNote', async() => {
        
        await store.dispatch( startNewNote() );
 
        const actions = store.getActions();
 
        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
 
        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
 
        const docId = actions[0].payload.id;
        const noteRef = doc(db, `/TESTING/journal/notes/${docId}`);
        await deleteDoc(noteRef);
 
    });
    

    test('startLoadingNotes debe cargar las notas', async() => {
        
        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number),
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );


    })


    test('startSaveNote debe actualizar la nota', async() => {
        const note = {
            id: 'NNadTd5WDxZe3t6horTB',
            title: 'titulo',
            body: 'body'
        };
 
        await store.dispatch(startSaveNote(note));    
        const actions = store.getActions();      
        expect(actions[0].type).toBe(types.notesUpdated);  
          
        const getDocumentRef = await getDoc(doc(db, "TESTING", "journal", "notes", `${note.id}`));  
        expect(getDocumentRef.data().title).toBe(note.title);
    })
    
    test('startUploading debe de actualizar la url del entry', async () => {
        fileUpload.mockReturnValue('https://hola-mundo.com/cosa.jpg');
        fs.writeFileSync('foto.jpg', '');
     
        const file = fs.readFileSync('foto.jpg');
        await store.dispatch(startUploading(file));
     
        const docRef = doc( db, '/TESTING/journal/notes/NNadTd5WDxZe3t6horTB' );
        const docRecived = await getDoc( docRef );
        
        expect(docRecived.data().url).toBe('https://hola-mundo.com/cosa.jpg');
       })
    

    
})