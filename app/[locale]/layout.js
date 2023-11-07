"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { StateProvider } from "@/store/contextProvider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import LoadingPage from "@/components/LoadingPage";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return [{ locale: "fa" }, { locale: "en" }];
}

export const metadata = {
  title: "KavehGlass",
  description: "kaveh glass Co",
};

export default function RootLayout({ children, params: { locale } }) {
  //make the async func for make it server component
  //you can make it  try catch
  // let messages;
  // messages = (await import(`../../messages/${locale}.json`)).default;

  const [messages, setMessages] = useState();

  useEffect(() => {
    async function fetchMessages() {
      try {
        let data = (await import(`@/messages/${locale}.json`)).default;
        setMessages(data);
      } catch (err) {
        notFound();
      }
    }

    fetchMessages();
  }, [locale]);

  return (
    <html lang={locale}>
      <body className={`${inter.className}`}>
        <Provider store={store}>
          <StateProvider>
            <Toaster position="top-center" />
            {messages ? (
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            ) : (
              <LoadingPage />
            )}
          </StateProvider>
        </Provider>
      </body>
    </html>
  );
}

// export async function getServerSideProps({ params: { locale } }) {
//   // Fetch data from external API
//   console.log(locale);
//   let messages = (await import(`@/messages/${locale}.json`)).default;

//   // Pass data to the page via props
//   return { props: { messages } };
// }
