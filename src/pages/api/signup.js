import pb from "../../../utils/pb";

export const POST = async ({ request, cookies }) => {
    try {
        const { email, password, passwordConfirm, nom, prenom } = await request.json();

        // Vérification que les mots de passe correspondent
        if (password !== passwordConfirm) {
            return new Response(
                JSON.stringify({ message: "Les mots de passe ne correspondent pas" }),
                { status: 400 }
            );
        }

        // Création du compte utilisateur
        const data = {
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            nom: nom,
            prenom: prenom,
        };

        const newUser = await pb.collection("users").create(data);
        console.log("Utilisateur créé:", newUser);

        // Authentifie l'utilisateur immédiatement après l'inscription
        const authData = await pb.collection("users").authWithPassword(email, password);
        console.log("Utilisateur authentifié:", authData.record.email);

        // Enregistre le token d'authentification dans un cookie sécurisé
        cookies.set("pb_auth", pb.authStore.exportToCookie(), {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true, // Important en production avec HTTPS
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

        return new Response(JSON.stringify({ user: authData.record }), { status: 200 });
    } catch (err) {
        console.error("Erreur d'inscription:", err);

        // Gestion des erreurs spécifiques de PocketBase
        if (err.response?.data) {
            const errorData = err.response.data;
            let message = "Erreur lors de la création du compte";

            // Messages d'erreur personnalisés
            if (errorData.email) {
                message = "Cette adresse email est déjà utilisée";
            } else if (errorData.password) {
                message = "Le mot de passe doit contenir au moins 8 caractères";
            }

            return new Response(
                JSON.stringify({ message, details: errorData }),
                { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({ message: "Impossible de créer le compte" }),
            { status: 500 }
        );
    }
};
