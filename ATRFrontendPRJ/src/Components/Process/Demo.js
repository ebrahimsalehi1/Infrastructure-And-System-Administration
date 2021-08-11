import React, {useEffect, useState} from 'react';
import RouterHumanTasks from '../../Utils/Config/RouterHumanTasks';
import {Grid, List, ListItem} from '@material-ui/core';
import Divider from "@material-ui/core/es/Divider/Divider";
import FormLabel from "@material-ui/core/FormLabel";

Demo.propTypes = {};

function Component(props) {
    const Component = RouterHumanTasks[props.index].component;
    return <Component/>;
}

function Demo(props) {
    const [componentIndex, setComponentIndex] = useState(localStorage.getItem("componentIndex") ? localStorage.getItem("componentIndex") : 0);

    useEffect(() => {
        localStorage.setItem("taskState", "assignment");
    }, []);

    function switchProccess(index) {
        localStorage.setItem("componentIndex", index);
        setComponentIndex(index);
    }

    return (
        <>
            <Grid container>
                <Grid item md={3} sm={3} xs={3} style={{height: "auto", border: "solid 1px #abc"}}>
                    <List>
                        <FormLabel component="legend">فرم های پایه</FormLabel>
                        {RouterHumanTasks.map(function (route, index) {
                            if (route.id < 100) {
                                return (
                                    <ListItem component={"h6"} onClick={function () {
                                        switchProccess(index)
                                    }} button title={route.title}>
                                        {route.title}
                                    </ListItem>
                                )
                            } else {
                                return ""
                            }
                        })}
                    </List>
                    <Divider/>

                    <List>
                        <FormLabel component="legend">فرم های فرایندی</FormLabel>
                        {RouterHumanTasks.map(function (route, index) {
                            if (100 <= route.id && route.id < 1000) {
                                return (
                                    <ListItem component={"h6"} onClick={function () {
                                        switchProccess(index)
                                    }} button title={route.title}>
                                        {route.title}
                                    </ListItem>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </List>
                    <Divider/>

                    <List>
                        <FormLabel component="legend">دمو ها</FormLabel>
                        {RouterHumanTasks.map(function (route, index) {
                            if (route.id >= 1000) {
                                return (
                                    <ListItem component={"h6"} onClick={function () {
                                        switchProccess(index)
                                    }} button title={route.title}>
                                        {route.title}
                                    </ListItem>
                                )
                            } else {
                                return null;
                            }
                        })}
                    </List>
                </Grid>
                <Grid style={{padding: 10}} item md={9} sm={9} xs={9}>
                    <Component index={componentIndex} match={{params: {flowId: "123", taskId: "123"}}}/>
                </Grid>
            </Grid>
        </>
    );
}

export default Demo;