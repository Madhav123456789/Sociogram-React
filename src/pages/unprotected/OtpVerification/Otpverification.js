// import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from '../../../components/Button/Button';
import FormHolder from '../../../components/FormHolder/FormHolder';
import { authDone, setPageTitle, setUserWithOperater } from "../../../app/operater";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { needForgotOtpVerification, needLoginOtpVerification, needVerify } from "../../../apis/user";
import { setUser } from "../../../app/user";
import Materialnput from "../../../components/MaterialInput/Materialnput";
import ActiveTexts from "../../../components/ActiveTexts/ActiveTexts";

function Otpverification() {
    // initializing dispatch
    const dispatch = useDispatch();
    // initializing navigate
    const navigate = useNavigate();
    // this will make text align of input 
    useEffect(() => {
        // setting page title 
        dispatch(setPageTitle("otp_verification"))
        document.getElementById("otp_input").style.textAlign = "center";
        document.getElementById("otp_input").focus();
    });

    // states
    const [isDisable, setIsDisable] = useState(true);
    const [otp, setOtp] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [countDown, setCountDown] = useState(59);
    const [interval, setinterval] = useState(null);

    // enabling and disabling the btns
    useEffect(() => {
        if (otp.length < 4) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [otp]);

    // importing operater user state from redux
    const { type, email, hash, username, name, password } = useSelector(s => s.operater.user);

    // this will manage count down to resend otp
    useEffect(() => {
        if (isSent) {
            setinterval(
                setInterval(() => {
                    if (countDown > 0) {
                        setCountDown(countDown - 1);
                    } else {
                        setIsSent(false);
                    }
                }, 1000)
            );
        } else {
            clearInterval(interval);
            setCountDown(59);
        };

        console.log("Doing")
    }, [isSent , countDown , interval]);

    // returning back if page refreshed
    useEffect(() => {
        if (!username || !password || !type || !hash) {
            navigate(-1);
        }
    }, [username , password , type , hash , navigate]);

    // this state contain formholder description texts object
    const [typeDescription] =
        useState(
            {
                signup: "Enter otp to get register",
                login: "Enter login otp here",
                forgot: "Enter otp to forgot your password"
            }
        );

    // otp on change hanlder
    function optHandler(e) {
        setOtp(e.target.value.substring(0, 4));
    };

    //this is on click function for verify button used for verify otp via axios api
    const verifyOtp = async () => {
        if (type === "signup") {
            try {
                const data = await (await needVerify({ username, name, email, password, otp, hash })).data;

                const { msg, flag } = data;
                console.log(data);
                if (flag) {
                    toast.success(msg);
                    dispatch(authDone());
                    dispatch(setUser(data.user));
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data.msg);
                    toast.error(error.response.data.msg);
                }
            }
        } else if (type === "login") {
            try {
                const { flag, msg, user } = await (await needLoginOtpVerification({ username, password, otp, hash })).data;

                if (flag) {
                    toast.success(msg);
                    dispatch(authDone());
                    dispatch(setUser(user));
                }
            } catch (error) {
                toast.error(error.response.data.msg);
                navigate(-1);
            }
        } else {
            try {
                const { flag, msg, user } = await (await needForgotOtpVerification({ username, password, otp, hash })).data;

                if (flag) {
                    toast.success(msg);
                    dispatch(authDone());
                    dispatch(setUser(user));
                }

            } catch (error) {
                if (error) {
                    toast.error(error.response.data.msg);
                }
                navigate(-1);
            }
        }
    };

    // this is on click function for resent btn for resending otp
    const resendOtp = async () => {
        if (!isSent) {
            if (type === "signup") {
                try {
                    const data = await (await needVerify({ name, username, email, password })).data;
                    const { flag, msg } = data;

                    // if request fullfilled and response is ok
                    if (flag) {
                        const { type, username, email, hash } = data;
                        toast.success(msg);
                        dispatch(setUserWithOperater({ type, email, hash, username, name, password }));
                        // set it true for disable
                        setIsSent(true);
                    };
                } catch (error) {
                    if (error.response) {
                        toast.error(error.response.data.msg);
                    }
                }
            }
        }
    };

    // press enter key
    useEffect(() => {
        window.onkeyup = (e) => {
          e.key === "Enter" && otp.length===4&& document.getElementById('opt-verify').click()
        }
      }, [otp.length]);

    return (
        <div className={`pageGlobal full_page_center`}>
            <FormHolder title={"Otp Verification"} description={typeDescription && typeDescription[type]}>

                <Materialnput id={"otp_input"} onChange={optHandler} value={otp} placeholder={"1234"} type={"number"} />
                {type !== "forgot" && <ActiveTexts style={isSent ? { color: "#00000075" } : { color: "#0067f6" }} onClick={resendOtp} text={!isSent ? "Resend Otp" : "Resend in " + countDown} />}
                <Button needId={"opt-verify"} onClick={verifyOtp} title={"Verify"} disable={isDisable} />

            </FormHolder>
        </div>
    )
}

export default Otpverification