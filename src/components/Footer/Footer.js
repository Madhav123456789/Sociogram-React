import styles from "./Footer.module.css";
import LinkText from "../LinkText/LinkText";

function Footer({ history = [], name = [], redirect = [] , children}) {
    
    return (
        <footer className={styles.foot}>
            <div className={styles.itemHolder}>
                {name.map((item, index) => {
                    return <LinkText className={styles.addMargin} key={index} history={history[index]} target={redirect[index]} text={item} />
                })}
            </div>
            {children}
        </footer>
    )
}

export default Footer