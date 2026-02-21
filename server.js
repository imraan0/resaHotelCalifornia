import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import https from 'https';
import fs from 'fs';
import session from 'express-session'; // pour cookie session

// Import des routes
import routeAccueil from './routes/routeAccueil.js';
import routeChambres from './routes/routeChambres.js';
import routeClients from './routes/routeClients.js';
import routeReservations from './routes/routeReservations.js';

// Configuration des chemins pour ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application
const app = express();

// Moteur de vue
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors()); // Gestion des erreurs CORS
app.use(express.urlencoded({ extended: true })); // Lecture des formulaires
app.use(express.json()); // Lecture du JSON
app.use(express.static(path.join(__dirname, 'public'))); // Fichiers statiques
app.use(session({
    secret: 'les chaussettes de l\'archiduchesse sont elles sèches archi sèches ?', // Ta fameuse clé de signature
    resave: false, // Évite de sauvegarder la session si elle n'a pas été modifiée (perf)
    saveUninitialized: false, // Ne crée pas de cookie tant qu'on n'a rien stocké dedans (GDPR)
    cookie: { 
        secure: true, // https donc cookie sécurisé
        httpOnly: true, // Empêche le JavaScript client de lire le cookie (Protection XSS)
        maxAge: 1000 * 60 * 60 * 24 // 24 h de durée de vie du cookie
    }
}));


// Routes
// Route racine
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hôtel California - Système de Gestion'
    });
});

// Route pour afficher le formulaire de connexion
app.get('/login', (req, res) => {
    res.render('login', { error: null }); // On envoie error: null pour ne pas afficher d'erreur au début
});

// Routes importées
app.use('/chambres', routeChambres);
app.use('/clients', routeClients);
app.use('/reservations', routeReservations);
app.use('/', routeAccueil);

// 404
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Page non trouvée',
        error: "La page demandée n'existe pas."
    });
});

// Démarrage serveur
//const PORT = 3000;

const PORT_HTTPS = 3001 ;

const sslOptions = {
 key: fs.readFileSync(path.join(__dirname, 'ssl', 'private.key')),
 cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificate.crt'))
};

//app.listen(PORT, () => {
//    console.log(`Serveur démarré sur http://localhost:${PORT}`);
//});

// Serveur HTTPS (port 3001)
const httpsServer = https.createServer(sslOptions, app).listen(PORT_HTTPS, () => {
 console.log(` Serveur HTTPS démarré sur le port ${PORT_HTTPS}`);
});

export default app;
