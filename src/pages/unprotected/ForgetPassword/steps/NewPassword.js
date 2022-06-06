import styles from "../style.module.css";
import ActiveTexts from "../../../../components/ActiveTexts/ActiveTexts";
import Button from '../../../../components/Button/Button';
import FormHolder from "../../../../components/FormHolder/FormHolder";
import Materialnput from "../../../../components/MaterialInput/Materialnput";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { needForgotOtp } from "../../../../apis/user";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserWithOperater } from "../../../../app/operater";
import { useNavigate } from "react-router-dom";

function NewPassword({ getNext }) {
    const { username } = useSelector(s => s.operater.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById("newpassword").focus();
    }, []);

    useEffect(() => {
        if (!username) {
            getNext(0);
        }
    }, [username, getNext]);

    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [isDisable, setIsDisable] = useState(true);

    const validater = () => {
        if ((password.length < 10 && confirm_password.length < 10) || password === username) {
            return true;
        }
        else if ((password !== confirm_password) && (password !== "")) {
            return true;
        } else {
            return false;
        }
    };

    const validateMe = useCallback(validater,[confirm_password , password , username]);
    useEffect(() => {
        // console.log("Validating");
        const $result = validateMe();
        if (!$result) {
            // console.log("Validation Successful");
            setIsDisable($result);
        } else {
            setIsDisable($result);
        }
    }, [password, confirm_password , validateMe]);

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfrimPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const onChangePassword = async () => {
        try {
            const { msg, flag, hash, type } = await (await needForgotOtp({ username, password })).data;

            if (flag) {
                toast.success(msg);
                dispatch(setUserWithOperater({ username, hash, type, password }));
                navigate("/otp_verification");
            }
        } catch (error) {
            if (error) {
                toast.error(error.response.data.msg);
                if (error.response.data.msg === "Enter a strong password to make your account more secure") {
                    setPassword("");
                    setConfirmPassword("");
                    document.getElementById("newpassword").focus();
                } else {
                    getNext(0);
                }
            }
        }
    }

    // press enter key
    useEffect(() => {
        window.onkeyup = (e) => {
            if (e.key === "Enter") {
                if (document.getElementById("newpassword") === document.activeElement) {
                    document.getElementById("newconfirmpass").focus();
                } else {
                    document.getElementById('save-pass').click();
                }
            }

            //   e.key === "Enter" && document.getElementById('save-pass').click();
        }
    }, []);

    return (
        <FormHolder title={"Forgot Password"} description={"Create new password here"}>
            <Materialnput id={"newpassword"} value={password} onChange={handlePassword} placeholder={"New Password"} side={"!top"} />
            <Materialnput id={"newconfirmpass"} value={confirm_password} onChange={handleConfrimPassword} placeholder={"Confirm Password"} side={"top"} />

            <Button needId={"save-pass"} onClick={onChangePassword} disable={isDisable} icondir="right" Src={AiOutlineArrowRight} title={"Change Password"} />

            <Button Src={AiOutlineArrowLeft} onClick={() => { getNext(0) }} title={"Go Back"} />
            <p className={styles.text}>Suddenly, remembered my password?<ActiveTexts onClick={e => { navigate("/") }} style={{ display: "inline-block" }} text={"Go to Login"} /></p>
        </FormHolder>
    )
}

export default NewPassword