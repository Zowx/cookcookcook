# Guide de déploiement de CookCookCook

Ce guide explique comment déployer l'application CookCookCook (frontend et backend) sur Render.

## Prérequis

-   Un compte [Render](https://render.com/)
-   Un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) pour la base de données

## Configuration de la base de données MongoDB Atlas

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) si vous n'en avez pas un
2. Créez un nouveau cluster (le plan gratuit est suffisant pour commencer)
3. Dans "Database Access", créez un nouvel utilisateur avec les permissions de lecture/écriture
4. Dans "Network Access", ajoutez une entrée pour permettre l'accès depuis n'importe où (0.0.0.0/0)
5. Dans "Databases", cliquez sur "Connect" sur votre cluster, puis "Connect your application" et copiez l'URL de
   connexion

## Déploiement sur Render

### Option 1: Déploiement Blueprint (recommandé)

1. Connectez-vous à votre compte Render
2. Dans le tableau de bord, cliquez sur "New +" puis "Blueprint"
3. Connectez votre dépôt GitHub contenant le projet CookCookCook
4. Render détectera automatiquement le fichier `render.yaml` et configurera les services
5. Configurez les variables d'environnement requises :
    - Pour le service backend, définissez `MONGO_URL` avec l'URL de connexion MongoDB
    - Pour le service backend, définissez `DB_NAME` avec le nom de votre base de données
6. Cliquez sur "Apply" pour déployer les services

### Option 2: Déploiement manuel

Si vous préférez configurer manuellement les services :

#### Déploiement du backend

1. Dans le tableau de bord Render, cliquez sur "New +" puis "Web Service"
2. Connectez votre dépôt GitHub
3. Nommez votre service (ex: "cookcookcook-backend")
4. Sélectionnez "Deno" comme Runtime
5. Définissez la commande de build : `cd backend && deno cache server.ts`
6. Définissez la commande de démarrage : `cd backend && deno task run`
7. Ajoutez les variables d'environnement :
    - `MONGO_URL` : URL de connexion MongoDB Atlas
    - `DB_NAME` : Nom de votre base de données
    - `ALLOWED_ORIGINS` : URL de votre frontend (à remplir après avoir déployé le frontend)
8. Cliquez sur "Create Web Service"

#### Déploiement du frontend

1. Dans le tableau de bord Render, cliquez sur "New +" puis "Static Site"
2. Connectez votre dépôt GitHub
3. Nommez votre service (ex: "cookcookcook-frontend")
4. Définissez la commande de build : `cd frontend && npm install && npm run build`
5. Définissez le répertoire de publication : `frontend/.svelte-kit/output`
6. Ajoutez la variable d'environnement :
    - `VITE_API_URL` : URL de votre backend Render (ex: https://cookcookcook-backend.onrender.com)
7. Cliquez sur "Create Static Site"

## Après le déploiement

1. Une fois les deux services déployés, récupérez l'URL du frontend
2. Retournez aux paramètres du service backend et ajoutez cette URL dans la variable d'environnement `ALLOWED_ORIGINS`
3. Redéployez le backend pour prendre en compte cette modification

Votre application CookCookCook est maintenant déployée et accessible en ligne !

## Maintenance et mises à jour

Chaque fois que vous poussez des modifications sur la branche principale de votre dépôt GitHub, Render redéploiera
automatiquement vos services.

Pour les modifications de la base de données, assurez-vous de mettre à jour les modèles et les schémas dans le code
avant de déployer.
