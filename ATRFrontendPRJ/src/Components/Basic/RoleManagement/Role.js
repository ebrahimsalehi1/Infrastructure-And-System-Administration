import React from 'react';
import Dialog from "../../Dialog";
import Button from '../../General/Button';
import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
//import {createApi, deleteApi, updateApi,readApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import {API_BASE_URL, LOCAL_STORAGE_BFF} from "../../../Utils/Config/constants";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
import Grid from "@material-ui/core/Grid";
//import TextField from "@irisa/components-material-v.4/lib/TextField";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
//import ConfirmationDialog from "@irisa/components-material-v.4/lib/ConfirmationDialog";
import ConfirmationDialog from "../../General/ConfirmationDialog";
//import Select from "@irisa/components-material-v.4/lib/Select";
import Select from "@material-ui/core/Select";
import UsersGroupsApprolesSearch from "./UsersGroupsApprolesSearch";
import {makeStyles} from '@material-ui/styles';
//import {ContextCache} from "../../../Context";
import {ContextCache} from "../../../Utils/StateManagement/context/index";
import {
    APPLICATION_ROLE_CREATE,
    APPLICATION_ROLE_DELETE, APPLICATION_ROLE_GET,
    APPLICATION_ROLE_UPDATE
} from "../../../Utils/Config/RouterServices/Role";
import {ZONE_APPLICATIONS_GET, ZONE_LIST} from "../../../Utils/Config/RouterServices/Zone";
import {APPLICATION_GET} from "../../../Utils/Config/RouterServices/Application";
import {CreateApi, DeleteApi, deleteCacheApi, ReadApi, UpdateApi} from "../../../Utils/Config/CallServiceRouter";

const useStyle = makeStyles(theme=>({
    root:{
        margin:2,
    }
}));

