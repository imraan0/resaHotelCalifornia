# ResaHotelCalifornia

Une application web interne et sécurisée dédiée à la gestion hôtelière, permet aux employés de l'hôtel de gérer efficacement les réservations, la clientèle et l'état des chambres.

## Développeurs
**Imran ->** Partie chambre  
**Khaled ->** Partie clients  
**Doha ->** Partie reservations


## Fonctionnalités Principales

* **Authentification Sécurisée :** Système de connexion réservé aux employés (cookie-sessions) fonctionnant exclusivement sous protocole HTTPS.
* **Gestion des Réservations :** Création, modification, attribution aux clients et suppression.
* **Gestion des Clients :** Création et modification des profils clients
* **Gestion des Chambres :** Interface d'administration pour l'état et le suivi des chambres.
* **Sécurité Renforcée :** Mots de passe hachés (bcrypt) et protection contre les failles XSS.

## Technologies Utilisées

* **Backend :** Node.js, Express.js
* **Base de données :** MySQL
* **Frontend :** EJS, HTML5, CSS3, Bootstrap 5
* **Sécurité :** express-session, bcrypt, Module natif `https`

## Prérequis

Listes de choses à avoir installé :
* Node.js (v16 ou supérieur)
* Un serveur MySQL (ex: XAMPP, WAMP, ou Docker)
* Des certificats SSL locaux pour le HTTPS (fichiers `private.key` et `certificate.crt`)

## Installation & Démarrage

### 1. Cloner le projet et installer les dépendances
git clone <https://github.com/imraan0/resaHotelCalifornia.git>

npm install

### 2. Configuration de la Base de Données
Créez une base de données nommée `resahotelcalifornia` dans MySQL.
Exécutez le script SQL suivant pour créer les tables :


`sql`  

**-- 1. Table utilisateurs**  

CREATE TABLE utilisateurs (  
    id INT AUTO_INCREMENT PRIMARY KEY,  
    identifiant VARCHAR(50) NOT NULL UNIQUE,  
    password VARCHAR(255) NOT NULL,  
    role VARCHAR(50) DEFAULT 'employe',  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
)

**-- 2. Table des Clients**    

CREATE TABLE clients (  
    idClient INT AUTO_INCREMENT PRIMARY KEY,  
    nom VARCHAR(100) NOT NULL,  
    prenom VARCHAR(100) NOT NULL,  
    telephone VARCHAR(20),  
    email VARCHAR(150)  
);

**-- 3. Table des Chambres**  

CREATE TABLE chambres (  
    idChambre INT AUTO_INCREMENT PRIMARY KEY,  
    numero INT NOT NULL,  
    capacite INT NOT NULL,  
    disponibilite TINYINT(1) DEFAULT 1 
);  

**-- 4. Table des Réservations (avec les liens vers Clients et Chambres)**  

CREATE TABLE reservations (  
    idReservation INT AUTO_INCREMENT PRIMARY KEY,  
    idClient INT NOT NULL,  
    idChambre INT NOT NULL,  
    dateDebut DATE NOT NULL,  
    dateFin DATE NOT NULL,  

    
Contraintes de Clés Étrangères (Foreign Keys)  
CONSTRAINT fk_reservation_client   
FOREIGN KEY (idClient) REFERENCES clients(idClient)   
ON DELETE CASCADE, -- Si on supprime un client, ses réservations  sautent aussi  
        
CONSTRAINT fk_reservation_chambre   
FOREIGN KEY (idChambre) REFERENCES chambres(idChambre)   
ON DELETE CASCADE  
);

### 3. Configuration SSL (HTTPS)
Créez un dossier `ssl` à la racine du projet et placez-y vos certificats :
* `ssl/private.key`
* `ssl/certificate.crt`

### 4. Création du compte Administrateur Initial
Pour des raisons de sécurité, l'application ne possède pas de formulaire d'inscription public. Le premier administrateur doit être créé via notre script de "seed" qui hachera correctement le mot de passe :

\`\`\`bash
node seedAdmin.js
\`\`\`
*(Identifiant par défaut : admin / Mot de passe : azerty123 - **À changer en production !**)*

### 5. Lancer le serveur
**bash : node server.js**