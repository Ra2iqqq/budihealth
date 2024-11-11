// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import '@mantine/charts/styles.css';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { useRouter } from 'next/router';
import Authentication from '@/layout/authentication';
import { DashboardProvider } from "@/layout/DashboardContext";
const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const publicRoutes = ['/']

  return (
    <>
      <DashboardProvider>
        <MantineProvider theme={theme}>
          <ModalsProvider>
            {/* {publicRoutes.includes(router.pathname) ? ( */}
              <Component {...pageProps} />
            {/*  ) :
              <Authentication>
                 <Component {...pageProps} />
               </Authentication>
             } */}
          </ModalsProvider>
        </MantineProvider>
      </DashboardProvider>
    </>
  );
}
