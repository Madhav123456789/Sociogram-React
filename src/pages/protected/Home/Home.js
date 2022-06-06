import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../app/operater";
import style from "./style.module.css";

function Home() {
  // initializing dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    // setting page title
    dispatch(setPageTitle("Home"));
  }, []);
  
  return (
    <div>Home</div>
  )
}

export default Home