import React from 'react';
import MaterialTable from '../../MaterialTable';
// import AddBox from '@material-ui/icons/AddBox';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
//import {getDataFromFile} from '../../../webservice';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@irisa/components-material-v.4/lib/TextField';
// import Dialog from "../../Dialog";
import Button from '../../General/Button';
// import {API_BASE_URL} from "../../../Utils/Config/constants";
// import {updateApi, createApi, readApi,deleteApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
//import Autocomplete from '../PersonAutocomplete';
// import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
//import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
// import ConfirmationDialog from "@irisa/components-material-v.4/lib/ConfirmationDialog";
import Menu from './Menu';
import Add from "@material-ui/icons/Add";
import Refresh from "@material-ui/icons/Refresh";
import blue from '@material-ui/core/colors/blue';
//import {ContextCache} from "../../../Context";
import {ContextCache} from "../../../Utils/StateManagement/context/index";
import {MENU_CREATE, MENU_GRID_GET, MENU_PRIORITY_UPDATE} from "../../../Utils/Config/RouterServices/Menu";
import {MTableBodyRow, MTableToolbar} from "material-table";
import {styled} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import {ArrowDropDown, ArrowDropUp, VerticalAlignBottom, VerticalAlignTop} from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import {CreateApi, deleteCacheApi, UpdateApi} from "../../../Utils/Config/CallServiceRouter";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
import {hideLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";

// const MyToolbar = styled(MTableToolbar)(props=>({
//     root:
//         {
//             display:'flex',
//             //direction:"ltr",
//             fontFamily: 'IRANSans-web',
//             justifyContent:'space-between',
//             backgroundColor:'red',
//         },
//         spacer:{
//             display:'none'
//         }
// }));


const useStyle = makeStyles(theme=>({
    buttonUpDown:{display:'flex',flexDirection:'column'}
}));

const array = [];

export default function MenuManagement(props){

    const classes=useStyle();
    const [whichCompShow,setWhichCompShow] = React.useState('');
    const [rowData,setRowData] = React.useState([]);
    const [data,setData] = React.useState(
        []
    );
    const [gridLoad,setGridLoad] = React.useState({isLoad:false,isForceRefresh:false});
    const [error,setError] = React.useState(null);

    const title = "مدیریت منوها";

    const columns=[
        {field: 'desDescriptionMenu', title: 'عنوان منو'},
        {field: 'flgActiveMenu', title: 'وضعیت ' , type:'boolean'},
        {field: 'namRelativeUrlMenu', title: 'آدرس منو '},
        {field: 'creator', title: 'ایجاد کننده منو'},
        {field: 'zoneCaption', title: 'حوزه' },
        {field: 'appCaption', title: 'سیستم ' },
        {field: 'desType', title: 'نوع' },
        {field: 'numPriorityMenu', title: 'اولویت' },
    ];

    const onChangePriority = async (node,state)=>{

        if(!node?.menuId){
            showSnack("خطا در پیدا کردن نود", "error", true, 3000);
            return;
        }
        console.log('onChangePriority',{node,state});

        //debugger;
        const dataForChangePriority = [
            {
                "menuId": node?.menuId
            }
            ,
            {
                "menuId": state=="UP" ? node?.previous : node?.next
            }
        ];
        //return;

        await UpdateApi(
            {url:MENU_PRIORITY_UPDATE.URL,
                data:dataForChangePriority
            }
        )
        .then( result => {
            if(result.status===200) {

                const message = "جابجایی ترتیب منوها با موفقیت انجام شد";//result.data && result.data.length>0 ? result.data.join(",") : "اطلاعات با موفقیت ایجاد شد";
                if(localStorage.getItem('LOCAL_STORAGE_BFF')=='0') {
                    showSnack(message, "success", true, 3000);
                }
                else
                    deleteCacheApi({url:`${MENU_GRID_GET.URL}${localStorage.getItem('userToken')}`})
                        .then(resCatch=>{
                            if(resCatch.status==200){
                                if(resCatch.data?.status=='Ok') {
                                    showSnack(`${resCatch.data?.message} . ${message}` , "success", true, 3000);
                                    //onSaveSuccess();
                                    return;
                                }
                                showSnack(message, "success", true, 3000);
                                //onSaveSuccess();
                            }
                        })
                        .catch(errCatch=>{
                            showSnack(`${message} خطا در حذف کلید . ` , "success", true, 3000);
                            //onSaveFailed();
                        });

                setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});
            }
            else {
                showSnack("خطا در جابجایی ترتیب منوها ", "error", true, 3000);

                //showSnack(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات", "error", true, 3000);
                //onSaveFailed();
                //throw new Error(result.response.data && result.response.data.length>0 ? result.response.data.join(",") : "خطا در ایجاد اطلاعات");
            }
            hideLoading();
        })
        .catch(err=>{
            //showSnack("خطای اساسی در ایجاد اطلاعات", "error", true, 3000);
            //onSaveFailed();
            //hideLoading();
            console.error('ERROR',err);
            //props.onError(err);
        });
    }

    const actions = [
        {isFreeAction:true,icon:()=>(<Refresh />),tooltip:'بروزرسانی',onClick:(event,rowData)=>setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true})},
        {isFreeAction:true,icon:()=>(<Button color={"primary"}>ایجاد ریشه</Button>),tooltip:'ایجاد ریشه',onClick:(event,rowData)=>{setWhichCompShow('add_root');}},
        {icon:Add,tooltip:'ایجاد',onClick:(event,rowData)=>
            {
                setRowData(prev=>{
                    const res = {
                        parentMenuId: rowData.menuId,
                        desDescriptionParentMenu: rowData.desDescriptionMenu
                    };
                    return res;
                });
                setWhichCompShow('add');
            }},
        {icon:Edit,tooltip:'ویرایش',onClick:(event,rowData)=>{
            setWhichCompShow('edit');
            setRowData(rowData);
        }},
        {icon:DeleteOutline,tooltip:'حذف',onClick:async (event,rowData)=>{
            setWhichCompShow('delete');
            setRowData(rowData);
        }},
        rowData1=>(
        {icon:()=> <div className={classes.buttonUpDown}><Tooltip title={'بالا'}><ArrowDropUp onClick={()=>onChangePriority(array.find(item=>item.menuId==rowData1.menuId),'UP')}/></Tooltip><Tooltip title={'پایین'}><ArrowDropDown  onClick={()=>onChangePriority(array.find(item=>item.menuId==rowData1.menuId),'DOWN')}/></Tooltip></div>
        ,
            //hidden:!rowData.parentMenuId,
            //hidden:true,
            // onClick: (event,rowData)=>{
            // }
            }),
        // {icon:VerticalAlignBottom,tooltip:'پایین',onClick:async (event,rowData)=>{
        // }}
    ];

    const context = React.useContext(ContextCache);

    function getTitle(dataColumns,fieldName){
       return dataColumns.filter(item=>item.field==fieldName)[0].title
    }

    console.log('MenuManagement is rendering',error);

    if(error)
            throw error;
    else
    return (
        <div>
            {/*<React.Suspense fallback={<h1>Loading ...</h1>}>   {data.length > 0 && */}

                <MaterialTable
                    // components={{
                    //     Toolbar: props => (
                    //             <MTableToolbar {...props}
                    //                 classes={{spacer:classes.toolbar}}
                    //             />
                    //     ),
                    //     Row: props=> {
                    //         console.log('ROW',props);
                    //        return  <MTableBodyRow {...props} />
                    //     }
                    // }}
                    title={""}
                    columns={columns}
                    data={context.atrState.menuByPermission}
                    url={`${MENU_GRID_GET.URL}${localStorage.getItem('userToken')}`}
                    actions={actions}
                    gridLoad={gridLoad}
                    onLoad={(data)=>{
                        context.atrDispatch({type:'menuByPermission',data:data});
                    }}
                    parentChildData={(row, rows) => {
                        const foundData = rows.find(a => a.menuId == row.parentMenuId);
                        if(foundData?.menuId && !array.find(item=>item.menuId==foundData?.menuId)) {
                            array.push({menuId: foundData?.menuId, next: null, previous: null});
                            if(array.length-1)
                                array[array.length-2].next=array[array.length-1]?.menuId;

                            if(array.length-1)
                                array[array.length-1].previous=array[array.length-2]?.menuId;

                            console.log('foundData', {array, foundData});
                        }

                        return foundData;
                    }
                    }
                    onTreeExpandChange={(event,nodes)=>{
                        console.log("ebrahim",event,nodes);
                        if(nodes){
                            setRowData(event);

                            if(event?.menuId && !array.find(item=>item.menuId==event?.menuId)) {
                                array.push({menuId: event?.menuId, next: null, previous: null});
                                if(array.length-1)
                                    array[array.length-2].next=array[array.length-1]?.menuId;

                                if(array.length-1)
                                    array[array.length-1].previous=array[array.length-2]?.menuId;

                                console.log('foundData', {array, event});
                            }
                        }
                    }}
                    options={{
                        //selection: true,
                        rowStyle:(event)=>{
                            if(rowData.menuId===event.parentMenuId)
                                return {
                                    backgroundColor: blue[200]
                                }

                        }
                    }}
                    // detailPanel={[{
                    //     icon: ()=><VerticalAlignTop
                    //         onMouseEnter={(e)=>{console.warn('onMouseEnter',e)}}
                    //     />,
                    //     tooltip: 'Show Surname',
                    //     render: rowData=> {
                    //         return (
                    //             <IconButton aria-label="User"
                    //                         //onMouseOver={(e)=>{console.warn('onMouseOver',e)}}
                    //                         //onMouseEnter={(e)=>{console.warn('onMouseEnter',e)}}
                    //                         onClick={(event, rowData)=>{
                    //                 //setRows(rowData);
                    //                 //setOpen(true);
                    //             } }>
                    //                 <Add/>
                    //             </IconButton>
                    //
                    //         )
                    //     },
                    // },
                    // ]}
                    onError={err=>setError(err)}
                    isTree={true}
                    //onSelectionChange={(data) => {console.log('onSelectionChange',data);}}
                />
            {whichCompShow.length>0 &&
            <Menu
                title={title}
                columns={columns}
                whichCompShow={whichCompShow}
                rowData={rowData}
                onClose={e => setWhichCompShow('')}
                onSaveSuccess={() => {
                    setGridLoad({isLoad:!gridLoad.isLoad,isForceRefresh:true});

                    setWhichCompShow('');
                    setGridLoad({isLoad:false,isForceRefresh:true});
                }}
                onSaveFailed={() => {
                    //setGridLoad(!gridLoad);
                    //setWhichCompShow('');
                }}
                onCancelClick={() => {
                    //setGridLoad(!gridLoad);
                    setWhichCompShow('');
                }}
                onLoadFailed={()=>{
                    setWhichCompShow('');
                }
                }
                onError={err=>setError(err)}
                isAdmin
            />
            }
            {/*</React.Suspense>*/}
        </div>
    )
}