export default function Role(props) {

    const classes = useStyle();

    const {whichCompShow,rowData,onClose,onOperationSuccess,onOperationFail,isAdmin,columns,title} = props;

    const [applicationRoleId,setApplicationRoleId] = React.useState(rowData.applicationRoleId ?  (whichCompShow==='add' ? '':rowData.applicationRoleId) :'');
    const [namRoleApprol,setNamRoleApprol] = React.useState(rowData.namRoleApprol ?  (whichCompShow==='add' ? '':rowData.namRoleApprol) :'');
    const [desDescriptionApprol,setDesDescriptionApprol] = React.useState(rowData.desDescriptionApprol ?  (whichCompShow==='add' ? '':rowData.desDescriptionApprol) :'');
    const [flgStatusApprol,setFlgStatusApprol] = React.useState(rowData.flgStatusApprol ? rowData.flgStatusApprol :true);
    const [flgIsAdmin,setFlgIsAdmin] = React.useState(rowData.flgIsAdmin ? rowData.flgIsAdmin :false);
    const [flgIsPowerUser,setFlgIsPowerUser] = React.useState(rowData.flgIsPowerUser ? rowData.flgIsPowerUser :false);
    const [zoneId,setZoneId] = React.useState(rowData.zoneId ?  (whichCompShow==='add' ? []:rowData.zoneId) :[]);
    const [appId,setAppId] = React.useState(rowData.appId ?  (whichCompShow==='add' ? '':rowData.appId) :'');
    const [users,setUsers] = React.useState(rowData.users ?  (whichCompShow==='add' ? []:rowData.users) :[]);
    const [groups,setGroups] = React.useState(rowData.groups ?  (whichCompShow==='add' ? []:rowData.groups) :[]);
    const [roles,setRoles] = React.useState(rowData.subRoles ?  (whichCompShow==='add' ? []:rowData.subRoles) :[]);
    const [zones,setZones] = React.useState([]);
    const [applications,setApplications] = React.useState([]);

    const context = React.useContext(ContextCache);

    function getTitle(dataColumns,fieldName){
        return dataColumns.filter(item=>item.field==fieldName)[0].title
    }

    React.useEffect(()=>{
        async function fetchData(){

            if(whichCompShow==='delete')
                return;

            if(context.atrState.zoneByPermission.length > 0 || context.atrState.applicationByPermission.length > 0) {
                setZones(context.atrState.zoneByPermission);
                setApplications(context.atrState.applicationByPermission);
                return;
            }

            showLoading('لطفا منتظر بمانید');
            const user = localStorage.getItem('userToken');
            //await readApi({url:`${API_BASE_URL}/ATR/api/v1.0/zoneByPermission/list/${user}`})
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

                })
                .catch(err=>{
                    setZones([]);
                    showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                    onOperationFail();
                });

            await ReadApi({url:`${APPLICATION_GET.URL}${localStorage.getItem('userToken')}?size=10000&page=0&filter=`
                ,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'
            })
                .then( result => {
                    if(result.status===200) {

                        const appList = result.data.content.map(item=>{
                            return {name:item.namEnCaptionApp,value:item.applicationId}
                        });
                        setApplications(appList);
                        context.atrDispatch({type:'applicationByPermission',data:appList});

                    }
                    else {
                        setApplications([]);
                        context.atrDispatch({type:'applicationByPermission',data:[]});

                        showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                    }
                })
                .catch(err=>{
                    setApplications([]);
                    showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                });

            hideLoading();
        }

        fetchData();

    },[]);

    React.useEffect(()=>{
        context.atrDispatch({type: 'currentData', zoneId:zoneId, appId:null});
    },[zoneId]);

    //console.info('Role is rendering',{zoneId,appId,rowData});

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
                                showLoading("در حال ایجاد");
                                const user = localStorage.getItem('userToken');
                                await CreateApi(
                                    {url:APPLICATION_ROLE_CREATE.URL,
                                        data:{
                                            applicationRoleId: null,
                                            zoneId:zoneId,
                                            appId:appId,
                                            desDescriptionApprol: desDescriptionApprol,
                                            namRoleApprol: namRoleApprol,
                                            flgStatusApprol: flgStatusApprol,
                                            creator: user,
                                            flgIsAdmin: isAdmin ? flgIsAdmin:false,
                                            flgIsPowerUser: isAdmin ? flgIsPowerUser:false,
                                            users:users,
                                            groups:groups,
                                            rolesId:roles.map(item=>item.applicationRoleId)
                                        }
                                    }
                                )
                                    .then( result => {
                                        if(result.status===201) {
                                            //showSnack(result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت ایجاد شد", "success", true, 3000);

                                            const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت ایجاد شد";
                                            if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                                showSnack(message, "success", true, 3000);
                                                onOperationSuccess();
                                            }
                                            else
                                                deleteCacheApi({url:`${APPLICATION_ROLE_GET.URL}${localStorage.getItem('userToken')}?size=1000&page=0&filter=`})
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

                                            hideLoading();
                                            //onOperationSuccess();
                                        }
                                        else {
                                            showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات", "error", true, 3000);
                                            hideLoading();

                                            onOperationFail();
                                        }
                                    })
                                    .catch(err=>{
                                        showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);                                        hideLoading();
                                        hideLoading();

                                        onOperationFail();
                                    });
                            }} > ذخیره </Button>
                            :
                            <Button
                                color={"primary"}
                                onClick={async ()=>{
                                showLoading('در حال ویرایش');
                                const user = localStorage.getItem('userToke');
                                await UpdateApi(
                                    {url:APPLICATION_ROLE_UPDATE.URL,
                                        data:{
                                            applicationRoleId: applicationRoleId,
                                            zoneId:zoneId,
                                            appId:appId,
                                            desDescriptionApprol: desDescriptionApprol,
                                            namRoleApprol: namRoleApprol,
                                            flgStatusApprol: flgStatusApprol,
                                            creator: user,
                                            flgIsAdmin: isAdmin ? flgIsAdmin:false,
                                            flgIsPowerUser: isAdmin ? flgIsPowerUser:false,
                                            users:users,
                                            groups:groups,
                                            rolesId:roles.map(item=>item.applicationRoleId)
                                        }
                                    }
                                )
                                    .then(result => {
                                        if(result.status===200) {
                                            //showSnack(result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت بروزرسانی شد", "success", true, 3000);

                                            const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت بروزرسانی شد";
                                            if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                                showSnack(message, "success", true, 3000);
                                                onOperationSuccess();
                                            }
                                            else
                                                deleteCacheApi({url:`${APPLICATION_ROLE_GET.URL}${localStorage.getItem('userToken')}?size=1000&page=0&filter=`})
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
                                            hideLoading();

                                            //onOperationSuccess();
                                        }
                                        else {
                                            showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در بروزرسانی اطلاعات" , "error", true, 3000);
                                            hideLoading();

                                            onOperationFail();
                                        }
                                    })
                                    .catch(err=>{
                                        showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
                                        hideLoading();

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
                    <Grid item md={12} xs={12}>

                        <TextField
                            value={namRoleApprol}
                            label={getTitle(columns,'namRoleApprol')}
                            //validationType={['alpha']}
                            style={{direction:'ltr'}}
                            onChange={e=>setNamRoleApprol(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            label={getTitle(columns,'desDescriptionApprol')}
                            //validationType={['alphaFa']}
                            value={desDescriptionApprol}
                            onChange={e=>setDesDescriptionApprol(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={flgStatusApprol}
                                    onChange={(e)=>{
                                        setFlgStatusApprol(e.target.checked);
                                    }}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label={getTitle(columns,'flgStatusApprol')}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Switch*/}
                        {/*            checked={flgIsAdmin}*/}
                        {/*            onChange={(e)=>setFlgIsAdmin(e.target.checked)}*/}
                        {/*            name="checkedB"*/}
                        {/*            color="primary"*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    label={getTitle(columns,'flgIsAdmin')}*/}
                        {/*/>*/}

                    </Grid>
                    <Grid item md={4} xs={12}>
                        {flgIsAdmin &&
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={flgIsPowerUser}
                                    onChange={(e)=>setFlgIsPowerUser(e.target.checked)}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label={getTitle(columns,'flgIsPowerUser')}
                        />
                        }
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Select label={"حوزه"}
                                   name={"namEnCaptionZone"}
                                   value={zoneId}
                                   onChange={async (e)=>{
                                       const changedZoneId = e.target.value;
                                       //context.atrDispatch({type: 'currentData', zoneId:changedZoneId, appId:null});

                                       if(!changedZoneId){
                                           setZoneId(changedZoneId);
                                           return;
                                       }

                                       setZoneId(changedZoneId);

                                       const foundZoneApps = context.atrState.zoneApps.filter(item=>item.zoneId===changedZoneId);
                                       if(foundZoneApps.length > 0){
                                           setApplications(foundZoneApps[0].data);
                                           return;
                                       }
                                       showLoading('لطفا شکیبا باشید');
                                       await ReadApi({url:`${ZONE_APPLICATIONS_GET.URL}${changedZoneId}`
                                           ,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'
                                       })
                                           .then( result => {
                                               if(result.status===200) {
                                                   const appList = result.data.map(item=>{
                                                       return {name:item.namEnCaptionApp,value:item.applicationId}
                                                   });
                                                   setApplications(appList);
                                                   context.atrDispatch({type:'zoneApps',zoneId:changedZoneId,data:appList});

                                                   hideLoading();
                                               }
                                               else {
                                                   setApplications([]);
                                                   context.atrDispatch({type:'zoneApps',zoneId:changedZoneId,data:[]});
                                                   console.log('error',result,result.status,result.data);

                                                   showSnack("برای این حوزه زیر سیستمی وجود ندارد", "info", true, 3000);
                                                   hideLoading();
                                               }
                                           })
                                           .catch(err=>{
                                               console.error(err);
                                               setApplications([]);
                                               showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                                               hideLoading();
                                           });

                                   }}
                                   items={zones}/>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Select label={"سیستم"}
                                name={"namEnCaptionApp"}
                                value={appId}
                                onChange={(e)=>{
                                    const currentAppId = e.target.value;
                                    //context.atrDispatch({type: 'currentData', zoneId:zoneId, appId:currentAppId});
                                    setAppId(currentAppId);
                                }}
                                items={applications}/>
                    </Grid>

                    <Grid item md={12} xs={12}>
                    <UsersGroupsApprolesSearch
                        selectedRowsUsers={users}
                        selectedRowsGroups={groups}
                        selectedRowsAppRoles={roles}
                        //isChipEnabled

                        jsonUserName={"userDisplayName"}
                        jsonUserValue={"userName"}

                        jsonGroupName={"name"}
                        jsonGroupValue={"value"}

                        jsonRoleName={"desDescriptionApprol"}
                        jsonRoleValue={"applicationRoleId"}

                        label={"کاربران گروهها نقش ها"}

                        seperator={" - "}
                        onChangeSelectionRow={(type,selectedRows)=>{
                            switch(type.toLowerCase()){
                                case 'users':
                                    setUsers(selectedRows);
                                    break;
                                case 'groups':
                                    setGroups(selectedRows);
                                    break;
                                case 'applicationrole':
                                    setRoles(selectedRows);
                                    break;
                                default:
                            }
                        }}
                    />
                    </Grid>


                </Grid>

            </Dialog>

            {whichCompShow === 'delete' &&
            <ConfirmationDialog open={true}
                                setOpen={onOperationFail}
                                dialogTitle={"حذف "}
                                dialogContent={"آیا مایل به حذف حوزه هستید؟"}
                                onExecute={
                                    async (event,confirmationRowData)=>{
                                        showLoading("در حال حذف رکورد");
                                        await DeleteApi( {url:`${APPLICATION_ROLE_DELETE.URL}${applicationRoleId}`})
                                            .then(result => {

                                                switch(result.status){
                                                    case 200:
                                                        //showSnack( result.data && result.data.length>0 ? result.data.join(",") :  "اطلاعات با موفقیت انجام شد", "success", true, 3000);
                                                        const message = result.data && result.data.length>0 ? result.data.join(",") :  "اطلاعات با موفقیت انجام شد";
                                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                                            showSnack(message, "success", true, 3000);
                                                            onOperationSuccess();
                                                        }
                                                        else
                                                            deleteCacheApi({url:`${APPLICATION_ROLE_GET.URL}${localStorage.getItem('userToken')}?size=1000&page=0&filter=`})
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

                                                        hideLoading();
                                                        //onOperationSuccess();
                                                        break;
                                                    case 428:
                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات", "error", true, 3000);
                                                        hideLoading();

                                                        onOperationFail();
                                                        break;
                                                    default:
                                                        showSnack(result.response.data ? result.response.data : "خطا در حذف اطلاعات", "error", true, 3000);
                                                        hideLoading();
                                                        onOperationFail();
                                                }
                                            })
                                            .catch(err=>{
                                                showSnack( "خطای اساسی در حذف اطلاعات", "error", true, 3000);

                                                hideLoading();
                                                onOperationFail();
                                            });
                                    }
                                }/>
            }

        </div>
    )
}
