import { config, Database, MongoClient } from './deps.ts';
import { IngredientDbo } from './repositories/dbos/ingredient.dbo.ts';
import { RecetteDbo } from './repositories/dbos/recette.dbo.ts';

// Charger les variables d'environnement
const env = await config();

const MONGO_URL = env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = env.DB_NAME || 'cook_db';

console.log('Connexion à MongoDB Atlas...');
console.log(`URL: ${MONGO_URL}`);
console.log(`Base de données: ${DB_NAME}`);

// Lire les données depuis les fichiers
const ingredientsData = JSON.parse(await Deno.readTextFile('./data-mongodb-ingredient.json'));
const recettesData = JSON.parse(await Deno.readTextFile('./data-mongodb-recettes.json'));

console.log(`Données d'ingrédients chargées: ${ingredientsData.length} éléments`);
console.log(`Données de recettes chargées: ${recettesData.length} éléments`);

// Connexion à MongoDB
let client: MongoClient | null = null;
let db: Database | null = null;

try {
    client = new MongoClient();
    await client.connect(MONGO_URL);
    db = client.database(DB_NAME);
    console.log('Connecté à MongoDB Atlas!');

    // Collections
    const ingredientsCollection = db.collection<IngredientDbo>('ingredients');
    const recettesCollection = db.collection<RecetteDbo>('recettes');

    // Vider les collections existantes
    await ingredientsCollection.deleteMany({});
    await recettesCollection.deleteMany({});
    console.log('Collections vidées');

    // Importer les ingrédients
    if (ingredientsData.length > 0) {
        await ingredientsCollection.insertMany(ingredientsData);
        console.log(`${ingredientsData.length} ingrédients importés avec succès!`);
    }

    // Importer les recettes
    if (recettesData.length > 0) {
        await recettesCollection.insertMany(recettesData);
        console.log(`${recettesData.length} recettes importées avec succès!`);
    }

    console.log('Importation terminée avec succès!');
} catch (error) {
    console.error("Erreur lors de l'importation des données:", error);
} finally {
    // Fermer la connexion
    if (client) {
        await client.close();
        console.log('Connexion fermée');
    }
}
