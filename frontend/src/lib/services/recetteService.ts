import type { Recette, RecetteAdd } from '$lib/types/recette';
import { error } from '@sveltejs/kit';

const API_URL = 'http://localhost:8000';
const DEFAULT_IMAGE = `https://picsum.photos/300/200?random=1`;

export class RecetteService {
    // Obtenir l'URL de l'image par défaut
    static getDefaultImageUrl(): string {
        return DEFAULT_IMAGE;
    }

    // Récupérer une recette par son ID
    static async getRecette(fetch: typeof window.fetch, id: string): Promise<Recette> {
        const response = await fetch(`${API_URL}/recettes/${id}`);

        if (!response.ok) {
            throw error(404, 'Recette non trouvée');
        }

        const recette = await response.json();
        recette.image = recette.image || DEFAULT_IMAGE;
        return recette;
    }

    // Rechercher des recettes avec un terme de recherche optionnel
    static async getRecettes(fetch: typeof window.fetch, query: string = ''): Promise<Recette[]> {
        try {
            const url = query ? `${API_URL}/recettes/search?q=${encodeURIComponent(query)}` : `${API_URL}/recettes`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des recettes');
            }

            const data = await response.json();
            // Ajouter l'image par défaut aux recettes qui n'en ont pas
            return (Array.isArray(data) ? data : []).map((recette) => ({
                ...recette,
                image: recette.image || DEFAULT_IMAGE,
            }));
        } catch (error) {
            console.error('Erreur lors de la récupération des recettes:', error);
            return [];
        }
    }

    // Supprimer une recette par son ID
    static async deleteRecette(fetch: typeof window.fetch, id: string): Promise<void> {
        const response = await fetch(`${API_URL}/recettes/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de la recette');
        }
    }

    // Mettre à jour une recette
    static async updateRecette(fetch: typeof window.fetch, id: string, recette: Recette): Promise<void> {
        const response = await fetch(`${API_URL}/recettes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recette),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la recette');
        }
    }

    static async addRecette(fetch: typeof window.fetch, recette: RecetteAdd): Promise<Response> {
        const response = await fetch(`${API_URL}/recettes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recette),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de la recette");
        }

        return response;
    }
}
