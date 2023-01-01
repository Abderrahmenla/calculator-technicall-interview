import Head from "next/head";
import Calculator from "../components/calculator";

export default function Home() {
    return (
        <>
            <Head>
                <title>Calculator</title>
                <meta name="description" content="An Online Calculator" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Calculator />
        </>
    );
}
