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
  if (view === 'month') {

    if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
      return 'pooped';
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
