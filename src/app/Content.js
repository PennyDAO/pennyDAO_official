import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "../pages/Home";
import Login from '../pages/Login';
import Register from '../pages/Register';
import StudentApplication from '../pages/StudentApplication';
import InvestorApplication from '../pages/InvestorApplication';
import Dashboard from "../pages/Dashboard";

const Content = () => {

    return (
        <div className="content">
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/student-application" component={StudentApplication}/>
                <Route path="/investor-application" component={InvestorApplication}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
    );
}

export default Content;
