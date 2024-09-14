import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <>
            {/* This layout does NOT include a navbar */}
            {children}
        </>
    );
};

export default AuthLayout;
