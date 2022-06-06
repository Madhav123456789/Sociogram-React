import { Navigate /*,useLocation*/ } from "react-router-dom";

class ProtectedRotes {

    Guest({ isAuth , children }) {
        return isAuth ? <Navigate to="/home" /> : children;
    }

    SemiProtected({ isAuth , user , children }) {
        return !isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? children : <Navigate to="/home" />;
    }

    Protected({isAuth , user , children }) {
        return !isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? <Navigate to="/activate" />:children
        ;
    }
}

export default new ProtectedRotes();
