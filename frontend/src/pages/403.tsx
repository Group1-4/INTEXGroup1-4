import { useNavigate } from "react-router-dom";

function Denied () {
    const navigate = useNavigate();
    return(
        <>
        <h1>Access Denied</h1>
        <h3>Please log in</h3>
        <button onClick={() => navigate("/login")}>Login</button>
      </>

    );

}
export default Denied