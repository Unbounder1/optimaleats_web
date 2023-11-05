import styles from "/styles/Shared.module.css";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";


const IntroSurvey = () => (
  <Link href="/survey" className={styles.cardContent}>
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

const MealGenerated = () => {
  const { user } = useUser();
  const userId = user?.id;

  return (
    <Link href={`/${userId}`} className={styles.cardContent}>
        <img alt="Generate a suggested meal" src="/icons/layout.svg" />
        <div>
          <h3>Generate a suggested meal</h3>
          <p>Get a meal generated based on your preferences</p>
        </div>
        <div className={styles.arrow}>
          <img alt="Arrow right" src="/icons/arrow-right.svg" />
        </div>
    </Link>
  );
};

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
        <div className={styles.card}>
          <MealGenerated />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={styles.card}>
          <SignupLink />
        </div>
      </SignedOut>

    </div>


  </main>
);
const Home = () => (
  <div className={styles.container}>
    <Main />
  </div>
);

export default Home;
