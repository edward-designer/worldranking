import styles from "./Loading.module.css";

const loader = ({showLoading}) => {
    return (
      <div className={showLoading==='show'?styles.loaderContainer:styles.loaderContainerHide}>
        <div className={styles.loader}></div>
      </div>
    )
}

export default loader;