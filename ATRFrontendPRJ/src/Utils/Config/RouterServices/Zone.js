import {API_BASE_URL, SUB_SYSTEM_CONTEXT} from "../constants";

export const ZONE_CREATE = {URL:`${API_BASE_URL}/ATR/api/v1.0/saveZoneByAdmin`};

export const ZONE_UPDATE = {URL:`${API_BASE_URL}/ATR/api/v1.0/zone`};

export const ZONE_DELETE = {URL:`${API_BASE_URL}/ATR/api/v1.0/deleteZone/`};

export const ZONE_GET = {URL:`${API_BASE_URL}/ATR/api/v1.0/zoneWithPowerUser/grid?size=1000&page=0&filter=&`};

export const ZONE_LIST = {URL:`${API_BASE_URL}/ATR/api/v1.0/zoneByPermission/list/`};

export const ZONE_APPLICATIONS_GET = {URL:`${API_BASE_URL}/ATR/api/v1.0/zoneApps/`};
