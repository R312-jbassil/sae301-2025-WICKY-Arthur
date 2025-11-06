// saveGlasses.js (version sans TypeScript)
import pb from "../../../utils/pb";

export const POST = async ({ request }) => {
    const data = await request.json();

    try {
        const newRecord = {
            nom: data.nom,
            code_svg: data.code_svg,
            prix: data.prix,
            ancien_prix: data.ancien_prix,
            fabrication_fr: data.fabrication_fr,
            description: data.description
        };

        const record = await pb.collection("modeles").create(newRecord);

        return new Response(JSON.stringify({ success: true, id: record.id }), {
            headers: { "Content-Type": "application/json" },
            status: 201
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
};
