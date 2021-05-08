import React from "react";
import {Route, Switch} from "react-router-dom";

import Login from '../pages/Login';
import Register from '../pages/Register';
import StudentApplication from '../pages/StudentApplication';
import InvestorApplication from '../pages/InvestorApplication';
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import StudentDetails from "../pages/StudentDetails"
import GrantStatus from "../pages/GrantStatus";
import Vote from "../pages/Vote";
import ProposalDetail from "../pages/ProposalDetail";
import EditStudentApplication from "../pages/EditStudentApplication";
import Deposit from "../pages/Deposit";

import AdminDashboard from "../pages/AdminDashboard";

const Content = () => {

    return (
        <Switch>
            <>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/student-application" component={StudentApplication}/>
                <Route path="/edit/application" component={EditStudentApplication}/>
                <Route path="/investor-application" component={InvestorApplication}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/students" component={Students}/>
                <Route path="/grant-status" component={GrantStatus}/>
                <Route path="/vote" component={Vote}/>
                <Route path="/proposal/:proposal_id" component={ProposalDetail}/>
                <Route path="/deposit" component={Deposit}/>
                <Route path="/student/:student_id"
                                   component={StudentDetails}/>
                <Route path="/admin-dashboard" component={AdminDashboard}/>
                <Route exact path="/" component={Login}/>
            </>
        </Switch>
    );
}

export default Content;
