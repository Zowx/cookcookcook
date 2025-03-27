# CookCookCook 🍳

## Description

CookCookCook est une application web de gestion de recettes de cuisine permettant aux utilisateurs de découvrir, créer
et modifier leurs recettes préférées.

## Équipe- MVE

-   [Matteo PEREIRA](https://github.com/Aairuxul) - @Aairuxul
-   [Valentin RUSSEIL](https://github.com/ValentinRusseil) - @ValentinRusseil
-   [Enzo MORIN](https://github.com/Zowx) - @Zowx

## Structure du Projet

-   `frontend/` : Application front-end développée avec SvelteKit
-   `backend/` : API back-end développée avec Deno

## Prérequis

-   Deno (version recommandée : 2.2.5)
-   MongoDB (version recommandée : ≥ 5.0)
-   npm ou yarn

## Installation et Démarrage

### Installation Complète

1. Cloner le repository

```bash
git clone https://github.com/matteotremblay/projet-1-cookcookcook-matteo-valentin-enzo.git
cd projet-1-cookcookcook-matteo-valentin-enzo
```

2. Installer et démarrer le backend

```bash
cd backend
# Mode développement
deno task dev

# Mode production
deno task run
```

3. Installer et démarrer le frontend

```bash
cd frontend
npm install
npm run dev
```

Pour plus de détails sur chaque partie du projet, consultez les README spécifiques :

-   [Frontend README](./frontend/README.md)
-   [Backend README](./backend/README.md)

## Technologies Utilisées

-   Frontend : SvelteKit, TypeScript, Vite
-   Backend : Deno, Oak, MongoDB

## Fonctionnalités Principales

-   Gestion des recettes (création, modification, suppression)
-   Recherche de recettes
-   Gestion des ingrédients (création, modification, suppression)

## Documentation

Pour plus d'informations sur l'API et l'utilisation de l'application, consultez la documentation dans les dossiers
respectifs.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Lighthouse Metrics

Notre application a été évaluée avec Lighthouse et a obtenu les scores suivants :

-   **Performance**: 89/100
-   **Accessibilité**: 95/100
-   **Meilleures Pratiques**: 100/100
-   **SEO**: 100/100

Ces scores démontrent notre engagement à fournir une application web performante, accessible et optimisée pour les
moteurs de recherche.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.
