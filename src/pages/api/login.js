import pb from "../../../utils/pb";

export const POST = async ({ request, cookies }) => {
    const { email, password } = await request.json();

    console.log("Tentative de connexion pour:", email);

    try {
        const authData = await pb.collection("users").authWithPassword(email, password);

        console.log("Connexion réussie !");

        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

        return new Response(JSON.stringify({ user: authData.record }), { status: 200 });
    } catch (err) {
        console.error("Erreur d'authentification:", err);

        return new Response(JSON.stringify({
            error: "Identifiants invalides"
        }), {
            status: 401
        });
    }
};
