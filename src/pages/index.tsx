import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState, type FormEvent } from "react";

import ClipboardJS from "clipboard";

import { api } from "../utils/api";
import toast, { Toaster } from "react-hot-toast";

import Link from "next/link";

interface type {
  link: {
    value: string;
  };
}

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const createShortUrl = api.shortUrl.createShortLink.useMutation();
  const [url, setUrl] = useState("");
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    new ClipboardJS("#copy");
  }, []);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as unknown;
    const input = form as type;
    const value = input.link.value;

    if (!value)
      return toast.error("Porfavor ingresa una URL", {
        // duration: 3,
        position: "top-right",
        icon: "🙏",
      });

    if (value.startsWith("https://") && value.length > 8) {
      createShortUrl.mutate(value, {
        onSuccess(data) {
          setCopy(true);
          setUrl(`${window.location.href}${data.shortUrl}`);
          toast.success("perfecto", {
            // duration: 3,
            position: "top-right",
            icon: "👍",
            ariaProps: {
              role: "status",
              "aria-live": "polite",
            },
          });
        },
        onError(error) {
          console.log(error);
          return toast.error(error.message, {
            // duration: 3,
            position: "top-right",
            ariaProps: {
              role: "alert",
              "aria-live": "assertive",
            },
          });
        },
      });
    } else {
      return toast.error("Ingresa una URL valida", {
        // duration: 3,
        position: "top-right",
        ariaProps: {
          role: "alert",
          "aria-live": "assertive",
        },
      });
    }
  };

  return (
    <>
      <Head>
        <title>Short-Link | acortador de links</title>
        <meta
          name="description"
          content="short-link es una herramienta para acortar tus links completamente gratuito y fácil de usar"
        ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="pdftools.onrender.com"></meta>
        <meta
          name="keywords"
          content="Short-Link, short-link, acortardor url, link short, acortadores de lnk, acortador gratis de url, acortador gratis de links"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center gap-4 bg-gradient-to-b  from-[#0b070d] to-[#270038] md:p-5">
        <Toaster />
        <div className="mt-10">
          <h1 className="bg-gradient-to-r from-[#4ca5ff] to-[hsl(280,100%,70%)] bg-clip-text text-6xl font-extrabold  text-transparent sm:text-8xl md:text-9xl">
            Short-Link
          </h1>
          <p className="text-center font-bold text-gray-500 sm:text-2xl md:text-3xl">
            la manera más fácil de compartir tus enlaces
          </p>
        </div>
        <div className=" container flex max-w-6xl flex-col items-center justify-center gap-4 py-2 px-6  sm:px-8  md:rounded-3xl md:px-14">
          <form onSubmit={handlerSubmit} className="flex w-full gap-3">
            <input
              name="link"
              placeholder="Ingresa tu link"
              autoFocus
              className="w-full rounded-lg bg-slate-300 p-1 text-sm md:p-2 md:text-xl"
              type="text"
            />
            <button
              disabled={createShortUrl.isLoading}
              className="hover:bg-sky- flex items-center justify-center  gap-2 rounded-lg bg-[#4ca5ff] py-2 px-4 font-bold text-white hover:scale-105 hover:bg-blue-400 disabled:bg-[#0553a0] md:py-3 md:px-5 md:text-lg"
            >
              {createShortUrl.isLoading ? (
                <>
                  <svg
                    width={20}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      className=" stroke-white "
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#1d0e0b"
                      strokeDasharray="164.93361431346415 56.97787143782138"
                      strokeWidth="10"
                    >
                      <animateTransform
                        attributeName="transform"
                        dur="1s"
                        keyTimes="0;1"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 50 50;360 50 50"
                      />
                    </circle>
                  </svg>
                  <span>cargando</span>
                </>
              ) : (
                "Generar"
              )}
            </button>
          </form>
          <div>
            <span className=" text-white sm:text-2xl">
              short link: {!url && "Generar"}{" "}
            </span>
            <Link
              href={url}
              className="text-white sm:text-2xl"
              target={"_blank"}
            >
              {url}
            </Link>
            {url && copy && (
              <button
                id="copy"
                data-clipboard-text={url}
                className="mx-2 rounded-md bg-gradient-to-r from-[#4ca5ff] to-[hsl(280,100%,70%)] py-1 px-4 text-white"
                onClick={() => setCopy(false)}
              >
                copy
              </button>
            )}
          </div>
        </div>
        <h2 className="text-center text-4xl font-extrabold tracking-tight  text-white sm:text-6xl md:text-7xl   ">
          De manera <br /> Rapida y {""}
          <span className="text-[hsl(280,100%,70%)]">Gratis</span>
        </h2>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const resp = await fetch(
    "https://short-link-tofgzdnk2-emonterrosof.vercel.app/api/ping"
  );
  const data = (await resp.json()) as { message: string };
  console.log(data);
  // Pass post data to the page via props
  return { props: data };
}

export default Home;
