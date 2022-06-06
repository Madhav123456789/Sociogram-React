import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import Footer from '../../../components/Footer/Footer';
import merges from "../merges.module.css";
import { FaFacebookSquare } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import Button from '../../../components/Button/Button';
import FormHolder from '../../../components/FormHolder/FormHolder';
import LinkText from '../../../components/LinkText/LinkText';
import Materialnput from '../../../components/MaterialInput/Materialnput';
import RedButton from '../../../components/RedButton/RedButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { needOtp } from "../../../apis/user";
import { setPageTitle, setUserWithOperater } from "../../../app/operater";

function Signup() {
  // initializing dispatch
  const dispatch = useDispatch();
  // initializing navigate
  const navigate = useNavigate();

  // Starting page logics
  useEffect(() => {
    // setting page title
    dispatch(setPageTitle("signup"))
    document.getElementById("m-t").style.marginTop = "60px";
    document.getElementById("m-b").style.marginBottom = "70px";
    document.getElementById("001_uname").focus();
  }, []);

  // states
  const [name, setName] = useState("");
  const [Username, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  // this function will validate the states and return false if validate success
  const validater = () => {
    // this regex will verify that username shouldn't contain whitespaces
    var inValid = /\s/;
    var isName = /^[a-zA-Z]+$/g
    if (name.length < 5) {
      return true;
    } else if (Username.length < 10) {
      return true;
    } else if (!isName.test(name)) {
      return true;
    }
    else if (inValid.test(Username)) {
      return true;
    } else if (Email.length < 10) {
      return true;
    } else if (password.length < 10 && confirm_password.length < 10) {
      return true;
    }
    else if (password !== confirm_password && password !== "") {
      return true;
    } else if (password === Username) {
      toast.error("Password should be different from username");
      return true;
    } else {
      return false;
    }
  };

  // managing login button state using validater function 
  useEffect(() => {
    // console.log("Validating");
    const $result = validater();
    if (!$result) {
      // console.log("Validation Successful");
      setIsDisable($result);
    } else {
      setIsDisable($result);
    }
  }, [name, Email, Username, password, confirm_password]);

  // Handlers
  const nameHandler = (e) => {
    setName(e.target.value);
  }

  const usernameHandler = async (e) => {
    setUserName(e.target.value);
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  }

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  }

  // this is onclick function for support button
  const signup = async () => {
    try {
      const data = await (await needOtp({ name, username: Username, email: Email, password })).data;
      const { flag, msg } = data;

      // if request fullfilled and response is ok
      if (flag) {
        const { type, username, email, hash } = data;
        toast.success(msg);
        dispatch(setUserWithOperater({ type, email, hash, username, name, password }));
        navigate("/otp_verification");
      };
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  }

  // press enter key
  useEffect(() => {
    window.onkeyup = (e) => {
      // for uname validation
      var inValid = /\s/;
      // for name validation
      var isName = /^[a-zA-Z]+$/g;

      const field1 = document.getElementById('001_uname');
      const field2 = document.getElementById('001_name');
      const field3 = document.getElementById('001_email');
      const field4 = document.getElementById('001_pass');
      const field5 = document.getElementById('001_cpass');

      if (e.key === "Enter") {
        if (field1 === document.activeElement && field1.value.length >= 10 && !inValid.test(field1.value)) {
          // activating field2
          field2.focus();
        } else if (field2 === document.activeElement && field2.value.length >= 5 && isName.test(field2.value)) {
          // focus move to next field
          field3.focus();
        } else if (field3 === document.activeElement && field3.value.length >= 10) {
          // focus move to next field
          field4.focus();
        } else if (field4 === document.activeElement && field4.value.length >= 10) {
          // focus move to next field
          field5.focus();
        } else if (field5 === document.activeElement && field5.value.length >= 10 && field4.value === field5.value && field4.value !== field1.value) {
          // clicking the button
          document.getElementById('signup-traditionally').click();
        }
      }
    }
  }, []);



  return (
    <div id="m-t" className={`pageGlobal`}>
      <FormHolder title={"Sociogram"} description={"Signup to make new freinds and also make fun with your freinds and family"}>
        <Materialnput id={"001_uname"} onChange={usernameHandler} value={Username} type={"text"} placeholder={"Username"} />
        <Materialnput id={"001_name"} onChange={nameHandler} value={name} type={"text"} placeholder={"Name"} />
        <Materialnput id={"001_email"} onChange={emailHandler} value={Email} type={"text"} placeholder={"Email"} />
        <Materialnput id={"001_pass"} onChange={passwordHandler} value={password} type={"text"} placeholder={"Password"} />
        <Materialnput id={"001_cpass"} onChange={confirmPasswordHandler} value={confirm_password} type={"text"} placeholder={"Confirm Password"} />
        <Button needId={'signup-traditionally'} title={"Signup"} strict={"18vw"} onClick={signup} disable={isDisable} />
        <p className={style.agreementParagraph}>By singingup, you agree to our <LinkText target={"/agreement/termandconditions"} history={true} text={"Terms & Conditions"} /> and <LinkText target={"/agreement/datapolicy"} history={true} text={"Data Policy"} /> </p>
        <p>--------OR--------</p>
        <Button title={"Login with Facebook"} strict={"18vw"} Src={FaFacebookSquare} />
        <RedButton title={"Login with Google"} strict={"18vw"} Src={AiOutlineGoogle} />
      </FormHolder>

      <FormHolder id={"m-b"} description={"Do you have already an existing account?"}>
        <Button workAsLink={"/"} title={"Login"} strict={"18vw"} />
      </FormHolder>

      <Footer name={["Blogs", "About", "Job", "Api", "Priacy Policy", "Terms And Conditions", "Coming Events", "Help", "Customer Care", "Credits"]} redirect={["/blogs", "/sitemeta/about"]}>
        <div className={merges.footerRight}>All Copyrights Reserved By Sociography&copy;</div>
      </Footer>
    </div>
  )
}

export default Signup