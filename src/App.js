import './App.css';

import React from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Login from "./Login";
import Users from "./Users";
import User  from "./User";

function App() {
    const routes = [
        {
            exact: true,
            path: "/",
            component: <Login/>

        },
        {
            path: "/Users",
            exact: true,
            component: <Users/>

        },
        {
            path: "/User/:id",
            exact: true,
            component: <User/>

        },
    ];
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>{
                    routes.map(route => (
                        <Route
                            exact={route.exact}
                            path={route.path}
                            element={route.component}
                            key={route.path.toString()}
                        />
                    ))
                }
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
