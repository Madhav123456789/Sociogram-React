import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageCoverTitle } from "../../../app/pagecover";
import style from "./CreatePost.module.css";
import Step1 from "./Steps/Step1/CreatePost";
import Step2 from "./Steps/Step2/EditPost";

const Steps = {
  1: Step1,
  2: Step2
}

// this component will handle create post and edit post page
function CreatePost({ getTitle }) {
  // using dispatch
  const dispatch = useDispatch();
  // this will manage steps
  const [step, setStep] = useState(1);

  const Component = Steps[step];

  useEffect(() => {
    if (step === 1) {
      dispatch(setPageCoverTitle("Create A Post"));
    } else if (step === 2) {
      dispatch(setPageCoverTitle("Upload Post"));
    }
  }, [step]);

  return (
    <Component putState={setStep} />
  )
}

export default CreatePost