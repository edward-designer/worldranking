import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import styles from "./CountriesTable.module.css";
import { useState } from "react";

const orderBy = (countries,value,direction) => {
    if(direction === "asc"){
        return [...countries].sort((a, b) =>{return value==='name'? a.name.common.localeCompare(b.name.common, 'de') : a[value] - b[value] })  // sort Å as A
    }
    if(direction === "desc"){
        return [...countries].sort((a, b) => {return value==='name'? b.name.common.localeCompare(a.name.common, 'de') : b[value] - a[value] })
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
            </div>

            {orderedCountries.map((country)=> (
                <div className={styles.row} key={country.id}>
                    <div className={styles.name}>{country.name.common}</div>
                    <div className={styles.population}>{country.population}</div>
                </div>
            ))}
        </div>
    )
}

export default CountriesTable;