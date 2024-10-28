"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useFormik, FormikErrors, FormikTouched } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useAuth } from "@/components/utils/authProvider";
interface LoginFormValues {
    email: string;
    password: string;
}
export default function Login() {
    const router = useRouter()
    const { login } = useAuth()
    const loginForm = useFormik<LoginFormValues>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Зөв имэйл хаяг оруулна уу")
                .required("Имэйл хаягаа оруулна уу"),
            password: yup
                .string()
                .min(6, "Password must be at least 6 characters")
                .required("Нууц үгээ оруулна уу"),
        }),
        onSubmit: (values) => {
            console.log(values)
            login(values.email, values.password)
        },
    });
    const showError = (
        field: keyof LoginFormValues,
        errors: FormikErrors<LoginFormValues>,
        touched: FormikTouched<LoginFormValues>
    ) => loginForm.submitCount > 0 && errors[field] && touched[field];
    return (
        <form onSubmit={loginForm.handleSubmit} className="w-[334px] m-auto space-y-12">
            <h1 className="font-semibold text-2xl text-center">Нэвтрэх</h1>
            <div className="space-y-4 text-center text-sm">
                <Input placeholder="Имэйл хаяг"
                    id="email"
                    name="email"
                    type="email"
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.email} />
                {showError("email", loginForm.errors, loginForm.touched) ? (
                    <label className="text-red-600 px-3">
                        {loginForm.errors.email}
                    </label>
                ) : null}
                <Input placeholder="Нууц үг"
                    id="password"
                    name="password"
                    type="password"
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.password} />
                {showError("password", loginForm.errors, loginForm.touched) ? (
                    <label className="text-red-600 px-3">
                        {loginForm.errors.password}
                    </label>
                ) : null}
                <Button type="submit" className="w-full rounded-full bg-blue-600">Нэвтрэх</Button>
                <Link href="/forget">
                    <div className="underline underline-offset-4 text-gray-500 mt-4">Нууц үг мартсан</div>
                </Link>
            </div>
            <Button type="reset" onClick={() => router.push("/register")} className="w-full border border-blue-600 rounded-full bg-white text-blue-600  hover:text-white">Бүртгүүлэх</Button>
        </form>
    )
}