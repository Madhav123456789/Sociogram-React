import styles from "./LinkText.module.css";
import { useNavigate } from "react-router-dom";

function LinkText({ text, target , className}) {
    const navigate = useNavigate();

    function workAsLink() {
        if (target) {
           navigate(target);
        }
    }

    return (
        <span onClick={workAsLink} className={`${styles.linktext} ${className}`}>
            {text.substring(0, 20)}
        </span>
    )
}

export default LinkText