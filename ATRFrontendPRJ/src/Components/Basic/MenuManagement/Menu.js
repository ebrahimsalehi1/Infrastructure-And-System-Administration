import React from 'react';
import Dialog from "../../Dialog";
import Button from '../../General/Button';
import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
//import {createApi, deleteApi, updateApi,readApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import {API_BASE_URL, LOCAL_STORAGE_BFF} from "../../../Utils/Config/constants";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@irisa/components-material-v.4/lib/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";
//import ConfirmationDialog from "@irisa/components-material-v.4/lib/ConfirmationDialog";
import ConfirmationDialog from "../../General/ConfirmationDialog";
import Select from "@irisa/components-material-v.4/lib/Select";
import UsersGroupsApprolesSearch from "../RoleManagement/UsersGroupsApprolesSearch";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/styles';
//import {ContextCache} from "../../../Context";
import {ContextCache} from "../../../Utils/StateManagement/context/index";
import {ZONE_APPLICATIONS_GET, ZONE_LIST} from "../../../Utils/Config/RouterServices/Zone";
import {MENU_CREATE, MENU_DELETE, MENU_GRID_GET, MENU_UPDATE} from "../../../Utils/Config/RouterServices/Menu";
import {APPLICATION_GET} from "../../../Utils/Config/RouterServices/Application";
import {
    CreateApi,
    DeleteApi,
    deleteCacheApi,
    ReadApi,
    UpdateApi
} from "../../../Utils/Config/CallServiceRouter";

const useStyle = makeStyles(theme=>({
    root:{
        margin:2,
    }
}));

const TYPE_MENU =
    [
        {
            "name": "فرم",
            "value": "FORM"
        },
        {
            "name": "گزارش",
            "value": "REPORT"
        },
        {
            "name": "منو والد",
            "value": "PARENT"
        }
    ];

