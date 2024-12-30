
import { Link,useLocation } from "react-router-dom";

export default function Header() {

    const location = useLocation();


    return (
        <header>
            <h1>Clonix <br/> API Control</h1>
            <Link to="/" className={location.pathname == "/" ? "active" : ""}>Main</Link>
            <Link to="/chipDispenser" className={location.pathname == "/chipDispenser" ? "active" : ""}>Chip Dispenser</Link>
            <Link to="/reCycler" className={location.pathname == "/reCycler" ? "active" : ""}>Cache Recycler</Link>
        </header>
    )
}