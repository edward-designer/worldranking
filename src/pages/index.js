import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';
import CountriesTable from '../components/CountriesTable/CountriesTable';

export default function Home( {countries}) {

  const [keyword, setKeyword] = useState("");
  const filteredCountries = countries.filter((country) => 
  country.name.common.toLowerCase().includes(keyword)||
  country.region.toLowerCase().includes(keyword) ||
  (country.subregion&&country.subregion.toLowerCase().includes(keyword)) //some countries without subregion
  );

  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  }

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput placeholder="Filter by Name, Region or Sub-region" onChange={onInputChange}/>
      <CountriesTable countries={filteredCountries} />
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