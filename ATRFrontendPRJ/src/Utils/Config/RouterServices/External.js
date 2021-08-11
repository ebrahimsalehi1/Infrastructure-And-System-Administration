import {API_BASE_URL} from "../constants";

export const USERS_GET ={
    URL:`${API_BASE_URL}/OID/api/v1.0/users/search/?&size=1000&page=0&filter=`
} ;

// export const GROUPS_POST = {
//     URL:`${API_BASE_URL}/OID/api/v1.0/groups/search?&size=999999&page=0`
// } ;

export const GROUPS_POST = groupDescription => {
    return {URL:`${API_BASE_URL}/OID/api/v1.0/groups?&size=1000&page=0&filter=%5B%22description%22%2C%20contains%2C%20%22${groupDescription}%22%5D`}
}