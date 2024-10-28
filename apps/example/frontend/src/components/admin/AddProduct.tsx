import React from 'react'
import { Button } from '../ui/button'
import { FormikErrors, FormikTouched, useFormik } from 'formik'
import * as yup from "yup";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { UploadImage } from './UploadImage';
import { useData } from '../utils/dataProvider';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

interface addProductFormValues {
    name: string,
    price: number,
    salePercent: number,
    description: string,
    images: string[],
    qty: {
        free?: number;
        s?: number;
        m?: number;
        l?: number;
        xl?: number;
        "2xl"?: number;
        "3xl"?: number;
    },
    category: string,
}
export const AddProduct = () => {
    const { categories, createProduct } = useData()
    const addProductForm = useFormik<addProductFormValues>({
        initialValues: {
            name: "",
            price: 0,
            salePercent: 0,
            description: "",
            images: [],
            qty: {},
            category: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Нэрээ оруулна уу!"),
            price: yup
                .number()
                .required("Үнэ оруулна уу")
                .min(0, "Үнэ 0-ээс их байх ёстой"),
            qty: yup.object().shape({
                free: yup.number().min(0, "Тоо дугаар 0-ээс багагүй байх ёстой").notRequired(),
                s: yup.number().min(0).notRequired(),
                m: yup.number().min(0).notRequired(),
                l: yup.number().min(0).notRequired(),
                xl: yup.number().min(0).notRequired(),
                "2xl": yup.number().min(0).notRequired(),
                "3xl": yup.number().min(0).notRequired(),
            }),
            salePercent: yup
                .number()
                .required("Хямдралын хувь оруулна уу")
                .min(0, "0-ээс багагүй байх ёстой")
                .max(100, "100-аас ихгүй байх ёстой"),
            description: yup.string().required("Нэмэлт мэдээлэл оруулна уу!"),
            images: yup.array().required("Зураг оруулна уу!"),
            category: yup.string().required("Ангилалаа оруулна уу!"),
        }),
        onSubmit: (values) => {
            createProduct(values.name, values.description, values.category, values.price, values.salePercent, values.images, values.qty)
        },
    })
    const showError = (
        field: keyof addProductFormValues,
        errors: FormikErrors<addProductFormValues>,
        touched: FormikTouched<addProductFormValues>
    ) => addProductForm.submitCount > 0 && errors[field] && touched[field];
    return (
        <form onSubmit={addProductForm.handleSubmit} className='p-8'>
            <div className='flex gap-6'>
                <div className='flex-1 space-y-6'>
                    <div className='bg-white p-6 rounded-xl space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="name">Бүтээгдэхүүний нэр</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder='Нэр'
                                onChange={addProductForm.handleChange}
                                onBlur={addProductForm.handleBlur}
                                value={addProductForm.values.name}
                            />
                            {showError("name", addProductForm.errors, addProductForm.touched) ? (
                                <label className="text-sm text-red-600 px-3">
                                    {addProductForm.errors.name}
                                </label>
                            ) : null}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="description">Нэмэлт мэдээлэл</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder='Гол онцлог, давуу тал, техникийн үзүүлэлтүүдийг онцолсон дэлгэрэнгүй, сонирхолтой тайлбар.'
                                onChange={addProductForm.handleChange}
                                onBlur={addProductForm.handleBlur}
                                value={addProductForm.values.description}
                            />
                            {showError("description", addProductForm.errors, addProductForm.touched) ? (
                                <label className="text-sm text-red-600 px-3">
                                    {addProductForm.errors.description}
                                </label>
                            ) : null}
                        </div>
                    </div>

                    <div className='bg-white p-6 rounded-xl space-y-2'>
                        <Label className='text-base'>Бүтээгдэхүүний зураг</Label>
                        <UploadImage images={addProductForm.values.images}
                            setImages={(images: string[]) => addProductForm.setFieldValue('images', images)} />
                    </div>
                    <div className='bg-white p-6 rounded-xl flex gap-4'>
                        <div className='flex-1 space-y-2'>
                            <Label htmlFor='price'>Үндсэн үнэ</Label>
                            <Input
                                id="price"
                                name="price"
                                type='number'
                                placeholder='Нэр'
                                onChange={addProductForm.handleChange}
                                onBlur={addProductForm.handleBlur}
                                value={addProductForm.values.price}
                            />
                            {showError("price", addProductForm.errors, addProductForm.touched) ? (
                                <label className="text-sm text-red-600 px-3">
                                    {addProductForm.errors.price}
                                </label>
                            ) : null}
                        </div>
                        <div className='flex-1 space-y-2'>
                            <Label htmlFor='salePercent'>Хямдралын хувь</Label>
                            <Input
                                id="salePercent"
                                name="salePercent"
                                type='number'
                                placeholder='Нэр'
                                onChange={addProductForm.handleChange}
                                onBlur={addProductForm.handleBlur}
                                value={addProductForm.values.salePercent}
                            />
                            {showError("salePercent", addProductForm.errors, addProductForm.touched) ? (
                                <label className="text-sm text-red-600 px-3">
                                    {addProductForm.errors.salePercent}
                                </label>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className='flex-1 space-y-6'>
                    <div className='bg-white p-6 rounded-xl space-y-2'>
                        <Label>Ерөнхий ангилал</Label>
                        <Select onValueChange={(selectedValues) => {
                            addProductForm.setFieldValue("category", selectedValues);
                        }}
                            value={addProductForm.values.category}
                            name="category">
                            <SelectTrigger>
                                <SelectValue placeholder="Сонгох" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Ерөнхий ангилал</SelectLabel>
                                    {categories.map((category, index) => <SelectItem key={index} value={category._id}>{category.name}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='bg-white p-6 rounded-xl space-y-2'>
                        <Label className='text-lg' htmlFor='qty'>Тоо ширхэг</Label>
                        <div className='space-y-2 w-36'>
                            <div className='flex items-center justify-between'>
                                <Label>FREE</Label>
                                <Input
                                    id="qty.free"
                                    name="qty.free"
                                    type='number'
                                    placeholder='Ширхэг'
                                    className='w-24'
                                    onChange={addProductForm.handleChange}
                                    onBlur={addProductForm.handleBlur}
                                    value={addProductForm.values.qty.free}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label>S</Label>
                                <Input
                                    id="qty.s"
                                    name="qty.s"
                                    type='number'
                                    placeholder='Ширхэг'
                                    className='w-24'
                                    onChange={addProductForm.handleChange}
                                    onBlur={addProductForm.handleBlur}
                                    value={addProductForm.values.qty.s}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label>M</Label>
                                <Input
                                    id="qty.m"
                                    name="qty.m"
                                    type='number'
                                    placeholder='Ширхэг'
                                    className='w-24'
                                    onChange={addProductForm.handleChange}
                                    onBlur={addProductForm.handleBlur}
                                    value={addProductForm.values.qty.m}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label>L</Label>
                                <Input
                                    id="qty.l"
                                    name="qty.l"
                                    type='number'
                                    placeholder='Ширхэг'
                                    className='w-24'
                                    onChange={addProductForm.handleChange}
                                    onBlur={addProductForm.handleBlur}
                                    value={addProductForm.values.qty.l}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label>XL</Label>
                                <Input
                                    id="qty.xl"
                                    name="qty.xl"
                                    type='number'
                                    placeholder='Ширхэг'
                                    className='w-24'
                                    onChange={addProductForm.handleChange}
                                    onBlur={addProductForm.handleBlur}
                                    value={addProductForm.values.qty.xl}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label>2XL</Label>
                                <Input
                                    id="qty.2xl"
                                    name="qty.2xl"
                                    type='number'
                                    placeholder='Ширхэг'
                                    className='w-24'
                                    onChange={addProductForm.handleChange}
                                    onBlur={addProductForm.handleBlur}
                                    value={addProductForm.values.qty['2xl']}
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label>3XL</Label>
                                <Input
                                    id="qty.3xl"
                                    name="qty.3xl"
                                    type='number'
                                    placeholder='Ширхэг'
                                    className='w-24'
                                    onChange={addProductForm.handleChange}
                                    onBlur={addProductForm.handleBlur}
                                    value={addProductForm.values.qty['3xl']}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-end space-x-6 mt-6'>
                <Button className='bg-white text-black'>Ноорог</Button>
                <Button type='submit'>Нийтлэх</Button>
            </div>
        </form>
    )
}
