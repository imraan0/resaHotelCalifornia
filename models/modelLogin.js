import connexion from '../config/connexion.js';

// Fonction pour trouver un utilisateur par son identifiant

class ModelLogin { 
    constructor(data) { // Constructeur
        this.id = data.id;
        this.identifiant = data.identifiant;
        this.password = data.password;
    }

    static async findByIdentifiant(identifiant) {
        try {
            const [rows] = await connexion.execute(
                'SELECT * FROM utilisateurs WHERE identifiant = ?', 
                [identifiant]
            );
            return rows.length > 0 ? new ModelLogin(rows[0]) : null;
        }
        catch (error) {
            throw new Error('Erreur lors de la récupération de l\'utilisateur: ' + error.message);
        }
    }
}

export default ModelLogin;