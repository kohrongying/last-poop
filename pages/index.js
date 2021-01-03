import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { putItem, deleteItem, queryItems } from '../service/dbClient'

const isSameDay = (a, b) => {
  return differenceInCalendarDays(a, b) === 0;
}

export default function Home() {
  const [eventDates, setEventDates] = useState([])
  const [activeStartDate, setActiveStartDate] = useState(new Date())

  useEffect(() => {
    refreshDates(activeStartDate)
  }, [])

  const refreshDates =  async (activeStartDate) => {
    const startDate = startOfMonth(activeStartDate).toISOString()
    const endDate = endOfMonth(activeStartDate).toISOString()
    const response = (await queryItems(startDate, endDate)).data
    setEventDates(response.map(x => parseISO(x.CreatedAt)))
  }

  const onChange = async (nextValue) => {
    if (eventDates.find(dDate => isSameDay(dDate, nextValue))) {
      await deleteItem(nextValue.toISOString())
    } else {
      await putItem({
        UserId: '1',
        Event: 'P',
        EventDate: nextValue.toISOString(),
        CreatedAt: nextValue.toISOString()
      })
    }
    refreshDates(activeStartDate)
  }

  const onActiveStartDateChange = ({ activeStartDate }) => {
    setActiveStartDate(activeStartDate)
    refreshDates(activeStartDate)
  }

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (eventDates.find(dDate => isSameDay(dDate, date))) {
        return 'pooped';
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>LastPoop</title>
        <meta name="theme-color" content="#B45309" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192"/ >
        <link rel="manifest" href="manifest.json" />

      </Head>
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          LastPoop
        </h1>

        <p className={styles.description}>
          Keep track of your poop cycle
        </p>

        <Calendar
          onActiveStartDateChange={onActiveStartDateChange}
          view="month"
          onChange={onChange}
          tileClassName={tileClassName}
        />
      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/kohrongying/last-poop">Github Source Code</a>
      </footer>
    </div>
  )
}
