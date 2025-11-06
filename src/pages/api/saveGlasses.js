import pb from "../../../utils/pb";

export const POST = async ({ request, locals }) => {
    const data = await request.json();

    // Récupère l'utilisateur connecté depuis le middleware
    const user = locals.user;

    try {
        const newRecord = {
            nom: data.nom,
            code_svg: data.code_svg,
            prix: data.prix,
            ancien_prix: data.ancien_prix,
            fabrication_fr: data.fabrication_fr,
            description: data.description,
            user: user?.id || null // Ajoute l'ID de l'utilisateur connecté, ou null si non connecté
        };

        const record = await pb.collection("modeles").create(newRecord);

        return new Response(JSON.stringify({ success: true, id: record.id }), {
            headers: { "Content-Type": "application/json" },
            status: 201
        });
    } catch (error) {
        console.error("Erreur sauvegarde:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
};
