import Head from "next/head";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta content="An error occcurred | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <p>Sorry, something went wrong</p>
    </>
  );
}
