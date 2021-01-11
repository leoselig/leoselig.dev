import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Leo Selig (.dev)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="content">
        <div className="responsive-ad">Yes. I know responsive.</div>
        <div className="me">{"{ Leo Selig }"}</div>
        <div className="me-subtitle">
          {"Software development. With quality."}
        </div>
      </main>

      <style jsx>{`
        .container {
          height: 100vh;
          width: 100vw;

          display: flex;
          flex-direction: column;
        }

        .responsive-ad {
          display: none;
          margin-top: 2rem;
        }

        @media (max-width: 20rem) {
          main > .responsive-ad {
            display: block;
          }

          main > *:not(.responsive-ad) {
            display: none;
          }
        }

        .me {
          margin: 0;
          font-size: 4rem;
        }

        .me-subtitle {
          margin: 0;
          margin-top: 1rem;
          font-size: 1rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica;
          font-size: 1em;
        }

        main {
          flex: 1;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
