"use client"
import React, { useState } from 'react'
import '@fontsource/poppins';
import vectorSrc from '../../public/giphy1.webp'
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// Static credentials
const staticCredentials = {
  username: 'sudip123',
  password: 'Sudip@2311',
};

function Page() {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const validate = () => {
    const errors = {};
    if (formValues.username !== staticCredentials.username) {
      errors.username = 'Invalid username';
    }
    if (formValues.password !== staticCredentials.password) {
      errors.password = 'Invalid password';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      toast.success('Successfully signed in!');
      router.push('/AdminDashboard');
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  return (
    <>
      <div className="h-screen bg-gradient-to-br from-[#0d5b528e] via-slate-900 to-black flex items-center justify-center flex-col">
        <div>
          <p className='text-[#FFF9EA] font-bold text-5xl pb-5'>BakSiSH .</p>
        </div>
        <div className="bg-white/10 p-8 rounded-lg shadow-lg flex w-[70%]">
          <div className="w-1/2 pr-8">
            <h2 className="text-3xl font-bold text-white">Sign in to Admin Console</h2>
            <p className="text-gray-400 mb-8">to continue to your account</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="username">
                  Username or email address
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Username or email address"
                  value={formValues.username}
                  onChange={handleChange}
                  className="shadow appearance-none border-b border-lime-300/50 placeholder:text-black/60 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                  className="shadow appearance-none border-b border-lime-300/50 placeholder:text-black/60 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent"
                />
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
              </div>
              <div className="mb-4">
                <button
                  className="bg-teal-700 hover:bg-teal-600 hover:scale-105 duration-1000 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <Image src={vectorSrc} alt="a nice vector" className="w-[50rem] mix-blend-darken"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
