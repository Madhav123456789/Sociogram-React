import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { needLoginOtp } from '../../../apis/user';
import Button from '../../../components/Button/Button';
import FormHolder from '../../../components/FormHolder/FormHolder'
import LinkText from '../../../components/LinkText/LinkText';
import Materialnput from '../../../components/MaterialInput/Materialnput';
import RedButton from '../../../components/RedButton/RedButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPageTitle, setUserWithOperater } from '../../../app/operater';
import { useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import merges from "../merges.module.css";
import Footer from '../../../components/Footer/Footer';


function Login() {
  // initializing dispatch
  const dispatch = useDispatch();
  // initializing navigate
  const navigate = useNavigate();

  // states
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    // setting page title
    dispatch(setPageTitle("login"));
    document.getElementById("login-email").focus();
    document.getElementById("m-t").style.marginTop = "60px";
    document.getElementById("m-b").style.marginBottom = "70px";
  }, []);

  // this function will validate the states and return false if validate success
  const validater = () => {
    // this regex will verify that username shouldn't contain whitespaces
    var inValid = /\s/;

    if (username.length < 10) {
      return true;
    }
    else if (inValid.test(username)) {
      return true;
    } else if (password.length < 10 || password === username) {
      return true;
    }
    else {
      return false;
    }
  };

  // managing login button state using validater function 
  useEffect(() => {
    const $result = validater();
    if (!$result) {
      // console.log("Validation Successful");
      setIsDisable($result);
    } else {
      setIsDisable($result);
    }
  }, [username, password]);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  // this is onclick function for login button
  const login = async () => {
    // logging user
    try {
      const data = await (await needLoginOtp({ username, password })).data;
      const { flag } = data;
      if (flag) {
        const { msg, type, username, hash } = data;
        toast.success(msg);
        dispatch(setUserWithOperater({ type, username, hash, password }));
        navigate("/otp_verification");
      }
    } catch (error) {
      if (error) {
        toast.error(error.response.data.msg);
        // if error then reset fields
        setUserName("");
        setPassword("");
        // re focus to the username input
        document.getElementById("login-email").focus();
      }
    }
  };

  // press enter key
  useEffect(() => {
    window.onkeyup = (e) => {
      if (e.key === "Enter") {
        // if username input && it's value greater than 9 go to password input
        if (document.getElementById("login-email") === document.activeElement && document.getElementById("login-email").value.length >= 10) {
          document.getElementById("login-password").focus();
        } else if (document.getElementById("login-password") === document.activeElement && document.getElementById("login-password").value.length >= 10) {
          document.getElementById('login').click();
        }
      }
      // e.key === "Enter" && document.getElementById('login').click();
    }
  }, []);

  return (
    <>
      <div className={`pageGlobal`}>
        <FormHolder id={"m-t"} title={"Sociogram"} description={"Login to meet and fun with your freinds & family"}>
          <Materialnput id={"login-email"} type={"text"} onChange={handleUserName} value={username} side={"!top"} placeholder={"Username or Email"} />
          <Materialnput id={"login-password"} type={"text"} onChange={handlePassword} value={password} side={"top"} placeholder={"Password"} />
          <Button needId={'login'} disable={isDisable} onClick={login} title={"Login"} strict={"18vw"} />
          <p>--------OR--------</p>
          <Button title={"Signup"} workAsLink={"/signup"} strict={"18vw"} />
          <LinkText text={"Forgot Password"} history={true} target={"/forgotpassword"} />
        </FormHolder>


        <FormHolder id={"m-b"} description={"Login with easy ways that are given below!"}>
          <RedButton title={"Login with Google"} strict={"18vw"} Src={AiOutlineGoogle} />
          <Button title={"Login with Facebook"} strict={"18vw"} Src={FaFacebookSquare} />
        </FormHolder>

        <Footer name={["Blogs", "About", "Job", "Api", "Priacy Policy", "Terms And Conditions", "Coming Events", "Help", "Customer Care", "Credits"]} redirect={["/blogs", "/sitemeta/about"]}>
          <div className={merges.footerRight}>All Copyrights Reserved By Sociography&copy;</div>
        </Footer>
      </div>
    </>
  )
}

export default Login