import {API_BASE_URL, SUB_SYSTEM_CONTEXT} from "../constants";

export const APPLICATION_ROLE_GET = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/applicationRolesByPermission/grid/`
}

export const APPLICATION_ROLE_DELETE = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/deleteApplicationRole/`
}

export const APPLICATION_ROLE_CREATE = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/saveAndAssignApplicationRole`
}

export const APPLICATION_ROLE_UPDATE = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/applicationRoleWithAssignees`
}

export const APPLICATION_ROLE_LIST = {
    URL: `${API_BASE_URL}/ATR/api/v1.0/applicationRolesByPermission/`
}