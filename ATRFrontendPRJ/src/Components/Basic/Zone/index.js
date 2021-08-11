import React from 'react';
import MaterialTable from '../../MaterialTable';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@irisa/components-material-v.4/lib/TextField';
import Dialog from "../../Dialog";
import Button from '../../General/Button';
import {API_BASE_URL} from "../../../Utils/Config/constants";
//import {updateApi, createApi, readApi,deleteApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
//import ConfirmationDialog from "@irisa/components-material-v.4/lib/ConfirmationDialog";
import ConfirmationDialog from "../../General/ConfirmationDialog";
import UsersGroupsApprolesSearch from "../RoleManagement/UsersGroupsApprolesSearch";
//import {makeStyles} from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Refresh from '@material-ui/icons/Refresh';
//import {ContextCache} from '../../../Context';
import {ContextCache} from "../../../Utils/StateManagement/context/index";
import {ZONE_CREATE, ZONE_DELETE, ZONE_GET, ZONE_UPDATE} from "../../../Utils/Config/RouterServices/Zone";
import {CreateApi, DeleteApi, deleteCacheApi, UpdateApi} from "../../../Utils/Config/CallServiceRouter";
import {APPLICATION_ROLE_GET} from "../../../Utils/Config/RouterServices/Role";

const useStyle = makeStyles(theme=>({
    root:{
        margin:2,
    },
    formControlEmpty: {
        top: -8,
        right:-150
    },
    formControlNotEmpty: {
        top: -8,
        right:20
    },
}));

