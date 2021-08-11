import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Pages from "./Utils/Config/Pages";
import {SUB_SYSTEM_CONTEXT} from "./Utils/Config/constants";
//import {SUB_SYSTEM_CONTEXT} from "@irisa/components-material-v.4/lib/config/constants";
// import SnackBar from "@irisa/components-material-v.4/lib/SnackBar";
// import Loading from "@irisa/components-material-v.4/lib/Loading";
import Demo from "./Components/Process/Demo";
import {Button} from "@material-ui/core";
import Basic from "./Utils/Config/Basic";

/**
 * Main File
 * @returns {*}
 * @constructor
 */
function App() {
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': ["application/json", "application/x-www-form-urlencoded"],
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'sidebar_collapsed=false',
                'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6cGFzc3dvcmQ='
            },
            body: data // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

    return (
        <div className="App">
            {/* <SnackBar/> */}
            {/* <Loading/> */}
            <Switch>
                <Route path={SUB_SYSTEM_CONTEXT + "/pages"} render={(props) => <Pages  {...props}/>}/>
                <Route path={SUB_SYSTEM_CONTEXT + "/basic"} render={(props) => <Basic  {...props}/>}/>
                {process.env.REACT_APP_CUSTOM_ENV === 'envDevLocal' || process.env.REACT_APP_CUSTOM_ENV === 'envTestLocal' ?
                    <Route path={"/"}>
                        <Button variant={"contained"} fullWidth onClick={() => {
                            postData("http://bpmdev.msc.ir/oauth/token", 'scope=&username=90007&password=12345678&grant_type=password').then(res => {
                                localStorage.setItem("access_token", res.access_token);
                                localStorage.setItem("userToken", "90007");
                                window.location.reload();

                            })
                        }}>
                            دریافت توکن جدید
                        </Button>
                        <Demo/>

                    </Route> : null}
                <Route render={() => "404"}/>

            </Switch>
        </div>
    );
}

export default App;
