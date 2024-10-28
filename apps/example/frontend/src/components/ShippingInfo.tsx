"use client"
import { FormikErrors, FormikTouched, useFormik } from 'formik'
import * as yup from "yup";
import React from 'react'
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useData } from './utils/dataProvider';
interface ShippingInfoProps {
    totalPrice: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}
interface ShippingInfoForm {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
    info?: string
}
export const ShippingInfo = ({ setStep, totalPrice }: ShippingInfoProps) => {
    const { createOrder } = useData()
    const ShippingInfoForm = useFormik<ShippingInfoForm>({
        initialValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            info: "",
        },
        validationSchema: yup.object({
            firstName: yup.string().required("Овогоо оруулна уу"),
            lastName: yup.string().required("Нэрээ оруулна уу"),
            phoneNumber: yup.string()
                .matches(/^[0-9]+$/, "Зөвхөн тоо оруулна уу")
                .min(8, "Утасны дугаар дор хаяж 8 оронтой байх ёстой")
                .required("Утасны дугаараа оруулна уу"),
            address: yup.string().required("Хаягаа оруулна уу"),
        }),
        onSubmit: (values) => {
            createOrder(values.firstName, values.lastName, values.phoneNumber, values.address, totalPrice)
            setStep(3)
        },
    })
    const showError = (
        field: keyof ShippingInfoForm,
        errors: FormikErrors<ShippingInfoForm>,
        touched: FormikTouched<ShippingInfoForm>
    ) => ShippingInfoForm.submitCount > 0 && errors[field] && touched[field];
    return (
        <form onSubmit={ShippingInfoForm.handleSubmit} className='bg-gray-50 min-w-[687px] p-8 rounded-2xl space-y-8 border'>
            <div className="font-bold text-lg">2. Хүргэлтийн мэдээлэл оруулах</div>
            <div>
                <Label htmlFor='firstName'>Овог:</Label>
                <Input
                    id="firstName"
                    name="firstName"
                    placeholder='Бат'
                    onChange={ShippingInfoForm.handleChange}
                    onBlur={ShippingInfoForm.handleBlur}
                    value={ShippingInfoForm.values.firstName}
                />
                {showError("firstName", ShippingInfoForm.errors, ShippingInfoForm.touched) ? (
                    <label className="text-sm text-red-600 px-3">
                        {ShippingInfoForm.errors.firstName}
                    </label>
                ) : null}
            </div>
            <div>
                <Label htmlFor='lastName'>Нэр:</Label>
                <Input
                    id="lastName"
                    name="lastName"
                    placeholder='Болд'
                    onChange={ShippingInfoForm.handleChange}
                    onBlur={ShippingInfoForm.handleBlur}
                    value={ShippingInfoForm.values.lastName}
                />
                {showError("lastName", ShippingInfoForm.errors, ShippingInfoForm.touched) ? (
                    <label className="text-sm text-red-600 px-3">
                        {ShippingInfoForm.errors.lastName}
                    </label>
                ) : null}
            </div>
            <div>
                <Label htmlFor='phoneNumber'>Утасны дугаар:</Label>
                <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder='88888888'
                    onChange={ShippingInfoForm.handleChange}
                    onBlur={ShippingInfoForm.handleBlur}
                    value={ShippingInfoForm.values.phoneNumber}
                />
                {showError("phoneNumber", ShippingInfoForm.errors, ShippingInfoForm.touched) ? (
                    <label className="text-sm text-red-600 px-3">
                        {ShippingInfoForm.errors.phoneNumber}
                    </label>
                ) : null}
            </div>
            <div>
                <Label htmlFor='address'>Хаяг:</Label>
                <Textarea
                    id="address"
                    name="address"
                    placeholder='Улаанбаатар хот, Баянгол дүүрэг, 1-р хороо, 12-р байр, 123 тоот'
                    onChange={ShippingInfoForm.handleChange}
                    onBlur={ShippingInfoForm.handleBlur}
                    value={ShippingInfoForm.values.address}
                />
                {showError("address", ShippingInfoForm.errors, ShippingInfoForm.touched) ? (
                    <label className="text-sm text-red-600 px-3">
                        {ShippingInfoForm.errors.address}
                    </label>
                ) : null}
            </div>
            <div>
                <Label htmlFor='info'>Нэмэлт мэдээлэл:</Label>
                <Textarea
                    id="info"
                    name="info"
                    placeholder='Ирэхийн өмнө залгана уу!'
                    onChange={ShippingInfoForm.handleChange}
                    onBlur={ShippingInfoForm.handleBlur}
                    value={ShippingInfoForm.values.info}
                />
                <label className="text-sm text-gray-400 px-3">
                    Хүргэлттэй холбоотой нэмэлт мэдээлэл үлдээгээрэй
                </label>

            </div>
            <div className='flex justify-between'>
                <button type='button' onClick={() => setStep(1)} className="bg-white border px-9 py-2 rounded-full text-sm">Буцах</button>
                <button type='submit' className="text-white bg-blue-600 px-9 py-2 rounded-full text-sm">Төлбөр төлөх</button>
            </div>
        </form>
    )
}