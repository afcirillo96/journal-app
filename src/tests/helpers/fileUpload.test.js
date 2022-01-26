import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';



cloudinary.config({ 
    cloud_name: 'dx0pryfzn', 
    api_key: '422916932349318', 
    api_secret: 'gM_vs-URpSAyA3xV-PsoTg8xF3M' 
});

describe('Pruebas en fileUpload', () => {
    
    test('debe de cargar un archivo y retornar el URL', async() => {
        
        const resp = await fetch('https://static.bandainamcoent.eu/high/dark-souls/brand-setup/ds3_thumb_brand_624x468.jpg')
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect( typeof url).toBe('string');

        //Borrar imagen por ID
        const segments = url.split('/');
        const imageId = segments[ segments.length -1].replace('.jpg','');

        //cloudinary.v2.api.delete_resources(imageId, {}, ()=>{
        await cloudinary.api.delete_resources(imageId, {}, () => {
            done();
        });
    });


    test('debe de retornar un error', async() => {

        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect( url ).toBe( null );

        
    })
    
    


})


