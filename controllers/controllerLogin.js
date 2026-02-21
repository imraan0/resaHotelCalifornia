import bcrypt from 'bcrypt'; // Pour le hachage des mots de passe
import modelLogin from '../models/modelLogin.js'; 

const login = async (req, res) => {
    try {
        
        const { identifiant, password } = req.body;

        const utilisateur = await modelLogin.findByIdentifiant(identifiant);
        if (!utilisateur) {

            return res.render('login', { error: 'Identifiant ou mot de passe incorrect' });
        }

        // comparer le texte mdp avec le hash en BDD
        const match = await bcrypt.compare(password, utilisateur.password);

        if (match) {
            //remplir la session si ok
            req.session.user = {
                id: utilisateur.id,
                email: utilisateur.email,
                role: utilisateur.role
            };
            
            // On force la sauvegarde pour être sûr avant de rediriger
            req.session.save((err) => {
                if (err) console.log(err);
                // 5. REDIRECTION
                return res.redirect('/'); 
            });

        } else {
            // Mot de passe faux
            return res.render('login', { error: 'identifiant ou mot de passe incorrect' });
        }

    } catch (error) {
        console.error(error);
        res.render('login', { error: 'Une erreur technique est survenue.' });
    }
};

export default { login };