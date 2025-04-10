import { useNavigate } from "react-router-dom";

function ComingSoon () {
    const navigate = useNavigate();

    return (
        <>  
            <h1>Page Coming Soon!</h1>
            <h3>This page isn't available yet, but it'll rock when it is</h3>
            <button onClick={() => navigate("/home")}>Back To Home</button>
        </>
    );
}

export default ComingSoon