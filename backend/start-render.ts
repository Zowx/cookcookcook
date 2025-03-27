// Script de démarrage pour Render
import { config, MongoClient } from './deps.ts';
import { IngredientDbo } from './repositories/dbos/ingredient.dbo.ts';
import { RecetteDbo } from './repositories/dbos/recette.dbo.ts';

// Fonction pour vérifier et initialiser la base de données si nécessaire
async function initializeDatabase() {
    try {
        console.log('Initialisation de la base de données pour Render...');

        // Charger les variables d'environnement
        const env = await config();
        const MONGO_URL = env.MONGO_URL || '';
        const DB_NAME = env.DB_NAME || 'cook_db';

        if (!MONGO_URL) {
            console.error('MONGO_URL non défini ! Impossible de se connecter à la base de données.');
            return;
        }

        console.log(`Tentative de connexion à MongoDB (${DB_NAME})...`);
        console.log(`URL: ${MONGO_URL.replace(/:[^:@]+@/, ':****@')}`);

        // Connexion à MongoDB
        const client = new MongoClient();
        await client.connect(MONGO_URL);
        console.log('✅ Connexion à MongoDB établie !');

        const db = client.database(DB_NAME);

        // Vérifier si les collections existent et ont des données
        const ingredientsCollection = db.collection<IngredientDbo>('ingredients');
        const recettesCollection = db.collection<RecetteDbo>('recettes');

        const ingredientsCount = await ingredientsCollection.countDocuments();
        const recettesCount = await recettesCollection.countDocuments();

        console.log(`Collections existantes - Ingrédients: ${ingredientsCount}, Recettes: ${recettesCount}`);

        // Si les collections sont vides, initialiser avec les données de démo
        if (ingredientsCount === 0 || recettesCount === 0) {
            console.log('Collections vides détectées. Initialisation avec les données de démo...');

            try {
                // Charger les données depuis les fichiers JSON
                const ingredientsData = JSON.parse(await Deno.readTextFile('./data-mongodb-ingredient.json'));
                const recettesData = JSON.parse(await Deno.readTextFile('./data-mongodb-recettes.json'));

                // Insérer les données
                if (ingredientsCount === 0 && ingredientsData.length > 0) {
                    await ingredientsCollection.insertMany(ingredientsData);
                    console.log(`✅ ${ingredientsData.length} ingrédients importés avec succès !`);
                }

                if (recettesCount === 0 && recettesData.length > 0) {
                    await recettesCollection.insertMany(recettesData);
                    console.log(`✅ ${recettesData.length} recettes importées avec succès !`);
                }

                console.log('✅ Initialisation des données terminée !');
            } catch (error) {
                console.error("Erreur lors de l'initialisation des données:", error);
            }
        } else {
            console.log('✅ Les collections contiennent déjà des données, aucune initialisation nécessaire.');
        }

        // Fermer la connexion
        await client.close();
        console.log('Connexion fermée');
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la base de données:", error);
    }
}

// Initialiser la base de données puis démarrer le serveur
await initializeDatabase();
console.log('Démarrage du serveur principal...');

// Importer et exécuter le serveur principal
await import('./server.ts');
