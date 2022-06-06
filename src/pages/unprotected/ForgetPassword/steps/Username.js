import { useEffect, useState } from 'react'
import ActiveTexts from '../../../../components/ActiveTexts/ActiveTexts';
import Button from '../../../../components/Button/Button';
import FormHolder from "../../../../components/FormHolder/FormHolder";
import Materialnput from '../../../../components/MaterialInput/Materialnput';
import styles from "../style.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setUserName as setName } from '../../../../app/operater';
import { useNavigate } from 'react-router-dom';


function Username({ getNext }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUserName] = useState("");
    const [isDisable, setIsDisable] = useState(true);
    const handleUserName = e => {
        setUserName(e.target.value);
    };

    useEffect(()=>{
        document.getElementById("usernamegonext").focus();
    },[]);

    const validater = () => {
        // this regex will verify that username shouldn't contain whitespaces
        var inValid = /\s/;
        if (username.length < 10) {
            return true;
        } else if (inValid.test(username)) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        // console.log("Validating");
        const $result = validater();
        if (!$result) {
            // console.log("Validation Successful");
            setIsDisable($result);
        } else {
            setIsDisable($result);
        }
    }, [username]);

    const onNext = () => {
        dispatch(setName(username));
        getNext(1)
    }

     // press enter key
     useEffect(() => {
        window.onkeyup = (e) => {
          e.key === "Enter" && document.getElementById('next-to-forget').click();
        }
      }, []);

    return (
        <FormHolder title={"Forgot Password"}>
            <Materialnput id={"usernamegonext"} type={"text"} placeholder={"Username123@"} onChange={handleUserName} value={username} />
            <Button needId={"next-to-forget"} icondir='right' onClick={onNext} Src={AiOutlineArrowRight} disable={isDisable} title={"Next"} />
            <p className={styles.text}>Suddenly, remembered my password?<ActiveTexts onClick={e => { navigate("/") }} style={{ display: "inline-block" }} text={"Go to Login"} /></p>
        </FormHolder>
    );
}

export default Username