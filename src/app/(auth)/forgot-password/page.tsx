import {Metadata} from "next";
import ForgotPasswordPage from "@/components/containers/forgot-password/forgot-password-page";

export const metadata: Metadata = {
    title: 'Geotagger | Forgot Password',
};

export default function Page() {
    return <ForgotPasswordPage/>
}
