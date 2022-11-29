import Head from 'next/head'
import Image from 'next/image'
import HomePage from '../components/HomePage'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hotel Management System</title>
        <meta name="description" content="By Alexis Matos da Sivla" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />


    </div>
  )
}
