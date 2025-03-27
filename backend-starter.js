const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const DENO_VERSION = '1.38.3';

// Fonction pour vérifier si Deno est installé
function isDenoInstalled() {
    try {
        const output = execSync('which deno || echo "not found"').toString().trim();
        return output !== 'not found';
    } catch (error) {
        return false;
    }
}

// Fonction pour installer Deno
function installDeno() {
    console.log(`🦕 Installation de Deno v${DENO_VERSION}...`);

    // Créer un dossier temporaire pour les binaires
    const binDir = path.join(__dirname, '.deno-bin');
    if (!fs.existsSync(binDir)) {
        fs.mkdirSync(binDir, { recursive: true });
    }

    try {
        // Télécharger le script d'installation et l'exécuter
        execSync('curl -fsSL https://deno.land/x/install/install.sh | sh', {
            stdio: 'inherit',
            env: {
                ...process.env,
                DENO_INSTALL: binDir,
            },
        });

        // Ajouter Deno au PATH
        process.env.PATH = `${binDir}/bin:${process.env.PATH}`;
        console.log(`✅ Deno v${DENO_VERSION} installé avec succès!`);

        // Vérifier l'installation
        const version = execSync(`${binDir}/bin/deno --version`).toString();
        console.log(`Version installée: ${version}`);

        return `${binDir}/bin/deno`;
    } catch (error) {
        console.error("❌ Erreur lors de l'installation de Deno:", error.message);
        process.exit(1);
    }
}

// Fonction pour exécuter le backend
function startDenoBackend(denoPath) {
    console.log('\n📡 Démarrage du backend avec Deno...');

    // Aller dans le répertoire backend
    process.chdir(path.join(__dirname, 'backend'));

    try {
        // Vérifier les variables d'environnement essentielles
        if (!process.env.MONGO_URL) {
            console.warn('⚠️  AVERTISSEMENT: Variable MONGO_URL non définie');
        }

        // Exécuter le script de démarrage
        console.log('Lancement du script start-render.ts...');
        execSync(`${denoPath} run --allow-net --allow-read --allow-env --allow-write start-render.ts`, {
            stdio: 'inherit',
            env: process.env,
        });
    } catch (error) {
        console.error('❌ Erreur lors du démarrage du backend:', error.message);
        process.exit(1);
    }
}

// Fonction principale
function main() {
    console.log('🚀 Initialisation du déploiement CookCookCook sur Render...');

    // Afficher les variables d'environnement (sans les valeurs sensibles)
    console.log("\n📋 Variables d'environnement détectées:");
    console.log(`- MONGO_URL: ${process.env.MONGO_URL ? '✓ définie' : '✗ non définie'}`);
    console.log(`- DB_NAME: ${process.env.DB_NAME ? '✓ définie' : '✗ non définie'}`);
    console.log(`- JWT_SECRET: ${process.env.JWT_SECRET ? '✓ définie' : '✗ non définie'}`);
    console.log(`- ALLOWED_ORIGINS: ${process.env.ALLOWED_ORIGINS ? '✓ définie' : '✗ non définie'}`);

    // Installer ou utiliser Deno
    const denoPath = isDenoInstalled() ? 'deno' : installDeno();

    // Démarrer le backend
    startDenoBackend(denoPath);
}

// Exécuter le script
main();
