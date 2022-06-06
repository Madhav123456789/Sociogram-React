import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { needActivation } from '../../apis/user';
import FormHolder from '../../components/FormHolder/FormHolder';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUser } from '../../app/user';
import style from "./style.module.css";
import { setPageTitle } from '../../app/operater';

function SelectBirthDay() {
    // initializing dispatch
    const dispatch = useDispatch();

    // states
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [$31Days, set$31Days] = useState(["Jan", "Mar", "May", "July", "Aug", "Oct", "Dec"]);
    const [invalYear, setInvalYear] = useState([2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]);

    const [yearsArray, setYearsArray] = useState([
        1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022
    ].reverse());

    const isLeapYear = useCallback(
        // this function is used to check leap year or not
        function isLeapYear(year) {
            if (year % 4 == 0) {
                return true;
            } else {
                return false;
            }
        }, []);

    // handlers
    const dateHandler = useCallback(function dateHandler(e) {
        setDate(e.target.value);
    }, []);

    const monthHandler = useCallback(
        function monthHandler(e) {
            setMonth(e.target.value);
        }
        , []);

    const yearHandler = useCallback(function yearHandler(e) {
        setYear(e.target.value);
    }, []);

    // Arrays
    const [dateArray, setDateArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);

    // all date logic here
    useEffect(() => {
        // setting title of the page
        dispatch(setPageTitle("select birthday"));
        if ($31Days.includes(month) || month.length < 1) {
            setDateArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
        } else if (month === "Feb") {
            if (isLeapYear(year)) {
                setDateArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
            } else {
                setDateArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
            }
        } else {
            setDateArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
        }

        console.log(month);
    }, [month, year]);

    const [monthArray, setMonthArray] = useState([
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]);

    // this is on click function for activate button
    const activateAccount = async () => {
        try {
            const { flag, msg, user } = await (await needActivation({ date, month, year })).data;
            if (flag) {
                toast.success(msg);
                dispatch(setUser(user));
            }
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <div className={`full_page_center pageGlobal`}>
            <FormHolder title={"Your BirthDay"} description={"Enter your age to activate your account"}
                btn={{ title: "Activate", strict: "18vw", onClick: activateAccount }}>
                <div className={style.bd_lable_cont}>
                    <label htmlFor="date">Date</label>
                    <label htmlFor="month">Month</label>
                    <label htmlFor="year">Year</label>
                </div>


                <div className={style.bd_cont}>

                    <select onChange={dateHandler} value={date} className={style.select} name="date" id="date">
                        {dateArray.map((item) => {
                            return <option key={item} value={item}>{item}</option>
                        })}
                    </select>

                    <select onChange={monthHandler} value={month} className={style.select1} name="month" id="month">
                        {monthArray.map((item) => {
                            return <option key={item} value={item}>{item}</option>;
                        })}
                    </select>

                    <select onChange={yearHandler} value={year} className={style.select1} name="year" id="year">
                        {yearsArray.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
                </div>
            </FormHolder>
        </div>
    )
}

export default SelectBirthDay