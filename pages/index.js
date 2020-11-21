import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import api from '../service/apiClient'

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
    const response = await api.getItems(startDate, endDate)
    setEventDates(response.map(x => parseISO(x.CreatedAt)))
  }

  const onChange = async (nextValue) => {
    if (eventDates.find(dDate => isSameDay(dDate, nextValue))) {
      await api.deleteItem(nextValue.toISOString())
    } else {
      await api.putItem(nextValue)
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
          onActiveStartDateChange={onActiveStartDateChange}
          view="month"
          onChange={onChange}
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
