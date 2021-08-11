import React from 'react';
import Dialog from "../../Dialog";
//import Button from "@material-ui/core/Button";
import Button from '../../General/Button';
// import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
//import {createApi, deleteApi, updateApi,readApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import {API_BASE_URL, LOCAL_STORAGE_BFF} from "../../../Utils/Config/constants";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import TextField from "@irisa/components-material-v.4/lib/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
//import ConfirmationDialog from "@irisa/components-material-v.4/lib/ConfirmationDialog";
import ConfirmationDialog from "../../General/ConfirmationDialog";
//import Select from "@irisa/components-material-v.4/lib/Select";
import Select from "@material-ui/core/Select";
import UsersGroupsApprolesSearch from '../RoleManagement/UsersGroupsApprolesSearch';
import {makeStyles} from '@material-ui/styles';
//import {ContextCache} from "../../../Context";
import {ContextCache} from "../../../Utils/StateManagement/context/index";
import {
    APPLICATION_CREATE,
    APPLICATION_DELETE, APPLICATION_GET,
    APPLICATION_UPDATE
} from "../../../Utils/Config/RouterServices/Application";
import {ZONE_LIST} from "../../../Utils/Config/RouterServices/Zone";
import {CreateApi, DeleteApi, deleteCacheApi, ReadApi, UpdateApi} from "../../../Utils/Config/CallServiceRouter";
import {MENU_GRID_GET} from "../../../Utils/Config/RouterServices/Menu";

const useStyle = makeStyles(theme=>({
    root:{
        margin:2,
    }
}));

