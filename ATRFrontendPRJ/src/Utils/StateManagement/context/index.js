
import React, {createContext, useContext, useReducer} from 'react';
import {initialState} from './initialStates';
//import {ContextCache} from "../../../Context";

/**
 * crate login context api
 * @type {React.Context<string>}
 */
//export const LoginContext = createContext('');
export const ContextCache = React.createContext();

/**
 * create login provider
 * @param reducer
 * @param initialState
 * @param children
 * @returns {*}
 * @constructor
 */

function reducerFun(state,action){
    console.log('reducerFun',action)
    switch(action.type){
        case 'zoneWithPowerUser':
            return {
                ...state,
                zoneWithPowerUser:action.data
            }
            break;
        case 'zoneByPermission':
            return {
                ...state,
                zoneByPermission:action.data
            }
            break;
        case 'applicationByPermission':
            return {
                ...state,
                applicationByPermission:action.data
            }
            break;
        case 'applicationRolesByPermission':
            return {
                ...state,
                applicationRolesByPermission:action.data
            }
            break;
        case 'menuByPermission':
            return {
                ...state,
                menuByPermission:action.data
            }
            break;
        case 'zoneApps':
            const newData = {zoneId: action.zoneId, data: action.data};
            const zoneApps = state.zoneApps;
            const foundZoneApps = zoneApps.filter(item=>item.zoneId===action.zoneId);

            if(foundZoneApps.length>0) {
                const foundIndex = state.zoneApps.indexOf(foundZoneApps[0]);

                if (foundIndex !== undefined && foundIndex >= 0) {
                    state.zoneApps.splice(foundIndex, 1, newData);
                } else {
                    state.zoneApps = [];
                }
            }
            else{
                state.zoneApps.push(newData)
            }

            return {
                ...state
            }
            break;
        case 'currentData':
            return {
                ...state,
                currentData:{zoneId:action.zoneId,appId:action.appId}
            };

            break;
        default:
            return {...state};
            break;
    }
}

export default function AtrDataProvider({children}){

    const [state,dispatch] = React.useReducer(reducerFun,initialState);

    return (
            <ContextCache.Provider value={{atrState:state,atrDispatch:dispatch}}>
                {children}
            </ContextCache.Provider>
        );
}

// export const LoginProvider = ({reducer, initialState, children}) =>(
//     <LoginContext.Provider value={useReducer(reducer, initialState)}>
//         {children}
//     </LoginContext.Provider>
// );

//export const useLoginValue = () => useContext(LoginContext);

// export function useLoginStateValue(){
//     useContext(LoginStateContext);
// }
