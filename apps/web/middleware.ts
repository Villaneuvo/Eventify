export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/account", "/events", "/issues/edit/:id+"],
};
