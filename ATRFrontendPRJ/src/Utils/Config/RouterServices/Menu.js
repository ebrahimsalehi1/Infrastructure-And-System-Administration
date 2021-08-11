import {API_BASE_URL, SUB_SYSTEM_CONTEXT} from "../constants";

export const MENU_GRID_GET = {
    URL: `${API_BASE_URL}/MNU/api/v1.0/menuByPermission/`
};

export const MENU_UPDATE = {
    URL: `${API_BASE_URL}/MNU/api/v1.0/updateMenuWithAssignee`
};

export const MENU_DELETE = {
    URL: `${API_BASE_URL}/MNU/api/v1.0/deleteMenu/`
}

export const MENU_CREATE = {
    URL: `${API_BASE_URL}/MNU/api/v1.0/saveAndAssignMenu`
}
export const MENU_PRIORITY_UPDATE = {
    URL: `${API_BASE_URL}/MNU/api/v2.0/priorityOfMenu`
}


