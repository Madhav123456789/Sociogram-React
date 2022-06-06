import { useEffect, useMemo, useState } from "react";
import styles from "./Materialnput.module.css";

function Materialnput({ side, type, value, onChange, id, groups, placeholder, increamentVal, max, showOnType, min }) {
    // this will set and remove box shadow of input texts
    function btnTrans(e) {
        e.target.classList.add(styles.shadow);
        setTimeout(() => {
            e.target.classList.remove(styles.shadow)
        }, 5000)
    };

    // this state for min-max text style color
    const [color, setColor] = useState("red");

    // cheking if value equals or greater than min then change min-max text color green else red
    useEffect(() => {
        if (value.length >= min) {
            setColor("green");
        } else {
            setColor("#ff0000ba");
        }
    }, [increamentVal]);

    return (
        <div className={styles.inputHolder}>
            <input minLength={5} maxLength={max} autoComplete="" onClick={btnTrans} style={side ? side == "top" ? { borderTopLeftRadius: "0px", borderTopRightRadius: "0px", marginBottom: "5px" } : { borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", marginTop: "5px" } : { margin: "5px 0px" }}
                placeholder={placeholder} type={type} value={String(value)} onChange={onChange} id={id} className={`${styles.input} ${groups}`} />



            {showOnType && <div style={{ color: color }} className={styles.minMax}>{`${increamentVal}/${max}`}</div>}
        </div>
    );
}

export default Materialnput;