function Zone(props){

    const classes = useStyle();

    const [whichCompShow,setWhichCompShow] = React.useState('');
    const title = "مدیریت حوزه";

    const columns = [
        {field: 'namEnCaptionZone', title: 'نام کوتاه سیستم'},
        {field: 'namFaCaptionZone', title: 'عنوان فارسی'},
        {field: 'namCreatorUserName', title: 'شماره پرسنلی ایجاد کننده'},
        {field: 'desCreatorDisplayName', title: 'نام ایجاد کننده'},
        {field: 'flgStatusZone', title: 'وضعیت ' , type:'boolean'},
        //{field: 'zoneAdmin', title: 'شماره پرسنلی ' },
        //{field: 'zoneAdmin', title: 'شماره پرسنلی ',render:rowData=> rowData.zoneAdmin.userName + " " + rowData.zoneAdmin.userDisplayName },
        //{field: 'zoneAdminDisplayName', title: 'نام و نام خانوادگی ' },
    ];

    const [rowData,setRowData] = React.useState([]);
    const [data,setData] = React.useState([]);
    const [gridLoad,setGridLoad] = React.useState({isLoad:false,isForceRefresh:false});

    const actions = [
        {isFreeAction:true,icon:()=>(<Refresh />),tooltip:'بروزرسانی',onClick:(event,rowData)=>{
                setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
            }},
        {isFreeAction:true,icon:()=>(<Button color={"primary"}>ایجاد</Button>),tooltip:'ایجاد',onClick:(event,rowData)=>{setWhichCompShow('add');}},
        {icon:Edit,tooltip:'ویرایش',onClick:(event,rowData)=>{
            setWhichCompShow('edit');
            setRowData(rowData);
        }},
        {icon:DeleteOutline,tooltip:'حذف',onClick:async (event,rowData)=>{
            setWhichCompShow('delete');
            setRowData(rowData);
        }}
    ];

    const context = React.useContext(ContextCache);

    function getTitle(dataColumns,fieldName){
       return dataColumns.filter(item=>item.field==fieldName)[0].title
    }

    // React.useEffect(()=>{
    //     async function fetchData(){
    //         await readApi(`${API_BASE_URL}/ATR/api/v1.0/zoneWithPowerUser/grid?size=1000&page=0&filter=&`)
    //             .then(res=>{
    //                 if(res.status===200) {
    //                     setData(res.data);
    //                     alert(0);
    //                 }
    //                 else
    //                     setData([]);
    //             })
    //             .catch(err=>{
    //
    //             });
    //     }
    // });

    const FormItemsAdd = ()=> {

        const [namEnCaptionZone,setNamEnCaptionZone] = React.useState(rowData.namEnCaptionZone ? (whichCompShow==='add' ? '':rowData.namEnCaptionZone) :'');
        const [namFaCaptionZone,setNamFaCaptionZone] = React.useState(rowData.namFaCaptionZone ? (whichCompShow==='add' ? '':rowData.namFaCaptionZone) :'');
        const [namCreatorUserName,setNamCreatorUserName] = React.useState(rowData.namCreatorUserName ? (whichCompShow==='add' ? '':rowData.namCreatorUserName) :'');
        const [desCreatorDisplayName,setDesCreatorDisplayName] = React.useState(rowData.desCreatorDisplayName ? (whichCompShow==='add' ? '':rowData.desCreatorDisplayName) :'');
        const [flgStatusZone,setFlgStatusZone] = React.useState(rowData.flgStatusZone ? rowData.flgStatusZone :true);
        const [zoneAdmin,setZoneAdmin] = React.useState(rowData.zoneAdmin ? (whichCompShow==='add' ? []:rowData.zoneAdmin) :[]);
        const [zoneId,setZoneId] = React.useState(rowData.zoneId ? (whichCompShow==='add' ? '':rowData.zoneId) :'');

        return (
            <div>

            <Dialog
                title={title}
                openModal={whichCompShow==='add' || whichCompShow==='edit'}
                eventClose={e=>{
                    setWhichCompShow('');
                }}
                TransitionComponent
                actionBar={
                    <>
                        {whichCompShow==='add' ?
                            <Button
                                color={"primary"}
                                onClick={async ()=>
                            {
                                showLoading("در حال ایجاد");
                                await CreateApi(
                                    {url:ZONE_CREATE.URL,//url:`${API_BASE_URL}/ATR/api/v1.0/saveZoneByAdmin`,
                                            data:{
                                                    zoneId: null,
                                                    namEnCaptionZone: namEnCaptionZone,
                                                    namFaCaptionZone: namFaCaptionZone,
                                                    namCreatorUserName: localStorage.getItem('userToken'),
                                                    desCreatorDisplayName: JSON.parse(localStorage.getItem('user'))['name'],
                                                    flgStatusZone: flgStatusZone,
                                                    zoneAdmin: zoneAdmin
                                                }
                                    }
                                )
                                .then( result => {

                                    if(result.status===201) {
                                        //showSnack(result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت ایجاد شد", "success", true, 3000);
                                        const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت ایجاد شد";
                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                            showSnack(message, "success", true, 3000);
                                        }
                                        else
                                            deleteCacheApi({url:`${ZONE_GET.URL}`})
                                                .then(resCatch=>{
                                                    if(resCatch.status==200){
                                                        if(resCatch.data?.status=='Ok') {
                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                            return;
                                                        }
                                                        showSnack(message, "success", true, 3000);
                                                    }
                                                })
                                                .catch(errCatch=>{
                                                    showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                                                });

                                        hideLoading();
                                        setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
                                    }
                                    else {
                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") :"خطا در ایجاد اطلاعات", "error", true, 3000);
                                        hideLoading();
                                    }


                                })
                                .catch(err=>{
                                    console.error(err);
                                    showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
                                    hideLoading();

                                });
                                setWhichCompShow('');
                            }} > ذخیره </Button>
                            :
                            <Button
                                color={"primary"}
                                onClick={async ()=>{

                                showLoading("در حال ویرایش");

                                //const userObject = localStorage.getItem('user');
                                await UpdateApi(
                                    {url:ZONE_UPDATE.URL,//url:`${API_BASE_URL}/ATR/api/v1.0/zone`,
                                        data:{
                                            zoneId: zoneId,
                                            namEnCaptionZone: namEnCaptionZone,
                                            namFaCaptionZone: namFaCaptionZone,
                                            namCreatorUserName: localStorage.getItem('userToken'),
                                            desCreatorDisplayName: JSON.parse(localStorage.getItem('user'))['name'],
                                            flgStatusZone: flgStatusZone,
                                            zoneAdmin: zoneAdmin
                                        }
                                    }
                                )
                                .then(result => {
                                    if(result.status===200) {
                                        // showSnack(result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت بروزرسانی شد", "success", true, 3000);
                                        const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت بروزرسانی شد";
                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                            showSnack(message, "success", true, 3000);
                                        }
                                        else
                                            deleteCacheApi({url:`${ZONE_GET.URL}`})
                                                .then(resCatch=>{
                                                    if(resCatch.status==200){
                                                        if(resCatch.data?.status=='Ok') {
                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                            return;
                                                        }
                                                        showSnack(message, "success", true, 3000);
                                                    }
                                                })
                                                .catch(errCatch=>{
                                                    showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                                                });

                                        hideLoading();
                                        setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
                                    }
                                    else
                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") :"خطا در ایجاد اطلاعات", "error", true, 3000);

                                    hideLoading();
                                })
                                .catch(err=>{
                                    showSnack( "خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
                                });
                                setWhichCompShow('');
                            }} > ذخیره </Button>
                        }

                        <Button
                            color="secondary"
                            onClick={()=>setWhichCompShow('')} > بستن </Button>
                    </>
                }
            >
            <Grid container spacing={0}>
                <Grid item md={12} xs={12}>

                    <TextField
                        //dir='RTL'
                        //fullWidth
                        value={namEnCaptionZone}
                        label={getTitle(columns,'namEnCaptionZone')}
                        //placeholder={getTitle(columns,'namEnCaptionZone')}
                        validationType={['alpha','length','uppercase']}
                        validationTypeParam={[null,{min:3,max:3},null]}
                        style={{direction:'ltr'}}
                        inputProps={{maxlength:3}}
                        onChange={e=> {
                            setNamEnCaptionZone(e.target.value);
                            }
                        }
                        className={namEnCaptionZone && namEnCaptionZone.length>0 ? classes.formControlNotEmpty :classes.formControlEmpty}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <TextField
                        //fullWidth
                        label={getTitle(columns,'namFaCaptionZone')}
                        value={namFaCaptionZone}
                        validationType={['alphaFa']}
                        onChange={e=>setNamFaCaptionZone(e.target.value)}
                        className={namFaCaptionZone && namFaCaptionZone.length>0 ? classes.formControlNotEmpty :classes.formControlEmpty}
                    />
                </Grid>
                {/*<Grid item md={12} xs={12}>*/}
                {/*    <TextField*/}
                {/*        label={columns.filter(item=>item.field=='namCreatorUserName')[0].title}*/}
                {/*        value={namCreatorUserName}*/}
                {/*        onChange={e=>setNamCreatorUserName(e.target.value)}*/}
                {/*    />*/}
                {/*</Grid>*/}
                {/*<Grid item md={12} xs={12}>*/}
                {/*    <TextField*/}
                {/*        label={columns.filter(item=>item.field=='desCreatorDisplayName')[0].title}*/}
                {/*        value={desCreatorDisplayName}*/}
                {/*        onChange={e=>setDesCreatorDisplayName(e.target.value)}*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid item md={12} xs={12}>
                    <FormControlLabel style={{margin:2,padding:2}}
                        control={
                            <Switch
                                checked={flgStatusZone}
                                onChange={(e)=>{
                                    setFlgStatusZone(e.target.checked);
                                }}
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label={getTitle(columns,'flgStatusZone')}
                    />
                </Grid>

                <Grid item md={12} xs={12}>
                    {/*<PersonAutocomplete*/}
                    {/*    label={getTitle(columns,'zoneAdmin')}*/}
                    {/*    seperatorCharacter={","}*/}
                    {/*    value={zoneAdmin}*/}
                    {/*     returnFunction={*/}
                    {/*         (id,title)=>{*/}
                    {/*             setZoneAdmin([id]);*/}
                    {/*             //setZoneAdmin(prev=>prev ? (prev.includes(id) ? prev:[...zoneAdmin,id]) : []);*/}
                    {/*         }*/}
                    {/*     }*/}
                    {/*/>*/}

                    <UsersGroupsApprolesSearch
                        selectedRowsUsers={zoneAdmin}
                        jsonUserName={"userDisplayName"}
                        jsonUserValue={"userName"}
                        seperator={" - "}
                        label={"کاربران"}
                        onChangeSelectionRow={(type,selectedRows)=>{
                            switch(type.toLowerCase()){
                                case 'users':
                                    setZoneAdmin(selectedRows);
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
                                setOpen={() => {
                                    setWhichCompShow('');
                                }}
                                dialogTitle={"حذف "}
                                dialogContent={"آیا مایل به حذف حوزه هستید؟"}
                                onExecute={
                                    async (event,confirmationRowData)=>{
                                        showLoading("در حال حذف رکورد");
                                        await DeleteApi( {url:ZONE_DELETE.URL+rowData.zoneId,//`${API_BASE_URL}/ATR/api/v1.0/deleteZone/${rowData.zoneId}`
                                        })
                                            .then(result => {

                                                switch(result.status){
                                                    case 200:
                                                        //showSnack(result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت انجام شد"  , "success", true, 3000);
                                                        const message = result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت انجام شد";
                                                        if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                                                            showSnack(message, "success", true, 3000);
                                                        }
                                                        else
                                                            deleteCacheApi({url:`${ZONE_GET.URL}`})
                                                                .then(resCatch=>{
                                                                    if(resCatch.status==200){
                                                                        if(resCatch.data?.status=='Ok') {
                                                                            showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                                                            return;
                                                                        }
                                                                        showSnack(message, "success", true, 3000);
                                                                    }
                                                                })
                                                                .catch(errCatch=>{
                                                                    showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                                                                });

                                                        hideLoading();
                                                        setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
                                                        break;
                                                    case 428:
                                                        hideLoading();
                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات", "error", true, 3000);
                                                        break;
                                                    default:
                                                        hideLoading();

                                                        showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در حذف اطلاعات", "error", true, 3000);
                                                }

                                                setWhichCompShow('');
                                            })
                                            .catch(err=>{
                                                showSnack("خطای اساسی در حذف اطلاعات", "error", true, 3000);
                                                hideLoading();
                                            });
                                    }
                                }/>
            }

            </div>
        )
    }

    return (
        <div>
            {/*<React.Suspense fallback={<h1>Loading ...</h1>}>   {data.length > 0 && */}
                <MaterialTable
                    title={""}
                    columns={columns}
                    data={context.atrState.zoneWithPowerUser}
                    url={ZONE_GET.URL}
                    actions={actions}
                    gridLoad={gridLoad}
                    onLoad={(data)=>{
                        context.atrDispatch({type:'zoneWithPowerUser',data:data});
                    }}
                />
            {whichCompShow.length>0 &&
                <FormItemsAdd/>
            }
            {/*</React.Suspense>*/}
        </div>
    )
}

export default Zone;
