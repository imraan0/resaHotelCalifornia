import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

// Ta config BDD
const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'resahotelcalifornia' };

async function createAdmin() {
    const connexion = await mysql.createConnection(dbConfig);
    
    const identifiant = 'admin';
    const motDePasseEnClair = 'azerty123';
    
    // 🔐 La magie : On hache le mot de passe
    const hash = await bcrypt.hash(motDePasseEnClair, 10); // 10 tours de chiffrement

    try {
        await connexion.execute(
            'INSERT INTO utilisateurs (identifiant, password, role) VALUES (?, ?, ?)',
            [identifiant, hash, 'admin']
        );
        console.log('✅ Admin créé avec succès !');
        console.log(`Identifiant utilisateur: ${identifiant}`);
        console.log(`Password: ${motDePasseEnClair}`);
        console.log(`Hash stocké: ${hash}`);
    } catch (error) {
        console.error('Erreur:', error.message);
    }
    process.exit();
}

createAdmin();