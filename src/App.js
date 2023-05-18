import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import AllProduct from "./components/AllProduct";
import Footer from "./components/Footer";
import "./style/app.css"

import {BrowserRouter, Route, Switch} from "react-router-dom"

import MoreDetails from "./components/MoreDetails";
import NotFound from "./components/NotFound";

const App = () => {

    return (

        <BrowserRouter>
            <>
                <Navbar/>

                <Switch>
                    <Route path="/" exact>
                        <Searchbar/>
                        <AllProduct/>
                    <div className="dark-bg"></div>
                    </Route>

                    <Route path="/details/:type">
                        <MoreDetails/>
                    </Route>

                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>

                <Footer/>
            </>
        </BrowserRouter>
    )
}

export default App;