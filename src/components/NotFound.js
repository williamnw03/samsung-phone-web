import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory()

    history.push("/")

    return ( 
        <>
        
        <p className="page-not-found">Page Not Found</p>
        </>
     );
}
 
export default NotFound;