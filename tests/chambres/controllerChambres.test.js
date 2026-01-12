import { describe, it, expect, vi, beforeEach } from 'vitest'
import ControllerChambres from '../../controllers/controllerChambres.js'
import modelChambres from '../../models/modelChambres.js';
vi.mock('../../models/modelChambres.js'); //pour ne pas impacter la vraie bdd


describe('vérifier le controleur chambres', () => {
    //variables test
    let req, res;

    // Avant chaque test, on remet les compteurs à zéro
    beforeEach(() => {
        req = { body: {} }; //requête vide
        res = {
            render: vi.fn(),   // Espions
            redirect: vi.fn(),
            status: vi.fn().mockReturnThis(), // Pour pouvoir faire res.status().send()
            send: vi.fn()
        };
        // On nettoie les espions du modèle
        vi.clearAllMocks();
    });

    it ('doit retourner la liste des chambres', async () => {
        const faussesChambres = [
            { idChambre: 1, numero: 101, capacite: 2, disponibilite: 1 },
            { idChambre: 2, numero: 102, capacite: 3, disponibilite: 0 }
        ];

        //dire au faux modele que c'est OK
        modelChambres.findall.mockResolvedValue(faussesChambres);

        await ControllerChambres.listChambres (req, res);
        
        //verifie que res render donne bien list 
        expect(res.render).toHaveBeenCalledWith(
            'chambres/liste',
            
            //On vérifie le 2ème argument qui est les données
            expect.objectContaining({
                chambres: faussesChambres 
            })
        );
    });

    
});