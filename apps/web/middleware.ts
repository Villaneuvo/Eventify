export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/account", "/events", "/events/:path*", "/issues/edit/:id+"],
};
