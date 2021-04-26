import Head from 'next/head';
import { useRef } from 'react';
import prisma from '../../lib/prisma';
import Layout from '../../components/Layout';
import Settings from '../../components/Settings';
import { useSession, getSession } from 'next-auth/client';
import useSWR from 'swr';
import {GetServerSideProps} from "next";
import {useForm} from "react-hook-form";

type PasswordFormValues = {
    newPassword: any;
    currentPassword: any;
}

export default function PasswordSettings(props: any) {
    const [ session, loading ] = useSession();
    const {register, handleSubmit} = useForm<PasswordFormValues>();

    if (loading) {
        return <p className="text-gray-400">Loading...</p>;
    } else {
        if (!session) {
            window.location.href = "/auth/login";
        }
    }

    async function changePasswordHandler({newPassword, currentPassword}) {

        // TODO: Add validation

        const response = await fetch('/api/auth/changepw', {
            method: 'PATCH',
            body: JSON.stringify({oldPassword: currentPassword, newPassword}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response);

        // const {data, error} = useSWR(`/api/auth/changepw?oldPassword=${enteredOldPassword}&newPassword${enteredNewPassword}`);
        // console.log(data);
    }

    return(
        <Layout heading="Password">
            <Head>
                <title>Change Password | Calendso</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Settings>
                <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit(changePasswordHandler)(e);
                }}>
                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                        <div>
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Change Password</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Change the password for your Calendso account.
                            </p>
                        </div>

                        <div className="mt-6 flex">
                            <div className="w-1/2 mr-2">
                                <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">Current Password</label>
                                <div className="mt-1">
                                    <input {...register("currentPassword")} type="password" name="currentPassword" id="currentPassword"
                                           className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                           placeholder="Your old password" />
                                </div>
                            </div>
                            <div className="w-1/2 ml-2">
                                <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className="mt-1">
                                    <input {...register("newPassword")} type="password" name="newPassword" id="newPassword"
                                           className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                           placeholder="Your super secure new password" />
                                </div>
                            </div>
                        </div>
                        <hr className="mt-8" />
                        <div className="py-4 flex justify-end">
                            <button type="button" className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Cancel
                            </button>
                            <button type="submit" className="ml-2 bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </Settings>
        </Layout>
    );
}

export  const getServerSideProps: GetServerSideProps = async(context: any) => {
    const session = await getSession(context);

    const user = await prisma.user.findFirst({
        where: {
            email: session.user.email,
        },
        select: {
            id: true,
            username: true,
            name: true
        }
    });

    return {
      props: {user}, // will be passed to the page component as props
    }
}
