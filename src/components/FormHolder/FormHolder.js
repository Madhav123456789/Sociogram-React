import Button from "../Button/Button";
import styles from "./FormHolder.module.css";

const FormHolder = ({children , title , description , btn , center , id}) => {
  
  return (
    <div id={id} style={center&&{justifyContent:"center" , alignItems:"center"}} className={styles.formHolder}>
      {title&&<h2 className={styles.title}>{title.substring(0, 17)}</h2>}
      {description&&<p className={styles.description}>{description}</p>}
      {children}
      {btn&&<Button onClick={btn.onClick} title={btn.title} Src={btn.src} setHead={btn.setHead} 
      strict={btn.strict} disable={btn.disable}/>}
    </div>
  )
}

export default FormHolder