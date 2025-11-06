import { defineMiddleware } from "astro:middleware";
import pb from "../../utils/pb";

export const onRequest = defineMiddleware(async ({ cookies, locals }, next) => {
    const authCookie = cookies.get("pb_auth");

    if (authCookie) {
        pb.authStore.loadFromCookie(authCookie.value);

        if (pb.authStore.isValid) {
            locals.user = pb.authStore.model;
        }
    }

    return next();
});
