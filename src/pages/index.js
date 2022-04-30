import Head from 'next/head'
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'
import CountriesTable from '../components/CountriesTable/CountriesTable'

export default function Home( {countries}) {
  console.log(typeof countries);
  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput placeholder="Filter by Name, Region or Sub-region" />
      <CountriesTable countries={countries} />
    </Layout>
  )
}

export const getStaticProps = async () => {  //static props
  const res = await fetch('https://restcountries.com/v3.1/all');
  const countries = await res.json();

  return { 
    props: {
      countries,
    },
  }; 
}