import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import 'react-calendar/dist/Calendar.css';


function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

const datesToAddClassTo = [new Date(2020,10,12)];
// yyyy, mm (0 is jan), dd 

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
      console.log('founded')
      return 'pooped';
    } else {
      console.log(date)
      console.log('diff', differenceInCalendarDays(date, datesToAddClassTo[0]) )
    }
  }
}

export default function Home() {
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(new Date());

  function onChange(nextValue) {
    setDate(nextValue);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          LastPoop
        </h1>


        <p className={styles.description}>
          Keep track of your poop cycle
        </p>

        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={tileClassName}
        />

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
