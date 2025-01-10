"use client"

import { useCreateUserMutation } from "@/generated"
import { ChangeEvent } from "react"


export const Signup=()=>{
    const [createUser,{data,error}]=useCreateUserMutation()
    const handleFormSubmit=async(e:ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData=new FormData(e.target)
    console.log(formData)
    await createUser({
        variables:{
           input:{
               userName:"Tuguldur",
               fullName:"Tuguldur Namjildorj",
               password:"iam_tuugii",
               email:"tuuguu1@gmail.com"
           }
        }
       })
    if(data?.createUser)
    {
        console.log('You have successfully created a user')
        console.log('error',error)
    }
    }
    console.log('error:',error)
    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-[10px] w-fit ">
            <input type="email" placeholder="Email" name="email"/>
            <input type="password" placeholder="Password" name="password"/>
            <input type="text" placeholder="Full name" name="fullName"/>
            <input type="text" placeholder="Username" name="userName"/>
            <button>Create a user</button>
            <p>{error?.message}</p>
        </form>
    )
}