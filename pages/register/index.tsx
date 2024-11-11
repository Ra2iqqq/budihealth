import { Button, TextInput, PasswordInput, Alert } from "@mantine/core";
import { useRouter } from "next/router";
import { verifyUser } from "@/authentication/login";
import { readIsValid } from "@/authentication/session";
import { useState, useEffect } from "react";
import { MainLayout } from "@/layout/main_layout";
import Link from "next/link";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import createClient from "@/utils/pocketbase/api";

export default function Home() {
  const pb = createClient();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    const name = e.currentTarget.names.value;
    const email = e.currentTarget.email.value;
    const phone = e.currentTarget.phone.value;
    const gender = e.currentTarget.genderForm.value;

    const data = {
      "username": username,
      "email": email,
      "emailVisibility": true,
      "password": password,
      "passwordConfirm": password,
      "name": name,
      "phone": phone,
      "gender": gender
    };

    console.log(data)

    try {
      const result = await pb.collection('users').create(data);

      if (result) {

        try {
          const login = await pb.collection('users').authWithPassword(username, password);

          if (login) {
            router.push("/home");
            setIsLoading(false);
          }
        } catch (error) {
          setError("Invalid credentials. Please try again.");
          setIsLoading(false);
        }
      }
    } catch {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <MainLayout title="">
      <section className="flex h-screen bg-gray-100 ">
        <div className="m-auto bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
          <div className="flex">
            <div className="w-1/2 bg-gray-400 hidden sm:block bg-cover bg-center bg-[url('https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1000/https://www.teamarmadapg.com/wp-content/uploads/2021/08/mental-health-wellness-during-covid-19.jpg')]"></div>
            <div className="sm:w-1/2 p-8">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">
                  Smart Mental Health{" "}
                </h2>
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
                    label="Name"
                    name="names"
                    placeholder="Insert name"
                  />
                  <TextInput
                    type="text"
                    label="Email"
                    name="email"
                    placeholder="Insert email"
                  />
                  <TextInput
                    type="text"
                    label="Phone"
                    name="phone"
                    placeholder="Insert phone"
                  />
                  <TextInput
                    type="text"
                    label="Username"
                    name="username"
                    placeholder="Insert username"
                  />
                </div>
                <div className="mb-6">
                  <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Insert password"
                  />
                </div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="genderForm"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  loading={isLoading}
                  type="submit"
                  className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )

}
