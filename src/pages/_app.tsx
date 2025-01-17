import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@app/utils/theme";
import { SessionProvider } from "next-auth/react";
import api from "@app/utils/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useAxiosInterceptor() {
  const { data: session }: any = useSession();
  useEffect(() => {
    if (session?.user?.accessToken) {
      api.defaults.headers.common["Authorization"] =
        `Bearer ${session?.user?.accessToken}`;
    }
  }, [session]);
}

const UserAuth = () => {
  useAxiosInterceptor();
  return <></>;
};
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <UserAuth />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}
