export const OAUTH_URL = process.env.REACT_APP_OAUTH_URL;
export const PERSON_BASE_URL = process.env.REACT_APP_PERSON_BASE_URL;
export const BPMS_URL = process.env.REACT_APP_BPMS_URL;
export const API_KAR_BACK_URL = process.env.REACT_APP_API_KAR_URL;
export const API_KAR_FRONT_URL = `${process.env.REACT_APP_API_TIMELINE_URL}${localStorage.getItem("systemContext") !== null ? `/${localStorage.getItem("systemContext")}` : '/KAR'}`;
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const API_OCM_URL = process.env.REACT_APP_API_OCM_URL;
export const API_BFF_START_URL = process.env.REACT_APP_API_BFF_START_URL;

export const ACCESS_TOKEN = 'access_token';
export const TOKEN_TYPE = 'token_type';
export const REFRESH_TOKEN = 'refresh_token';
export const BPMS_USER_TOKEN = 'userToken';
export const LOGGED_IN = 'loggedIn';
export const EXPIRE_IN = 'expire_in';
export const ACCESS_TOKEN_START_TIME = 'access_token_start_time';
export const ID_TIMEOUT = 'id_timeout';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER = 'SET_USER';
export const TASK_STATE = 'taskState';

export const SUB_SYSTEM_CONTEXT = '/ATR';

export const LOCAL_STORAGE_BFF = 'BFF_ATR';