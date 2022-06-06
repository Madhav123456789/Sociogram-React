import styles from "./ActiveTexts.module.css";

function ActiveTexts({text , onClick , style}) {
  return (
    <p style={style} className={styles.ActiveTexts} onClick={onClick}>{text}</p>
  )
}

export default ActiveTexts