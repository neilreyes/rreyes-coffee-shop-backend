import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import PlaceEntry from "./components/PlaceEntry";
import NotFound from "./components/NotFound";
import { PlaceProvider } from "./context/placeContext";

function App() {
    return (
        <PlaceProvider>
            <Router>
                <div>
                    <Header />
                    <div className='container mx-auto'>
                        <Switch>
                            <Route exact path='/' component={Landing} />
                            <Route
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <Route
                                exact
                                path='/places/:_id'
                                component={PlaceEntry}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </Router>
        </PlaceProvider>
    );
}

export default App;
