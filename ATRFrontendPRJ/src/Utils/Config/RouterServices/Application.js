import {API_BASE_URL, SUB_SYSTEM_CONTEXT} from "../constants";

export const APPLICATION_CREATE = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/saveAppByPowerUser`
}

export const APPLICATION_UPDATE = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/updateApplication`
}

export const APPLICATION_DELETE = {
    URL:`${API_BASE_URL}/ATR/api/v1.0/deleteApplication/`
}

export const APPLICATION_GET = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/applicationByPermission/grid/`
}