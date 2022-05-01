import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import styles from "./CountriesTable.module.css";
import { useState } from "react";
import Link from 'next/link';

const orderBy = (countries,value,direction) => {
    if(direction === "asc"){
        return [...countries].sort((a, b) =>{return value==='name'? a.name.common.localeCompare(b.name.common, 'de') : value==='gini'? Object.values({...a.gini}) - Object.values({...b.gini})  : a[value] - b[value] })  // sort Å as A
    }
    if(direction === "desc"){
        return [...countries].sort((a, b) => {return value==='name'? b.name.common.localeCompare(a.name.common, 'de') : value==='gini'? Object.values({...b.gini}) - Object.values({...a.gini}) : b[value] - a[value] })
    }    
    return countries;
}

const SortArrow = ({direction,value}) => {
    if(!direction) return;
    if(direction === "asc" && value){
        return (
            <div className={styles.heading_arrow}><KeyboardArrowUpRounded  color="inherit" /></div>
        )
    }
    if(direction === "desc" && value){
        return (
            <div className={styles.heading_arrow}><KeyboardArrowDownRounded  color="inherit" /></div>
        )
    }

}

const CountriesTable = ({countries}) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();

    const orderedCountries = orderBy(countries,value,direction);

    const switchDirection =(value)=>{
        if(!direction) {
            setDirection('desc',value);
        } else if (direction === 'desc'){
            setDirection('asc',value);
        } else if (direction === 'asc'){
            setDirection('desc',value);
        } else {
            setDirection(null,value);
        }
    }

    const setValueAndDirection=(value)=>{
        switchDirection(value);
        setValue(value);
    }

    return (
        <div>
            <div className={styles.heading}>
                <button className={styles.heading_name} onClick={()=>{setValueAndDirection('name')}}>
                    <div>Name</div>
                    <SortArrow direction={direction} value={value==='name'} />
                </button>
                <button className={styles.heading_population} onClick={()=>{setValueAndDirection('population')}}>
                    <div>Population</div>
                    <SortArrow direction={direction} value={value==='population'} />
                </button>
                <button className={styles.heading_area} onClick={()=>{setValueAndDirection('area')}}>
                    <div>Area (km<sup>2</sup>)</div>
                    <SortArrow direction={direction} value={value==='area'} />
                </button>
                <button className={styles.heading_gini} onClick={()=>{setValueAndDirection('gini')}}>
                    <div>Gini</div>
                    <SortArrow direction={direction} value={value==='gini'} />
                </button>                
                </div>

            {orderedCountries.map((country)=> (
                <Link href={`/country/${country.cca3}`} key={country.name.common}>
                <div className={styles.row} >
                    <div className={styles.name}>{country.flag} {country.name.common}</div>
                    <div className={styles.population}>{country.population}</div>
                    <div className={styles.area}>{country.area}</div>
                    <div className={styles.gini}>{country.gini?Object.values({...country.gini}):'-'}</div>                    
                </div>
                </Link>
            ))}
        </div>
    )
}

export default CountriesTable;