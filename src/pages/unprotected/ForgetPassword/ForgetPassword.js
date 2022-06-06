import Username from './steps/Username';
import NewPassword from './steps/NewPassword';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../app/operater';

const steps = {
  0: Username,
  1: NewPassword
}

function Forgotpassword() {
  // initializing dispatch
  const dispatch = useDispatch();
  useEffect(()=>{
    // setting title
    dispatch(setPageTitle("forgot password"))
  })
  const [step, setStep] = useState(0);
  const Component = steps[step];

  return (
    <>
      <div id="m-t" className={`pageGlobal full_page_center`}>
        <Component getNext={setStep} />
      </div>
    </>
  )
}

export default Forgotpassword