import pb from "../../../utils/pb";
import { Collections } from "../../../utils/pocketbase-types";

export async function POST({ request }) {
    const data = await request.json();
    console.log("Received data to save:", data);

    try {
        // Prépare les données pour PocketBase selon le schéma de ta collection
        const recordData = {
            nom: data.name || "Sans nom", // Le nom du modèle
            code_svg: data.code_svg || "", // Le code SVG généré
            chat_history: data.chat_history || [], // Historique de conversation (array)
            user: data.user || null, // ID de l'utilisateur (relation)
        };

        // Crée l'enregistrement dans la collection modele_ia
        const record = await pb
            .collection("ModeleIa")
            .create(recordData);

        console.log("SVG saved with ID:", record.id);

        return new Response(
            JSON.stringify({
                success: true,
                id: record.id,
                record: record
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 201
            }
        );
    } catch (error) {
        console.error("Error saving SVG:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message || "Erreur lors de la sauvegarde"
            }),
            {
                headers: { "Content-Type": "application/json" },
                status: 500,
            }
        );
    }
}
