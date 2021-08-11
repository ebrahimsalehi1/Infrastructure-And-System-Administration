import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {create} from 'jss';
import rtl from 'jss-rtl';
import JssProvider from 'react-jss/lib/JssProvider';
import {MuiThemeProvider, jssPreset} from '@material-ui/core/styles';
import {theme} from 'Utils/Config/theme';
import 'assets/css/animate.css'
import 'assets/css/ibexStyle.css'
import App from 'App';
import {BrowserRouter as Router} from 'react-router-dom';
import Provider from "react-redux/es/components/Provider";
import store,{History} from "@irisa/components-material-v.4/lib/redux/store"
import {SnackbarProvider} from "notistack";
import AtrDataProvider from './Utils/StateManagement/context/index';
import ErrorBoundary from './Components/ErrorBoundary/index';

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

/**
 * initial first states for authentication
 * @type {{authenticated: boolean}}
 */


class IrisaIndex extends Component {
    render() {
        return (
            <Provider store={store}>
                <AtrDataProvider>
                <MuiThemeProvider theme={theme}>
                    <JssProvider jss={jss}>
                        <Router history={History}>
                            <SnackbarProvider maxSnack={10}>
                                <ErrorBoundary>
                                <App/>
                                </ErrorBoundary>
                            </SnackbarProvider>
                        </Router>
                    </JssProvider>
                </MuiThemeProvider>
                </AtrDataProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<IrisaIndex/>, document.getElementById('root'));