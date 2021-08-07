/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Route, Switch, withRouter} from "react-router-dom";
import Routes from './RouterHumanTasks';
import {styles} from 'assets/jss/style';

function Pages(props) {
    const {classes} = props;

    function setLocalStorage() {
        let urlParams = props.location.pathname.split('/');
        localStorage.setItem('taskName', urlParams[4]);
        localStorage.setItem("access_token", urlParams[7]);
        localStorage.setItem('taskState', urlParams[8]);

        localStorage.setItem("taskTitle", urlParams[9]);
        localStorage.setItem("userToken", urlParams[11]);
    }

    setLocalStorage();

    return (
        <div className={classes.card} style={{
            backgroundColor: '#fff',
            padding: '0 8px',
            boxShadow: '1px 3px 3px #ccc'
        }}>
            {localStorage.getItem("systemContext") !== null &&
            localStorage.getItem("systemContext") === 'IIS' ?
                null:
                <div style={{
                padding: 8,
                borderBottom: '1px solid rgb(206, 206, 206)',
                borderRadius: 4,
                color: 'rgb(0, 156, 230)',
                fontSize: '0.9rem',
                fontWeight: 'bolder',
                textAlign: 'right',
                backgroundColor: '#009ce617',
                margin: '0 -8px 8px'
            }}>

                {props.location.pathname.split('/')[9]}
            </div>}
            <Switch>
                {Routes.filter(prop => (!prop.redirect)).map((prop, key) => {

                    return (prop.children ?
                        prop.children.filter(child => child.type === 'pages').map((child, key) => {
                            return <Route path={child.path} key={key}
                                          render={(props) => <child.component panelCaption={child.name}
                                                                              type="pages" {...props}/>}/>
                        }) : <Route path={prop.path} render={(props) => <prop.component panelCaption={prop.name}
                                                                                        type="pages" {...props}/>}
                                    key={key}/>)

                })}
                <Route render={() => "404"}/>
            </Switch>

        </div>
    );

}

Pages.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Pages));