export default function Menu(props) {

    const classes = useStyle();

    const {whichCompShow,rowData,onClose,onSaveSuccess,onSaveFailed,onLoadFailed,onCancelClick,isAdmin,columns,title} = props;

    const [menuId,setMenuId] = React.useState(rowData.menuId ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.menuId) :'');
    //const [parentMenuId,setParentMenuId] = React.useState(whichCompShow==='edit' ? rowData.parentMenuId :  (whichCompShow==='add_root' ? '':(whichCompShow==='add' ? rowData.menuId:'')));
    const [parentMenuId,setParentMenuId] = React.useState(rowData.parentMenuId);
    const [desDescriptionMenu,setDesDescriptionMenu] = React.useState(rowData.desDescriptionMenu ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.desDescriptionMenu) :'');
    const [desDescriptionParentMenu,setDesDescriptionParentMenu] = React.useState(rowData.desDescriptionParentMenu);
    const [namUrlMenu,setNamUrlMenu] = React.useState(rowData.namUrlMenu ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.namUrlMenu) :'');
    const [namRelativeUrlMenu,setNamRelativeUrlMenu] = React.useState(rowData.namRelativeUrlMenu ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.namRelativeUrlMenu) :'');
    const [flgActiveMenu,setFlgActiveMenu] = React.useState(rowData.flgActiveMenu ? rowData.flgActiveMenu :true);
    const [zoneId,setZoneId] = React.useState(rowData.zoneId ? rowData.zoneId :'');
    const [zoneCaption,setZoneCaption] = React.useState(rowData.zoneCaption ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.zoneCaption) :'');
    const [typeMenu,setTypeMenu] = React.useState(whichCompShow==='add_root' ? 'PARENT' : rowData.type);
    const [numPriorityMenu,setNumPriorityMenu] = React.useState(rowData.numPriorityMenu ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.numPriorityMenu) : 0);
    const [appId,setAppId] = React.useState(rowData.appId ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.appId) :'');
    const [appCaption,setAppCaption] = React.useState(rowData.appCaption ? (whichCompShow==='add' || whichCompShow==='add_root' ? '':rowData.appCaption) :'');
    const [users,setUsers] = React.useState(rowData.users ? (whichCompShow==='add' || whichCompShow==='add_root' ? []:rowData.users) :[]);
    const [groups,setGroups] = React.useState(rowData.groups ? (whichCompShow==='add' || whichCompShow==='add_root' ? []:rowData.groups) :[]);
    const [roles,setRoles] = React.useState(rowData.roles ? (whichCompShow==='add' || whichCompShow==='add_root' ? []:rowData.roles) :[]);
    const [zones,setZones] = React.useState([]);
    const [applications,setApplications] = React.useState([]);

    console.log('Menu is rendering',rowData,zones);

    const context = React.useContext(ContextCache);

    function getTitle(dataColumns,fieldName){
        return dataColumns.filter(item=>item.field==fieldName)[0].title
    }

    React.useEffect(()=>{
        async function fetchData() {

            if (whichCompShow === 'delete')
                return;

            try {
                showLoading('لطفا منتظر بمانید');

                const user = localStorage.getItem('userToken');
                let zoneData = [];
                let appData = [];

                if (context.atrState.zoneByPermission.length > 0) {
                    zoneData = context.atrState.zoneByPermission;
                    setZones(context.atrState.zoneByPermission);
                } else {
                    //await readApi({url: `${API_BASE_URL}/ATR/api/v1.0/zoneByPermission/list/${user}`})
                    await ReadApi({url: `${ZONE_LIST.URL}${user}`,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'})
                        .then(result => {
                            if (result.status === 200) {
                                zoneData = result.data.map(item => {
                                        return {name: item.namEnCaptionZone, value: item.zoneId}
                                    }
                                );
                                context.atrDispatch({type: 'zoneByPermission', data: zoneData});
                                setZones(zoneData);
                            } else {
                                setZones([]);
                                //setZoneId(null);
                                context.atrDispatch({type: 'zoneByPermission', data: []});

                                showSnack("خطا در بازیابی اطلاعات حوزه", "info", true, 3000);
                                onLoadFailed();
                                //throw new Error("خطا در بازیابی اطلاعات");
                            }
                        })
                        .catch(err => {
                            setZones([]);
                            context.atrDispatch({type: 'zoneByPermission', data: []});
                            //showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                            onLoadFailed();
                            console.error('ERROR',err);
                            props.onError(err);
                        });

                }

                if (context.atrState.applicationByPermission.length > 0) {
                    appData = context.atrState.applicationByPermission;
                    setApplications(context.atrState.applicationByPermission);
                } else {
                    await ReadApi({url: `${APPLICATION_GET.URL}${localStorage.getItem('userToken')}?size=10000&page=0&filter=`
                        ,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'})
                        .then(result => {
                            if (result.status === 200) {
                                appData = result.data.content.map(item => {
                                    return {name: item.namEnCaptionApp, value: item.applicationId}
                                });
                                setApplications(appData);
                                context.atrDispatch({type: 'applicationByPermission', data: appData});
                            } else {
                                setApplications([]);
                                context.atrDispatch({type: 'applicationByPermission', data: []});

                                showSnack("خطا در بازیابی اطلاعات زیر سیستم ها", "info", true, 3000);
                                //throw new Error("خطا در بازیابی اطلاعات");
                            }
                        })
                        .catch(err => {
                            setApplications([]);
                            //showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                            console.error('ERROR',err);
                            props.onError(err);
                        });
                }

                if (whichCompShow === 'edit') {
                    const foundZoneId = zoneData.find(item => item.name === zoneCaption);
                    setZoneId(foundZoneId?.value);

                    const foundAppId = appData.find(item => item.name === appCaption);
                    setAppId(foundAppId?.value)
                }

                // if (whichCompShow === 'edit')
                // {
                //     const foundZoneId = zoneData.filter(item=>item.name === zoneCaption);
                //     if(foundZoneId.length===0){
                //         showSnack("حوزه مورد نظر قابل بازیابی نیست", "error", true, 3000);
                //         hideLoading();
                //         return;
                //     }
                //
                //     if(foundZoneId.length > 0) {
                //         console.info(foundZoneId);
                //         setZoneId(foundZoneId[0].value);
                //         const foundZoneApps = context.atrState.zoneApps.filter(item=>item.zoneId===foundZoneId[0].value);
                //         if(foundZoneApps.length > 0){
                //             setApplications(foundZoneApps[0].data);
                //             const foundAppId = foundZoneApps[0].data.find(item=>item.name===appCaption);
                //             setAppId(foundAppId?.value)
                //             console.info('ebrahim',foundZoneApps,foundAppId)
                //             hideLoading();
                //         }
                //         else
                //         //await readApi({url: `${API_BASE_URL}/ATR/api/v1.0/zoneApps/${foundZoneId[0].value}`})
                //         await readApi({url: `${ZONE_APPLICATIONS_GET.URL}${foundZoneId[0].value}`})
                //             .then(result => {
                //
                //                 if (result.status === 200) {
                //                     appData =result.data.map(item => {
                //                         return {name: item.namEnCaptionApp, value: item.applicationId}
                //                     });
                //                     //debugger;
                //                     const foundAppId = appData.filter(item=>item.name===appCaption);
                //
                //                     if(foundAppId.length>0){
                //                         context.atrDispatch({type:'zoneApps',zoneId:foundZoneId[0].value,data:appData});
                //
                //                         setApplications(appData);
                //                         setAppId(foundAppId[0].value);
                //                     }
                //                 } else {
                //                     context.atrDispatch({type:'zoneApps',zoneId:foundZoneId[0].value,data:[]});
                //                     setApplications([]);
                //                     showSnack(result.response.data ? result.response.data.join("\n") : "خطا در بازیابی اطلاعات", "info", true, 3000);
                //                 }
                //                 hideLoading();
                //             })
                //             .catch(err => {
                //                 setApplications([]);
                //                 showSnack("خطای اساسی در بازیابی اطلاعات", "error", true, 3000);
                //                 hideLoading();
                //                 console.error(err);
                //             });
                //
                //     }
                //
                //     setZones(zoneData);
                // }
                //else{
                //     setZones(zoneData);
                // }
                hideLoading();

            }
            catch(e){
                console.error('ERROR',e);
                props.onError(e);
            }

        }

    fetchData();

    },[]);

    React.useEffect(()=>{
        context.atrDispatch({type: 'currentData', zoneId:zoneId, appId:null});
    },[zoneId]);

    return (
        <div>

            <Dialog
                title={title}
                openModal={whichCompShow==='add' || whichCompShow==='edit' || whichCompShow==='add_root' }
                eventClose={onClose}
                TransitionComponent
                actionBar={
                    <>
                        {(whichCompShow==='add' || whichCompShow==='add_root') ?
                            <Button color={"primary"}
                                    onClick={async ()=>
                            {
                                showLoading('در حال ایجاد');
                                const user = localStorage.getItem('userToken');
                                const dataForAdd = {
                                    menuId:null,
                                    flgActiveMenu:flgActiveMenu,
                                    numPriorityMenu:numPriorityMenu ? numPriorityMenu:0,
                                    namRelativeUrlMenu:namRelativeUrlMenu,
                                    namUrlMenu:namUrlMenu,
                                    desDescriptionMenu:desDescriptionMenu,
                                    creator:user,
                                    zoneCaption:zoneCaption,
                                    appCaption:appCaption,
                                    type:typeMenu,
                                    users:users, //? users.map(item=>{return {userName:item.value,userDisplayName:item.name}}) : [],
                                    groups:groups,
                                    roleIds:roles.map(item=>item.roleId),
                                    parentMenuId: whichCompShow==='add_root' ? null:parentMenuId
                                };

                                await CreateApi(
                                    {url:MENU_CREATE.URL,
                                        data:dataForAdd
                                    }
                                )
                                .then( result => {
                                    if(result.status===201) {

                                        const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت ایجاد شد";
                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                            showSnack(message, "success", true, 3000);
                                            onSaveSuccess();
                                        }
                                        else
                                            deleteCacheApi({url:`${MENU_GRID_GET.URL}${localStorage.getItem('userToken')}`})
                                                .then(resCatch=>{
                                                    if(resCatch.status==200){
                                                        if(resCatch.data?.status=='Ok') {
                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                            onSaveSuccess();
                                                            return;
                                                        }
                                                        showSnack(message, "success", true, 3000);
                                                        onSaveSuccess();
                                                    }
                                                })
                                                .catch(errCatch=>{
                                                    showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                                                    onSaveFailed();
                                                });
                                    }
                                    else {
                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات", "error", true, 3000);
                                        onSaveFailed();
                                        throw new Error(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات");
                                    }
                                    hideLoading();
                                })
                                .catch(err=>{
                                    //showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
                                    onSaveFailed();
                                    hideLoading();
                                    console.error('ERROR',err);
                                    props.onError(err);
                                });
                            }} > ذخیره </Button>
                            :
                            <Button
                                color={"primary"}
                                onClick={async ()=>{
                                showLoading('در حال ویرایش');

                                const user = localStorage.getItem('userToken');
                                await UpdateApi(
                                    {url:MENU_UPDATE.URL,
                                        data:{
                                            menuId:menuId,
                                            flgActiveMenu:flgActiveMenu,
                                            numPriorityMenu:numPriorityMenu,
                                            namRelativeUrlMenu:namRelativeUrlMenu,
                                            namUrlMenu:namUrlMenu,
                                            desDescriptionMenu:desDescriptionMenu,
                                            creator:user,
                                            zoneCaption:zoneCaption,
                                            appCaption:appCaption,
                                            type:typeMenu,
                                            users:users, // ? users.map(item=>{return {userName:item.value,userDisplayName:item.name}}) : [],
                                            groups:groups,
                                            roleIds:roles.map(item=>item.roleId),
                                            parentMenuId:parentMenuId
                                        }
                                    }
                                )
                                    .then(result => {
                                        if(result.status===200) {
                                            const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت بروزرسانی شد";
                                            if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                                showSnack(message, "success", true, 3000);
                                                onSaveSuccess();
                                            }
                                            else
                                                deleteCacheApi({url:`${MENU_GRID_GET.URL}${localStorage.getItem('userToken')}`})
                                                    .then(resCatch=>{
                                                        if(resCatch.status==200){
                                                            if(resCatch.data?.status=='Ok') {
                                                                showSnack(`${resCatch.data?.message} ${message}` , "success", true, 3000);
                                                                onSaveSuccess();
                                                                return;
                                                            }
                                                            showSnack(message, "success", true, 3000);
                                                            onSaveSuccess();
                                                        }
                                                    })
                                                    .catch(errCatch=>{
                                                        showSnack(`${message} خطا در حذف کلید  ` , "success", true, 3000);
                                                        onSaveFailed();
                                                    });

                                            hideLoading();
                                        }
                                        else {
                                            showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات" , "error", true, 3000);
                                            onSaveFailed();
                                            throw new Error(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات");
                                        }
                                        hideLoading();
                                    })
                                    .catch(err=>{
                                        //showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
                                        hideLoading();
                                        onSaveFailed();
                                        console.error('ERROR',err);
                                        props.onError(err);
                                    });
                            }} > ذخیره </Button>
                        }
                        <Button color={"secondary"} onClick={onCancelClick} > بستن </Button>

                    </>
                }
            >
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>

                        <TextField
                            value={desDescriptionMenu}
                            //fullWidth
                            label={getTitle(columns,'desDescriptionMenu')}
                            onChange={e=>setDesDescriptionMenu(e.target.value)}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            label={getTitle(columns,'namRelativeUrlMenu')}
                            value={namRelativeUrlMenu}
                            style={{textAlign:"left"}}
                            onChange={e=>setNamRelativeUrlMenu(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={6}>
                        <Select label={"نوع"}
                                name={"name"}
                                value={typeMenu}
                                disabled={whichCompShow == 'add_root'}
                                onChange={(e)=>{
                                    setTypeMenu(e.target.value);
                                    console.log("info",e.target.value,TYPE_MENU);
                                }}
                                //items={whichCompShow==='add' ? TYPE_MENU.filter(item=>item.value!=='PARENT'):TYPE_MENU}
                                items={TYPE_MENU}
                        />

                        {/*<FormControlLabel*/}
                        {/*    control={*/}
                        {/*        <Switch*/}
                        {/*            checked={typeMenu==='REPORT'}*/}
                        {/*            onChange={(e)=>{*/}
                        {/*                setTypeMenu(e.target.checked ? 'REPORT':'FORM');*/}
                        {/*            }}*/}
                        {/*            name="type menu"*/}
                        {/*            color="primary"*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    label={getTitle(columns,'type')}*/}
                        {/*/>*/}
                    </Grid>

                    <Grid item md={6} xs={6}>
                        <TextField
                            label={getTitle(columns,'numPriorityMenu')}
                            value={numPriorityMenu}
                            type={"number"}
                            onChange={e=>setNumPriorityMenu(e.target.value)}
                        />
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Select label={"حوزه"}
                                   name={"namEnCaptionZone"}
                                   value={zoneId}
                                   onChange={async (e)=>{
                                       try {
                                           const changedZoneId = e.target.value;

                                           if (!changedZoneId)
                                               return;

                                           const changedZoneName = zones.filter(item => item.value == changedZoneId)[0].name;

                                           setZoneId(changedZoneId);
                                           setZoneCaption(changedZoneName);

                                           const foundZoneApps = context.atrState.zoneApps.filter(item => item.zoneId === changedZoneId);
                                           if (foundZoneApps.length > 0) {
                                               setApplications(foundZoneApps[0].data);
                                               return;
                                           }
                                           showLoading('لطفا شکیبا باشید');
                                           //await readApi({url:`${API_BASE_URL}/ATR/api/v1.0/zoneApps/${changedZoneId}`})
                                           await ReadApi({url: `${ZONE_APPLICATIONS_GET.URL}${changedZoneId}`
                                               ,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'
                                           })
                                               .then(result => {

                                                   if (result.status === 200) {
                                                       const appList = result.data.map(item => {
                                                           return {
                                                               name: item.namEnCaptionApp,
                                                               value: item.applicationId
                                                           }
                                                       });
                                                       setApplications(appList);
                                                       context.atrDispatch({
                                                           type: 'zoneApps',
                                                           zoneId: changedZoneId,
                                                           data: appList
                                                       });

                                                   } else if (result.status === 204) {
                                                       showSnack(result.response.join(" - "), "info", true, 3000);
                                                       //throw new Error(result.response.join(" - "));
                                                   } else {

                                                       setApplications([]);
                                                       context.atrDispatch({
                                                           type: 'zoneApps',
                                                           zoneId: changedZoneId,
                                                           data: []
                                                       });

                                                       showSnack(result.response.data ? result.response.data.join("\n") : "خطا در بازیابی اطلاعات زیرسیستم حوزه", "info", true, 3000);
                                                       //throw new Error(result.response.data ? result.response.data.join("\n") : "خطا در بازیابی اطلاعات");
                                                   }
                                                   hideLoading();
                                               })
                                               .catch(err => {

                                                   setApplications([]);
                                                   context.atrDispatch({
                                                       type: 'zoneApps',
                                                       zoneId: changedZoneId,
                                                       data: []
                                                   });

                                                   //showSnack("خطای اساسی در بازیابی اطلاعات", "error", true, 3000);
                                                   hideLoading();
                                                   console.error('ERROR', err);
                                                   props.onError(err);
                                               });
                                       }
                                       catch(e) {
                                           console.error('ERROR', e);
                                           props.onError(e);
                                       }
                                   }}
                                   items={zones}/>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <Select label={"سیستم"}
                                name={"name"}
                                value={appId}
                                onChange={(e)=>{
                                    try {
                                        const currentAppId = e.target.value;
                                        //context.atrDispatch({type: 'currentData', zoneId:zoneId, appId:currentAppId});
                                        const currentAppCaption = applications.filter(item => item.value == currentAppId)[0]?.name;
                                        setAppId(currentAppId);
                                        setAppCaption(currentAppCaption);
                                    }catch(e){
                                        console.error('ERROR',e);
                                        props.onError(e);
                                    }
                                }}
                                items={applications}/>
                    </Grid>

                    <Grid item md={12} xs={12}>
                    {/*{whichCompShow!=='add_root' &&*/}
                    <UsersGroupsApprolesSearch
                        selectedRowsUsers={users}
                        selectedRowsGroups={groups}
                        selectedRowsAppRoles={roles}
                        jsonUserName={"userDisplayName"}
                        jsonUserValue={"userName"}
                        jsonGroupName={"name"}
                        jsonGroupValue={"value"}
                        jsonRoleName={"roleName"}
                        jsonRoleValue={"roleId"}
                        // jsonRoleName={"namRoleApprol"}
                        // jsonRoleValue={"applicationRoleId"}
                        seperator={" - "}
                        label={"کاربران گروهها نقش ها"}
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
                            console.log('onChangeSelectionRow',type,selectedRows)

                        }}

                    />
                    {/*}*/}
                    </Grid>

                    {/*<Grid item md={6} xs={6}>*/}
                    {/*    <FormControlLabel*/}
                    {/*        control={*/}
                    {/*            <Switch*/}
                    {/*                checked={flgActiveMenu}*/}
                    {/*                onChange={(e)=>{*/}
                    {/*                    setFlgActiveMenu(e.target.checked);*/}
                    {/*                }}*/}
                    {/*                name="checkedB"*/}
                    {/*                color="primary"*/}
                    {/*            />*/}
                    {/*        }*/}
                    {/*        label={getTitle(columns,'flgActiveMenu')}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    {/*<Grid item md={6} xs={6}>*/}
                    {/*    {whichCompShow !== 'add_root' &&*/}
                    {/*    <Typography component={"h4"}>{parentMenuId}</Typography>*/}
                    {/*    }*/}
                    {/*</Grid>*/}

                    <Grid item md={6} xs={6}>
                        {whichCompShow !== 'add_root' &&
                        <Typography component={"h4"}>{desDescriptionParentMenu}</Typography>
                        }
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
                                        showLoading("در حال حذف رکورد");
                                        await DeleteApi( {url:`${MENU_DELETE.URL}${menuId}`})
                                            .then(result => {

                                                switch(result.status){
                                                    case 200:
                                                        const message = result.data && result.data.length>0 ? result.data.join(",") : "حذف اطلاعات با موفقیت انجام شد";
                                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                                            showSnack(message, "success", true, 3000);
                                                            onSaveSuccess();
                                                        }
                                                        else
                                                            deleteCacheApi({url:`${MENU_GRID_GET.URL}${localStorage.getItem('userToken')}`})
                                                                .then(resCatch=>{
                                                                    if(resCatch.status==200){
                                                                        if(resCatch.data?.status=='Ok') {
                                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                                            onSaveSuccess();
                                                                            return;
                                                                        }
                                                                        showSnack(message, "success", true, 3000);
                                                                        onSaveSuccess();
                                                                    }
                                                                })
                                                                .catch(errCatch=>{
                                                                    showSnack(`${message} خطا در حذف کلید  ` , "success", true, 3000);
                                                                    onSaveFailed();
                                                                });
                                                        break;
                                                    case 204:
                                                        showSnack(
                                                            //result.response.data && result.response.data.length>0 ? result.response.data.join(",") :
                                                                "رکوردی جهت حذف پیدا نشد", "info", true, 3000);
                                                        onSaveFailed();
                                                        //throw new Error( "رکوردی جهت حذف پیدا نشد");
                                                        break;
                                                    case 428:
                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات", "error", true, 3000);
                                                        onSaveFailed();
                                                        throw new Error(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات");
                                                        break;
                                                    default:
                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات", "error", true, 3000);
                                                        onSaveFailed();
                                                        throw new Error(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات");
                                                }
                                                hideLoading();
                                            })
                                            .catch(err=>{
                                                //showSnack("خطای اساسی در حذف اطلاعات", "error", true, 3000);
                                                onSaveFailed();
                                                hideLoading();
                                                console.error('ERROR',err);
                                                props.onError(err);
                                            });
                                    }
                                }/>
            }
            }
        </div>
    )
}
