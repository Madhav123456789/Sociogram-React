import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { authDone } from "../../app/operater";
import { setUser } from "../../app/user";

export const useReloading = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                // function will be use to Refreshing the user
                const response = await axios.get("http://localhost:5001/user/refresh" , {
                    withCredentials:true
                });

                const {flag} = await response.data;

                if (flag) {
                    dispatch(authDone());
                    dispatch(setUser(response.data.user));
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        })();
    }, [dispatch]);
    return loading;
}