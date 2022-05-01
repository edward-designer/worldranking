import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import Link from "next/Link";

const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const country = await res.json();
    return country[0];
}

const Country = ({country}) =>{
    const [borders, setBorders] = useState([]);

    const getBorders = async () =>{
        try{
            const borders = await Promise.all(country.borders.map(border => getCountry(border)));
            setBorders(borders);
        }catch(e){
            console.log(e.message);
        }
        
    }
    useEffect(() => {
        getBorders();
    },borders);
    console.log(borders);
    return (
    <Layout title={country.name.common}>
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.overview_panel}>
                    <img src={country.flags.png} alt={country.name.common} />
                    <h1  className={styles.overview_name}>{country.name.common}</h1>
                    <div  className={styles.overview_region}>{country.region}</div>
                    <div  className={styles.overview_numbers}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>{country.population}</div>
                            <div className={styles.overview_label}>Population</div>
                        </div>    
                        <div className={styles.overview_area}>
                            <div className={styles.overview_value}>{country.area}</div>
                            <div className={styles.overview_label}>Area (km<sup>2</sup>)</div>
                        </div>                       
                    </div>
                </div> 
            </div>
            <div className={styles.container_right}>
                <div className={styles.details_panel}>
                    <div className={styles.details_panel_heading}>Details</div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Capital</div>
                        <div className={styles.details_panel_value}>{country.capital}</div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Subregion</div>
                        <div className={styles.details_panel_value}>{country.subregion}</div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Language</div>
                        <div className={styles.details_panel_value}>{Object.values(country.languages).join(", ")}</div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Currencies</div>
                        <div className={styles.details_panel_value}>{Object.values(country.currencies).map((currency)=>currency.name+" ("+currency.symbol+")").join(",")}</div>
                    </div>                
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Official Name</div>
                        <div className={styles.details_panel_value}>{country.name.official}</div>
                    </div> 
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Gini Ratio</div>
                        <div className={styles.details_panel_value}>{country.gini?Object.entries(country.gini).map((entry)=>entry[1]+' ('+entry[0]+')'):'-'}</div>
                    </div>  
                    <div className={styles.details_panel_borders}>
                        <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>
                        <div className={styles.details_panel_borders_container}>
                        {borders.length?borders.map(({flags,name,cca3})=>
                            <Link href={`/country/${cca3}`}>
                            <div key={name.common} className={styles.details_panel_borders_country}>
                                <img src={flags.png} alt={name.common} />
                                <div className={styles.details_panel_name}>{name.common}</div>
                            </div></Link>):<div className={styles.details_panel_borders_country}>Nil</div>}
                        </div>    
                    </div> 
                </div>             
            </div>
        </div>
    </Layout>
    )
}

export default Country;


export const getServerSideProps = async ({params}) => { // use the params object derived from the routing URL
    const country = await getCountry(params.id);
    return {
        props: {
            country,
        },
    }
}