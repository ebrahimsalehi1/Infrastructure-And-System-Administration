import React from 'react';
import MaterialTable from '../../MaterialTable';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Button from '../../General/Button';
import {API_BASE_URL} from "../../../Utils/Config/constants";
import Role from './Role';
import {makeStyles} from '@material-ui/styles';
import Refresh from "@material-ui/icons/Refresh";
//import {ContextCache} from "../../../Context";
import {ContextCache} from "../../../Utils/StateManagement/context/index";
import {APPLICATION_ROLE_GET} from "../../../Utils/Config/RouterServices/Role";

export default function RoleManagement(props){

    const [whichCompShow,setWhichCompShow] = React.useState('');
    const [rowData,setRowData] = React.useState([]);
    const [gridLoad,setGridLoad] = React.useState({isLoad:false,isForceRefresh:false});

    const title = "مدیریت نقش های سیستمی";

    const columns=[
        //{field:'applicationRoleId',hide:true},
        {field: 'desDescriptionApprol', title: 'عنوان فارسی'},
        {field: 'namRoleApprol', title: 'عنوان انگلیسی'},
        {field: 'creator', title: 'ایجاد کننده نقش'},
        {field: 'zoneCaption', title: 'عنوان حوزه'},
        {field: 'appCaption', title: 'عنوان سیستم'},
        {field: 'flgStatusApprol', title: 'وضعیت ' , type:'boolean'},
        {field: 'type', title: 'نوع' },
        // {field: 'flgIsAdmin', title: 'کاربر اصلی' , type:'boolean'},
        // {field: 'flgIsPowerUser', title: 'راهبر ' , type:'boolean'},
        //{field: 'zoneAdmin', title: 'شماره پرسنلی ' ,value:[]},
        //{field: 'zoneAdminDisplayName', title: 'نام و نام خانوادگی ' ,value:''},
    ];

    const actions = [
        {isFreeAction:true,icon:()=>(<Refresh />),tooltip:'بروزرسانی',onClick:(event,rowData)=>setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true})},
        {isFreeAction:true,icon:()=>(<Button color={"primary"}>ایجاد</Button>),tooltip:'ایجاد',onClick:(event,rowData)=>{console.log('onclick');setWhichCompShow('add');}},
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

    return (
        <div>
            {/*<React.Suspense fallback={<h1>Loading ...</h1>}>   {data.length > 0 && */}
                <MaterialTable
                    title={""}
                    columns={columns}
                    data={context.atrState.applicationRolesByPermission}
                    url={`${APPLICATION_ROLE_GET.URL}${localStorage.getItem('userToken')}?size=1000&page=0&filter=`}
                    actions={actions}
                    gridLoad={gridLoad}
                    onLoad={(data)=>{
                        context.atrDispatch({type:'applicationRolesByPermission',data:data});
                    }}
                />
            {whichCompShow.length>0  &&
            <Role
                title={title}
                columns={columns}
                whichCompShow={whichCompShow}
                rowData={rowData}
                onClose={e => setWhichCompShow('')}
                onOperationSuccess={(e) => {
                    setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
                    setWhichCompShow('');
                }}
                onOperationFail={(e) => {
                    setWhichCompShow('')
                }}
                isAdmin
            />
            }
            {/*</React.Suspense>*/}
        </div>
    )
}

