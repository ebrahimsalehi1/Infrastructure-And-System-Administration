import React from 'react';
import MaterialTable from '../../MaterialTable';
import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
//import {getDataFromFile} from '../../../webservice';
import Grid from '@material-ui/core/Grid';
//import TextField from '@irisa/components-material-v.4/lib/TextField';
import TextField from '@material-ui/core/TextField';
import Dialog from "../../Dialog";
import Button from '../../General/Button';
import {API_BASE_URL} from "../../../Utils/Config/constants";
//import {updateApi, createApi, readApi,deleteApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
//import Autocomplete from '../PersonAutocomplete';
import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
// import ConfirmationDialog from "@irisa/components-material-v.4/lib/ConfirmationDialog";
import ConfirmationDialog from "../../General/ConfirmationDialog";
import Application from './Application';
import Refresh from "@material-ui/icons/Refresh";
//import {ContextCache} from "../../../Context";
import {ContextCache} from "../../../Utils/StateManagement/context/index";
import {APPLICATION_GET} from "../../../Utils/Config/RouterServices/Application";

export default function ApplicationManagement(props){

    const [whichCompShow,setWhichCompShow] = React.useState('');
    const [rowData,setRowData] = React.useState([]);
    const [data,setData] = React.useState([]);
    const [gridLoad,setGridLoad] = React.useState({isLoad:false,isForceRefresh:false});

    const title = "مدیریت زیر سیستم ها";

    const columns=[
        //{field:'applicationRoleId',hide:true},
        {field: 'namEnCaptionApp', title: 'عنوان انگلیسی'},
        {field: 'namFaCaptionApp', title: 'عنوان فارسی'},
        {field: 'zoneCaption', title: 'حوزه' },
        {field: 'namCreatorUserName', title: 'شماره پرسنلی'},
        {field: 'desCreatorDisplayName', title: 'نام و نام خانوادگی'},
        {field: 'flgStatusApp', title: 'وضعیت ' , type:'boolean'},
        //{field: 'flgIsPowerUser', title: 'راهبر ' , type:'boolean'},
        //{field: 'zoneAdmin', title: 'شماره پرسنلی ' ,value:[]},
        //{field: 'zoneAdminDisplayName', title: 'نام و نام خانوادگی ' ,value:''},
    ];

    const actions = [
        {isFreeAction:true,icon:()=>(<Refresh />),tooltip:'بروزرسانی',onClick:(event,rowData)=> {
                setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
            }},
        {isFreeAction:true,icon:()=>(<Button color={"primary"}>ایجاد</Button>),tooltip:'ایجاد',onClick:(event,rowData)=>{console.log('onclick',rowData);setWhichCompShow('add');}},
        {icon:Edit,tooltip:'ویرایش',onClick:(event,rowData)=>{
            setWhichCompShow('edit');
            console.log(rowData);
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

    console.log('Application is rendering',
                localStorage.getItem('userToken'),
                //JSON.parse(localStorage.getItem('user')).name
        );

    return (
        <div>
            {/*<React.Suspense fallback={<h1>Loading ...</h1>}>   {data.length > 0 && */}
                <MaterialTable
                    title={""}
                    columns={columns}
                    data={context.atrState.applicationByPermission}
                    url={`${APPLICATION_GET.URL}${localStorage.getItem('userToken')}?size=10000&page=0&filter=`}
                    actions={actions}
                    gridLoad={gridLoad}
                    onLoad={(data)=>{
                        context.atrDispatch({type:'applicationByPermission',data:data});
                    }}
                />
            {whichCompShow.length > 0 &&
            <Application
                title={title}
                columns={columns}
                whichCompShow={whichCompShow}
                rowData={rowData}
                onClose={e => setWhichCompShow('')}
                onOperationSuccess={() => {
                    setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
                    setWhichCompShow('');
                }}
                onOperationFail={() => {
                    setWhichCompShow('');
                }}
                isAdmin
            />
            }
            {/*</React.Suspense>*/}
        </div>
    )
}

