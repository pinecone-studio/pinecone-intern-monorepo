'use client';
 
import { useEffect, useState } from 'react';
import z from 'zod'
 
  const  CreateForm=()=> {
  const [email, setEmail] = useState('');
  const [touched , setTouched] = useState(false)
  const [error , setError] = useState<string | null >(null) ;
  const emailSchema = z.object({
    email: z.string().email('Zaaval email boglono  ')
  })
  
    
  useEffect(() => {
    const result = emailSchema.safeParse({ email });
    if (result.success) {
      setError(null)
    } else {
      const errorMessage = result.error.format().email?._errors[0];
      setError( errorMessage || null);
    }
  }, [email]);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse({ email })
    setTouched(true)
    if(!result.success){
        const errorMessage = result.error.format().email?._errors[0]
        setError(errorMessage || null)
        return
    }
    const res = await fetch('api/check-email' ,{
      method: 'POST' ,
      headers: { 'Content-Type' : 'application/json' } ,
      body:JSON.stringify({email})
    })
    const data = await res.json()

    if(data.exists){
      setError('Burtgeltei Email baina')
    }else{
      setError(null)
    }

  };
 
return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
         <div>
             <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                { touched && error ? <p className='text-red-400 text-sm' > {error} </p> : null }
        </div>
        <button
               type="submit"
               className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
             >
         Continue
        </button>
    </form>
  );
}
export default CreateForm