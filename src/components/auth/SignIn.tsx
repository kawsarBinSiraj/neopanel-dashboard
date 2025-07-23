'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSession } from '@/helper/auth';
import { capSentences } from '@/helper/app-helper';
import useBearStore from '@/store/usePersistedStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CgSpinner } from 'react-icons/cg';
import { HiEye, HiEyeOff } from 'react-icons/hi';

/**
 * @desc :- yup schema for form validation
 * created_by :- Kawsar Bin Siraj (20/07/2025)
 */
const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
});

/**
 * @desc :- Define the type for the form data
 * created_by :- Kawsar Bin Siraj (20/07/2025)
 */
type FormData = yup.InferType<typeof schema>;

const SignIn = () => {
    const router = useRouter();
    const { setAuth } = useBearStore() as { setAuth: (auth: boolean) => void };
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    /**
     * Handles the form submission
     * @param data - The form data
     * @returns A promise that resolves when the session is created
     */
    const onSubmit = async (data: FormData): Promise<void> => {
        try {
            console.log(data, 'FormData');
            // Simulate a successful session creation
            setLoading(true);
            await createSession({ accessToken: 'BgFbAfdBqQ', tokenType: 'Bearer', expiresAt: new Date() });
            // Simulate a delay to show the loading indicator
            await new Promise(r => setTimeout(r, 2000));
            // Set the authentication state to true
            setAuth(true);
            // Redirect to the home page
            router.push('/');
        } catch (error) {
            // Log any errors that occur
            console.error('Error creating session:', error);
        } finally {
            // Set the loading state back to false
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen justify-center bg-gray-100 text-gray-900">
            <div className="m-0 flex max-w-screen-xl flex-1 justify-center bg-white shadow sm:m-10 sm:rounded-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-12 lg:w-1/2 xl:w-5/12">
                    <div className="mt-8 flex flex-col items-center">
                        <h1 className="text-2xl font-extrabold xl:text-3xl">Sign In</h1>
                        <div className="mt-8 w-full flex-1">
                            {/* Google Sign-in Placeholder */}
                            <div className="flex flex-col items-center">
                                <button
                                    type="button"
                                    className="flex w-full max-w-xs cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-indigo-100 py-2 font-bold text-gray-800 transition-all duration-300 ease-in-out hover:border-indigo-400"
                                >
                                    <div className="rounded-full bg-white p-2">
                                        <svg className="w-3" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4"
                                            />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853"
                                            />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04"
                                            />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335"
                                            />
                                        </svg>
                                    </div>
                                    <span className="ml-4">Sign In with Google</span>
                                </button>
                            </div>

                            <div className="mt-5 mb-10 border-b text-center">
                                <div className="inline-block translate-y-1/2 transform bg-white px-2 pb-1 text-sm leading-none text-gray-600">
                                    Or sign in with e-mail
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs space-y-4">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        {...register('email')}
                                        className={`${
                                            errors.email ? 'border-red-500' : ''
                                        } w-full rounded-sm border border-gray-200 bg-gray-100 px-6 py-3 text-sm placeholder-gray-500 transition-all duration-300 ease-in-out focus:border-indigo-400 focus:bg-white focus:outline-none`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{capSentences(errors.email.message)}</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            {...register('password')}
                                            className={`${
                                                errors.password ? 'border-red-500' : ''
                                            } w-full rounded-sm border border-gray-200 bg-gray-100 px-6 py-3 text-sm placeholder-gray-500 transition-all duration-300 ease-in-out focus:border-indigo-400 focus:bg-white focus:outline-none`}
                                        />
                                        <span
                                            onClick={() => setShowPassword(prev => !prev)}
                                            className="absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer text-gray-500"
                                        >
                                            {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{capSentences(errors.password.message)}</p>
                                    )}
                                </div>

                                <button
                                    type={loading ? 'button' : 'submit'}
                                    disabled={loading}
                                    style={{
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                    }}
                                    className={`${
                                        loading ? 'opacity-50' : 'hover:bg-indigo-700'
                                    } mt-2 flex w-full items-center justify-center rounded-sm bg-indigo-500 py-3 font-semibold tracking-wide text-white transition-all duration-300`}
                                >
                                    {loading ? (
                                        <CgSpinner className="mr-2 animate-spin" size={24} />
                                    ) : (
                                        <svg
                                            className="-ml-2 h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                            <circle cx="8.5" cy="7" r="4" />
                                        </svg>
                                    )}
                                    <span className="ml-2">Sign In</span>
                                </button>

                                <p className="mt-3 text-center text-sm text-gray-600">
                                    Don't have an account?
                                    <Link className="ms-2 text-indigo-500" href="/signup">
                                        Sign Up
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="hidden flex-1 items-center justify-center bg-indigo-100 text-center lg:flex">
                    <img src="/assets/logo.png" alt="img" className="inline w-full" />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