export default function Application(props) {

    const classes = useStyle();

    const {whichCompShow,rowData,onClose,onOperationSuccess,onOperationFail,onLoadFailed,isAdmin,columns,title} = props;

    const [applicationId,setApplicationId] = React.useState(rowData.applicationId ? (whichCompShow==='add' ? '':rowData.applicationId) :'');
    const [namEnCaptionApp,setNamEnCaptionApp] = React.useState(rowData.namEnCaptionApp ? (whichCompShow==='add' ? '':rowData.namEnCaptionApp) :'');
    const [namFaCaptionApp,setNamFaCaptionApp] = React.useState(rowData.namFaCaptionApp ? (whichCompShow==='add' ? '':rowData.namFaCaptionApp) :'');
    const [namCreatorUserName,setNamCreatorUserName] = React.useState(rowData.namCreatorUserName ? (whichCompShow==='add' ? '':rowData.namCreatorUserName) :'');
    const [desCreatorDisplayName,setDesCreatorDisplayName] = React.useState(rowData.desCreatorDisplayName ? (whichCompShow==='add' ? '':rowData.desCreatorDisplayName) :'');
    const [flgStatusApp,setFlgStatusApp] = React.useState(rowData.flgStatusApp ? rowData.flgStatusApp :true);
    const [zoneId,setZoneId] = React.useState(rowData.zoneId ? (whichCompShow==='add' ? []:rowData.zoneId) :[]);
    const [powerUsers,setPowerUsers] = React.useState(rowData.powerUsers ? (whichCompShow==='add' ? []:rowData.powerUsers) :[]);
    const [zones,setZones] = React.useState([]);

    const context = React.useContext(ContextCache);

    function getTitle(dataColumns,fieldName){
        return dataColumns.filter(item=>item.field==fieldName)[0].title
    }

    React.useEffect(()=>{

        async function fetchData(){

            if(whichCompShow==='delete')
                return;

            if(context.atrState.zoneByPermission.length>0) {
                setZones(context.atrState.zoneByPermission);
                return;
            }

            // showLoading('لطفا منتظر بمانید');
            const user = localStorage.getItem('userToken');
            await ReadApi({url:`${ZONE_LIST.URL}${user}`,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'})
                .then( result => {
                    if(result.status===200) {
                        const zoneList = result.data.map(item=> {
                                return {name: item.namEnCaptionZone, value: item.zoneId}
                            }
                        );
                        setZones(zoneList);
                        context.atrDispatch({type:'zoneByPermission',data:zoneList});
                    }
                    else {
                        setZones([]);
                        context.atrDispatch({type:'zoneByPermission',data:[]});

                        showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                        onOperationFail();
                    }
                    // hideLoading();
                })
                .catch(err=>{
                    setZones([]);
                    showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                    onOperationFail();
                });
        }

    fetchData();

    },[]);

    return (
        <div>

            <Dialog
                title={title}
                openModal={whichCompShow==='add' || whichCompShow==='edit'}
                eventClose={onClose}
                TransitionComponent
                actionBar={
                    <>
                        {whichCompShow==='add' ?
                            <Button
                                color={"primary"}
                                onClick={async ()=>
                            {
                                // showLoading('در حال ایجاد');
                                const user = localStorage.getItem('userToken');
                                const userDisplayName = JSON.parse(localStorage.getItem('user')).name;
                                await CreateApi(
                                    {
                                        url:APPLICATION_CREATE.URL,//`${API_BASE_URL}/ATR/api/v1.0/saveAppByPowerUser`,
                                        data:{
                                            applicationId: null,
                                            namEnCaptionApp:namEnCaptionApp,
                                            namFaCaptionApp:namFaCaptionApp,
                                            namCreatorUserName:user,
                                            desCreatorDisplayName:userDisplayName,
                                            flgStatusApp:flgStatusApp,
                                            zoneId:zoneId,
                                            powerUsers:powerUsers
                                        }
                                    }
                                )
                                .then( result => {
                                    if(result.status===201) {
                                        const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت ایجاد شد";
                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                            showSnack(message, "success", true, 3000);
                                            onOperationSuccess();
                                        }
                                        else
                                            deleteCacheApi({url:`${APPLICATION_GET.URL}${localStorage.getItem('userToken')}?size=10000&page=0&filter=`})
                                                .then(resCatch=>{
                                                    if(resCatch.status==200){
                                                        if(resCatch.data?.status=='Ok') {
                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                            onOperationSuccess();
                                                            return;
                                                        }
                                                        showSnack(message, "success", true, 3000);
                                                        onOperationSuccess();
                                                    }
                                                })
                                                .catch(errCatch=>{
                                                    showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                                                    onOperationFail();
                                                });

                                        // hideLoading();
                                    }
                                    else {
                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") :"خطا در ایجاد اطلاعات", "error", true, 3000);
                                        // hideLoading();

                                        onOperationFail();
                                    }
                                })
                                .catch(err=>{
                                    showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
                                });
                            }} > ذخیره </Button>
                            :
                            <Button
                                color={"primary"}
                                onClick={async ()=>{

                                // showLoading('در حال ویرایش');
                                await UpdateApi(
                                    {
                                        url:APPLICATION_UPDATE.URL,//`${API_BASE_URL}/ATR/api/v1.0/updateApplication`,
                                        data:{
                                            applicationId: applicationId,
                                            namEnCaptionApp:namEnCaptionApp,
                                            namFaCaptionApp:namFaCaptionApp,
                                            //namCreatorUserName:namCreatorUserName,
                                            //desCreatorDisplayName:desCreatorDisplayName,
                                            flgStatusApp:flgStatusApp,
                                            zoneId:zoneId,
                                            powerUsers:powerUsers //.map(item=>item.value)
                                        }
                                    }
                                )
                                .then(result => {
                                    if(result.status===200) {
                                        const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت بروزرسانی شد";
                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                            showSnack(message, "success", true, 3000);
                                            onOperationSuccess();
                                        }
                                        else
                                            deleteCacheApi({url:`${APPLICATION_GET.URL}${localStorage.getItem('userToken')}?size=10000&page=0&filter=`})
                                                .then(resCatch=>{
                                                    if(resCatch.status==200){
                                                        debugger;
                                                        if(resCatch.data?.status=='Ok') {
                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                            onOperationSuccess();
                                                            return;
                                                        }
                                                        showSnack(message, "success", true, 3000);
                                                        onOperationSuccess();                                                                    }
                                                })
                                                .catch(errCatch=>{
                                                    showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                                                    onOperationFail();
                                                });

                                        //showSnack(result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت بروزرسانی شد" , "success", true, 3000);
                                        // hideLoading();

                                        //onOperationSuccess();
                                    }
                                    else {
                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات", "error", true, 3000);
                                        // hideLoading();

                                        onOperationFail();
                                    }
                                })
                                .catch(err=>{
                                    showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
                                    // hideLoading();

                                    onOperationFail();
                                });
                            }} > ذخیره </Button>
                        }
                        <Button
                            color={"secondary"}
                            onClick={onOperationFail} > بستن </Button>

                    </>
                }
            >
                <Grid container spacing={0}>
                    <Grid item md={6} xs={12}>

                        <TextField
                            value={namEnCaptionApp}
                            label={getTitle(columns,'namEnCaptionApp')}
                            style={{direction:'ltr'}}
                            inputProps={{maxlength:3}}
                            validationType={['alpha','uppercase']}
                            //fullWidth
                            onChange={e=>setNamEnCaptionApp(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            label={getTitle(columns,'namFaCaptionApp')}
                            value={namFaCaptionApp}
                            validationType={['alphaFa']}
                            //fullWidth
                            onChange={e=>setNamFaCaptionApp(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Select
                           label={"حوزه"}
                           name={"namEnCaptionZone"}
                           value={zoneId}
                           fullWidth
                           onChange={(e)=>{
                               const changedZoneId = e.target.value;
                               setZoneId(changedZoneId);
                           }}
                           items={zones}/>
                    </Grid>

                    <Grid item md={12} xs={12}>
                    <UsersGroupsApprolesSearch
                        selectedRowsUsers={powerUsers}
                        jsonUserName={"userDisplayName"}
                        jsonUserValue={"userName"}
                        seperator={" - "}
                        label={"کاربران"}
                        onChangeSelectionRow={(type,selectedRows)=>{
                            switch(type.toLowerCase()){
                                case 'users':
                                    setPowerUsers(selectedRows);
                                    break;
                                default:
                            }
                            console.log('onChangeSelectionRow',type,selectedRows)

                        }}

                    />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={flgStatusApp}
                                    onChange={(e)=>{
                                        setFlgStatusApp(e.target.checked);
                                    }}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label={getTitle(columns,'flgStatusApp')}
                        />
                    </Grid>

                </Grid>

            </Dialog>

            {whichCompShow === 'delete' &&
            <ConfirmationDialog open={true}
                                setOpen={onClose}
                                dialogTitle={"حذف "}
                                dialogContent={"آیا مایل به حذف حوزه هستید؟"}
                                onExecute={
                                    async (event,confirmationRowData)=>{
                                        // showLoading("در حال حذف رکورد");
                                        console.log('onExecute, start',rowData,confirmationRowData);
                                        await DeleteApi( {url:`${APPLICATION_DELETE.URL}${applicationId}`})
                                            .then(result => {

                                                console.log('ConfirmationDialog --',result.response);

                                                switch(result.status){
                                                    case 200:
                                                        const message = result.data && result.data.length>0 ? result.data.join(",") :"اطلاعات با موفقیت انجام شد";
                                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                                            showSnack(message, "success", true, 3000);
                                                            onOperationSuccess();
                                                        }
                                                        else
                                                            deleteCacheApi({url:`${APPLICATION_GET.URL}${localStorage.getItem('userToken')}?size=10000&page=0&filter=`})
                                                                .then(resCatch=>{
                                                                    if(resCatch.status==200){
                                                                        if(resCatch.data?.status=='Ok') {
                                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                                            onOperationSuccess();
                                                                            return;
                                                                        }
                                                                        showSnack(message, "success", true, 3000);
                                                                        onOperationSuccess();                                                                    }
                                                                })
                                                                .catch(errCatch=>{
                                                                    showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                                                                    onOperationFail();
                                                                });

                                                        //showSnack(result.data && result.data.length>0 ? result.data.join(",") :"اطلاعات با موفقیت انجام شد", "success", true, 3000);
                                                        // hideLoading();

                                                        //onOperationSuccess();
                                                        break;
                                                    case 204:
                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "اطلاعات با موفقیت انجام شد", "success", true, 3000);
                                                        // hideLoading();

                                                        onOperationSuccess();
                                                        break;
                                                    case 428:
                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات", "error", true, 3000);
                                                        // hideLoading();
                                                        onOperationFail();
                                                        break;
                                                    default:
                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات" , "error", true, 3000);
                                                        // hideLoading();
                                                        onOperationFail();
                                                }

                                            })
                                            .catch(err=>{
                                                showSnack("خطای اساسی در حذف اطلاعات", "error", true, 3000);
                                                onOperationFail();
                                                // hideLoading();
                                            });
                                    }
                                }/>
            }

        </div>
    )
}
