import { Button, TextInput, PasswordInput, Alert } from '@mantine/core';
import { useRouter } from 'next/router';
import { verifyUser } from '@/authentication/login';
import { readIsValid } from '@/authentication/session';
import { useState, useEffect } from 'react';
import { MainLayout } from '@/layout/main_layout';
import Link from 'next/link';
import createClient from '@/utils/pocketbase/api';

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pb = createClient();

  useEffect(() => {
    if (readIsValid()) {
      router.push('/blog');
    }
    setIsClient(true);
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;

    try {
      const result = await pb.collection('users').authWithPassword(
        username,
        password,
      );
      if (result) {
        router.push('/home');
        setIsLoading(false)
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      setIsLoading(false)
    }

    setIsLoading(false)
  };

  if (!isClient) {
    return null;
  }

  return (
    !readIsValid() && (
      <MainLayout title="login">
        <section className="flex h-screen bg-gray-100">
          <div className="m-auto bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
            <div className="flex">
              <div className="w-1/2 bg-gray-400 hidden sm:block bg-cover bg-center bg-[url('https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1000/https://www.teamarmadapg.com/wp-content/uploads/2021/08/mental-health-wellness-during-covid-19.jpg')]">
              </div>
              <div className="sm:w-1/2 p-8">
                <div className="flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-4">Smart Mental Health </h2>
                  <p className="text-gray-600 mb-8">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                  </p>
                </div>
                {error && (
                  <Alert color="red" mb={4}>
                    {error}
                  </Alert>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <TextInput
                      type="text"
                      label="Username"
                      name="username"
                      placeholder="Insert username"
                    />
                  </div>
                  <div className="mb-6">
                    <PasswordInput label="Password" name="password" placeholder='Insert password' />
                  </div>

                  <Button
                    loading={isLoading}
                    type="submit"
                    className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Submit
                  </Button>
                  <Link href="/register" className='flex items-center justify-center mt-3 text-blue-600'>
                    Click for register
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    )
  );
};

