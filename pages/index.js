import styles from "/styles/Shared.module.css";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";

const IntroSurvey = () => (
  <Link href="/test/test" className={styles.cardContent}>
    <img alt="Explore Clerk components" src="/icons/layout.svg" />
    <div>
      <h3>Take the Intro Survey</h3>
      <p>
        Get started by abc def ge
      </p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
);

const SignupLink = () => (
  <Link href="/sign-up" className={styles.cardContent}>
    <img alt="Sign up" src="/icons/user-plus.svg" />
    <div>
      <h3>Sign up for an account</h3>
      <p>Sign up and sign in to explore all the features provided by Clerk out-of-the-box</p>
    </div>
    <div className={styles.arrow}>
      <img src="/icons/arrow-right.svg" />
    </div>
  </Link>
);

const apiSample = `
import { getAuth } from "@clerk/nextjs/server";

export default function handler(req, res) {
  const { sessionId, userId } = getAuth(req);

  if (!sessionId) {
    return res.status(401).json({ id: null });
  }
  return res.status(200).json({ id: userId });
};
`.trim();

// Main component using <SignedIn> and <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering
// depending on whether or not a visitor is signed in.
//
// https://clerk.dev/docs/component-reference/signed-in
const Main = () => (
  <main className={styles.main}>
    <h1 className={styles.title}>Welcome to OptiMeal</h1>
    <SignedIn>
      <p className={styles.description}>You have successfully signed in</p>
    </SignedIn>
    <SignedOut>
      <p className={styles.description}>Sign up for an account to get started</p>
    </SignedOut>

    <div className={styles.cards}>
      <SignedIn>
        <div className={styles.card}>
          <IntroSurvey />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles.card}>
          <SignupLink />
        </div>
      </SignedOut>

    </div>

    <SignedIn>
      <APIRequest />
    </SignedIn>

  </main>
);

const APIRequest = () => {
  React.useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  });
  const [response, setResponse] = React.useState("// Click above to run the request");
  const makeRequest = async () => {
    setResponse("// Loading...");

    try {
      const res = await fetch("/api/getAuthenticatedUserId");
      const body = await res.json();
      setResponse(JSON.stringify(body, null, "  "));
    } catch (e) {
      setResponse("// There was an error with the request. Please contact support@clerk.dev");
    }
  };
  return (
    <div className={styles.backend}>
      <h2>API request example</h2>
      <div className={styles.card}>
        <button target="_blank" rel="noopener" className={styles.cardContent} onClick={() => makeRequest()}>
          <img src="/icons/server.svg" />
          <div>
            <h3>fetch('/api/getAuthenticatedUserId')</h3>
            <p>Retrieve the user ID of the signed in user, or null if there is no user</p>
          </div>
          <div className={styles.arrow}>
            <img src="/icons/download.svg" />
          </div>
        </button>
      </div>
      <h4>
        Response
        <em>
          <SignedIn>You are signed in, so the request will return your user ID</SignedIn>
          <SignedOut>You are signed out, so the request will return null</SignedOut>
        </em>
      </h4>
      <pre>
        <code className="language-js">{response}</code>
      </pre>
      <h4>pages/api/getAuthenticatedUserId.js</h4>
      <pre>
        <code className="language-js">{apiSample}</code>
      </pre>
    </div>
  );
};


const Home = () => (
  <div className={styles.container}>
    <Main />
  </div>
);

export default Home;
