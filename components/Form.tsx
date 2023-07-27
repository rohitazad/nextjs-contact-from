"use client"

import React, {useState, useRef} from 'react';

const FormComponents = ()=>{
    const [error, setError] =useState([]);
    const [success, setSucess] = useState(false);
    const fullname = useRef<HTMLInputElement | null>(null)
    const email = useRef<HTMLInputElement | null>(null)
    const phone = useRef<HTMLInputElement | null>(null)
    const message = useRef<HTMLTextAreaElement | null>(null)
    const submitHandler = async (e:any)=>{
        e.preventDefault();
        const data = {
            fullname : fullname.current?.value,
            email: email.current?.value,
            phone: phone.current?.value,
            message: message.current?.value
        }
        const res = await fetch('/api/contact', {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(data)
        });
        const {msg, success} = await res.json();
        setError(msg);
        setSucess(success)
        console.log('formdata ', data)
    }
    return(
        <>
            <div className='flex justify-between'>
                <form onSubmit={submitHandler}>
                    <div className='flex flex-col gap-3'>
                        <label className='text-lg' htmlFor='fullname'>Name:-</label>
                        <input ref={fullname} className='py-1 rounded-md border-rose-400 border-4 text-black w-96 px-2 font-semibold' id="fullname" type="text" placeholder='Enter your good name' />
                    </div>
                    <div className='flex flex-col gap-3 mt-4'>
                        <label className='text-lg' htmlFor='email'>Email:-</label>
                        <input ref={email} className='py-1 rounded-md border-rose-400 border-4 text-black w-96 px-2 font-semibold' id="email" type="email"  placeholder='please enter your email id:- '/>
                    </div>
                    <div className='flex flex-col gap-3 mt-4'>
                        <label className='text-lg' htmlFor='phone'>Phone:-</label>
                        <input ref={phone} className='py-1 rounded-md border-rose-400 border-4 text-black w-96 px-2 font-semibold' id="phone" type="number"  placeholder='please enter your phone no:- '/>
                    </div>
                    <div className='flex flex-col gap-3 mt-4'>
                        <label className='text-lg' htmlFor='message'>Message:-</label>
                        <textarea ref={message} className='py-1 rounded-md border-rose-400 border-4 text-black w-96 px-2 font-semibold' id="message" />
                    </div>
                    <div className='mt-3 text-center'>
                        <button className='py-2 px-10 bg-green-800 text-2xl rounded-lg'>Submit</button>
                    </div>
                </form>
                <div className=''>
                   {
                    error && error.length > 0 ? error.map((item)=>{
                        return <div key={item} className="text-lg text-red-700 mt-2 p-3">{item}</div>
                    }): ''
                   }
                   {
                    success ? <div className='bg-white text-green-700'>{success}</div> : ''
                   }
                </div>
            </div>
        </>
    )
}

export default FormComponents;