import {API_BFF_START_URL} from "./constants";
import axios from "axios";
import {updateApi, createApi, readApi,deleteApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import {MENU_GRID_GET} from "./RouterServices/Menu";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";

export function ReadApi(requestObject) {
   //alert(requestObject[LOCAL_STORAGE_BFF] ? 'TRUE':"FALSE");
    //console.log('ReadApi',requestObject,requestObject['LOCAL_STORAGE_BFF']);
    if(requestObject['LOCAL_STORAGE_BFF']==false) {
        console.log('ReadApi', 'readApi');
        return readApi({
            method: "GET",
            url: requestObject.url
        });
    }
    else {
        console.log('ReadApi','axios');
        return axios({
            method: "GET",
            url: `${API_BFF_START_URL}/atr-bff/callWebService?accessToken=${localStorage.getItem('access_token')}&urlHeader=${encodeURIComponent(requestObject.url)}`
        });
    }

}

export function CreateApi(requestObject) {
    return createApi({
        method: "POST",
        url: requestObject.url,
        data: requestObject.data
    });
}

export function UpdateApi(requestObject) {
    return updateApi({
        method: "PUT",
        url: requestObject.url,
        data: requestObject.data
    });
}

export function DeleteApi(requestObject) {
    return deleteApi({
        method: "DELETE",
        url: requestObject.url,
        data: requestObject.data
    });
}

export function deleteCacheApi(requestObject){
    return axios({
        method: "DELETE",
        url: `${API_BFF_START_URL}/atr-bff/deleteWebServiceFromCache?urlHeader=${encodeURIComponent(requestObject.url)}`
    });
}
function deleteCache(requestObject,message,onSaveSuccess,onSaveFailed){
    deleteCacheApi(requestObject)
        .then(resCatch=>{
            if(resCatch.status==200){
                if(resCatch.data?.status=='Ok') {
                    showSnack(`${resCatch.data?.message} \n ${message}` , "success", true, 3000);
                    onSaveSuccess();
                }
            }
            else
                showSnack(message, "success", true, 3000);
        })
        .catch(errCatch=>{
            showSnack(`خطا در حذف کلید` , "success", true, 3000);
            onSaveFailed();
        });
}