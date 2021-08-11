/* eslint-disable array-callback-return */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Route, Switch, withRouter} from "react-router-dom";
import Routes from './RouterHumanTasks';
import {styles} from 'assets/jss/style';

function Basic(props) {
    const {classes} = props;

    function setLocalStorage() {
        let urlParams = props.location.pathname.split('/');
        localStorage.setItem("access_token", urlParams[4]);
        localStorage.setItem('userToken', urlParams[5]);
    }

    setLocalStorage();

    return (
        <div className={classes.card}>
            <Switch>
                {Routes.filter(prop => (!prop.redirect)).map((prop, key) => {

                    return (prop.children ?
                        prop.children.filter(child => child.type === 'basic').map((child, key) => {
                            return <Route path={child.path} key={key}
                                          render={(props) => <child.component panelCaption={child.name}
                                                                              type="basic" {...props}/>}/>
                        }) : <Route path={prop.path} render={(props) => <prop.component panelCaption={prop.name}
                                                                                        type="basic" {...props}/>}
                                    key={key}/>)

                })}
                <Route render={() => "404"}/>
            </Switch>
        </div>
    );

}

Basic.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Basic));
