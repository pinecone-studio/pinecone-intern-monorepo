"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/utils/authProvider";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as yup from "yup";

interface ForgetFormValues {
    email: string;
}
interface ForgotPasswordProps {
    setNext: (next: number) => void;
}
export const ForgotPassword = ({ setNext }: ForgotPasswordProps) => {
    const { forgotPassword } = useAuth()
    const forgetForm = useFormik<ForgetFormValues>({
        initialValues: {
            email: "",
        },
        validationSchema: yup.object({
            email: yup
                .string()
                .email("Зөв имэйл хаяг оруулна уу")
                .required("Имэйл хаягаа оруулна уу"),
        }),
        onSubmit: (values) => {
            forgotPassword(values.email)
            setNext(1)
        },
    });

    const showError = (
        field: keyof ForgetFormValues,
        errors: FormikErrors<ForgetFormValues>,
        touched: FormikTouched<ForgetFormValues>
    ) => forgetForm.submitCount > 0 && errors[field] && touched[field];
    return (
        <div className="w-[334px] h-[320px] m-auto space-y-10">
            <h1 className="font-semibold text-2xl text-center">Нууц үг сэргээх</h1>
            <form onSubmit={forgetForm.handleSubmit} className="space-y-4 text-center text-sm">
                <Input
                    placeholder="Имэйл хаяг оруулах"
                    id="email"
                    name="email"
                    type="email"
                    onChange={forgetForm.handleChange}
                    onBlur={forgetForm.handleBlur}
                    value={forgetForm.values.email}
                />
                {showError("email", forgetForm.errors, forgetForm.touched) ? (
                    <label className="text-red-600 px-3">
                        {forgetForm.errors.email}
                    </label>
                ) : null}
                <Button type="submit" className="w-full rounded-full bg-blue-600">
                    Үүсгэх
                </Button>
            </form>
        </div>
    )
}
