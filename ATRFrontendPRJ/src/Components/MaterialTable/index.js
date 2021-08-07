import React, {useEffect, useState} from 'react';
import MaterialTable, {MTableBodyRow, MTableToolbar} from 'material-table';

// import IconButton from '@material-ui/core/IconButton';
// import Mail from '@material-ui/icons/Mail';
// import PropTypes from 'prop-types';
// import Dialog from '../Dialog';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MoreVert from '@material-ui/icons/MoreVert';
import Refresh from '@material-ui/icons/Refresh';

import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles';

//import  {readApi} from '@irisa/components-material-v.4/lib/config/FetchSign'
import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
import {LOCAL_STORAGE_BFF} from "../../Utils/Config/constants";
import {ReadApi} from "../../Utils/Config/CallServiceRouter";
import {makeStyles} from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import TablePagination from "@material-ui/core/TablePagination";


const myStyleTheme = createMuiTheme(
{
    overrides:{
        // MuiToolbar:{root:
        //         {
        //             display:'flex',
        //             direction:"ltr",
        //             fontFamily: 'IRANSans-web',
        //             justifyContent:'space-between'
        //         }},
        // MTableToolbar:{
        //     root:
        //         {
        //             display:'none',
        //             //direction:"ltr",
        //             fontFamily: 'IRANSans-web',
        //             //justifyContent:'space-between'
        //         },
        //     spacer:{
        //         display:'none'
        //     }
        // },

        MuiInputBase:{
            root:{
                fontFamily:'inherit'
            },
            input:{textAlign:'right',}
        },
        MuiTableRow:{
                    root:{
                        fontFamily: 'IRANSans-web',
                        fontSize:10,
                        height: 60
                    },
                    head: {
                        height: 40,
                        borderBottom: "1px solid #c7c7c7"
                    }
                },
        MuiTableCell: {
            root: {
                padding: '0 4px',
                textAlign: "center",
                fontFamily: 'IRANSans-web'
            },
            body: {
                fontFamily: 'IRANSans-web',
                fontSize: '11px'
            },
            head: {
                        fontSize: '0.7rem',
                        height: 60
                    },
            alignLeft:{textAlign:'center'}
        },
        MuiTablePagination: {
            toolbar:{direction:'ltr'},
            caption: {
                fontSize: '11px'
            }
        },
        MuiTableSortLabel: {
                    root: {
                        //color: "#009ce6",
                        color: '#263238',
                        alignContent: 'center',
                    }
                },
        MuiIconButton:{
          root:{
              fontFamily:'inherit'
          }
        },
        MuiButton: {
            root: {
                color: 'inherit',
                paddingLeft: "16px",
                paddingRight: "16px",
                minHeight: 24,
                backgroundPosition: 'left',
                minWidth: 32,
                fontFamily:'inherit'
                // margin: '12px 16px 8px'
            },
            containedPrimary: {
                color: '#009ce6',
                border: '1px solid #009ce6',
                backgroundColor: '#e6f5fc',
                '&:hover': {
                    backgroundColor: 'rgb(61, 56, 165)',
                    color: '#ffffff',
                    transition: 'all 0.5s ease'
                },
            },
            containedSecondary: {
                color: '#fff',
                borderColor: '#009ce6',
                backgroundColor: '#5850EC',
                '&:hover': {
                    backgroundColor: 'rgb(61, 56, 165)',
                    color: '#ffffff',
                    transition: 'all 0.5s ease'
                },
            },
            contained: {
                color: '#009ce6',
                borderColor: '#009ce6',
                backgroundColor: '#e6f5fc',
                boxShadow: 'none'
            },
            label: {
                fontSize: 12,
            },
            sizeSmall: {
                padding: "0 4px",
                fontSize: 9
            },
            sizeLarge: {
                padding: '4px 12px'
            }
            // end changed by Mohsen
        },
        MuiTooltip:{
            tooltip:{
                fontFamily: 'IRANSans-web',
                fontSize:10,
            }
        }
        // MTableHeader: {
        //     header:{
        //         fontFamily: 'IRANSans-web',
        //         fontSize:20,
        //         height: 60
        //     }
        // }

    }

    });

const useStyle = makeStyles(theme=>({
    mTableToolbarRoot:
        {
            display:'flex',
            direction:"ltr",
            fontFamily: 'IRANSans-web',
            justifyContent:'space-between'
        },
    mTableToolbarRootTree:
        {
            display:'flex',
            direction:"rtl",
            fontFamily: 'IRANSans-web',
            justifyContent:'space-between'
        },
    mTableToolbarActions:{
        direction:'rtl'
    },
    mTableToolbarSpacer:{
        display:'none'
    },
    mTableBodyRow: {
        row: {
            '& button': {
                display: 'none'
            },
            '&:hover': {
                '& button': {
                    display: 'block'
                }
            }
        }
    }
}));

export default function MaterialTableDemo(props) {
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        console.log("open", open)
    },[open])

    const tableIcons = {
        Add: React.forwardRef((props, ref) => <AddBox {...props} ref={ref} onClick={e=>alert('AddBox Click me')} />),
        Check: React.forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: React.forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: React.forwardRef((props, ref) => {return (open===false ?
            <ChevronLeft {...props} ref={ref} onClick={()=>{setOpen(true)}}  /> :
            <ChevronRight {...props} ref={ref}  onClick={()=>{setOpen(false)}}  />)}),
        // DetailPanel: React.forwardRef((props, ref) =>  <ChevronLeft {...props} ref={ref}  /> ),
        Edit: React.forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: React.forwardRef((props, ref) => <SaveAlt {...props} ref={ref} onClick={e=>alert('SaveAlt Click me')} />),
        Filter: React.forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: React.forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: React.forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: React.forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: React.forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: React.forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: React.forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: React.forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: React.forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: React.forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };


    const tableRef = React.createRef();
    const classes=useStyle();

    const {icons,columns,data,actions,editable,title,endpoint,
        url,gridLoad,
        formItemsAdd,formItemsEdit,
        options,others,onLoad
    } = props;

    const [state, setState] = React.useState({
        data:data
    });

    console.log("MaterialTable is running",props);

    const [show,setShow] = React.useState(false);


    React.useEffect(()=>{

        async function loadWebService(){

            if((url && ((data && data.length===0) || !data) )|| (url && gridLoad.isForceRefresh)) {

                showLoading('لطفا منتظر بمانید');
                await ReadApi({url: url,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'})
                    .then(res => {
                        if(!res.status){
                            showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                            hideLoading();
                            throw new Error("خطا در بازیابی اطلاعات");
                            return;
                        }

                        if (res.status === 200 || res.status === 304) {
                            const internalData = res.data.content ? res.data.content : res.data;
                            setState({...state, data: internalData});

                            if(onLoad) {
                                onLoad(internalData);
                            }
                        }
                        else if(res.status === 204){
                            setState({...state, data: []});
                            if(onLoad)
                                onLoad([]);
                        }
                        hideLoading();
                    })
                    .catch(err=>{
                        showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                        hideLoading();
                        console.error('ERROR',err);
                        if(props.onError)
                            props.onError(err);
                    });
            }
        }

        //if(gridLoad)
            loadWebService();
    },[gridLoad.isLoad]);

    return (
        <MuiThemeProvider theme={myStyleTheme}>
        <div className={"version-2"}>
            <MaterialTable
                icons={icons ? icons : tableIcons}
                tableRef={tableRef}
                title={""}
                columns={columns}
                //data={state.data && Array.isArray(state.data) ? state.data : data }
                data={state.data}
                editable={editable}
                components={{
                    Toolbar: propsToolbar => (
                        <MTableToolbar {...propsToolbar}
                                       classes={{
                                           root:props.isTree ? classes.mTableToolbarRootTree:classes.mTableToolbarRoot,
                                           actions: classes.mTableToolbarActions ,
                                           spacer: classes.mTableToolbarSpacer
                                       }}
                        />
                    ),
                    // Row: props=> {
                    //     return  <MTableBodyRow {...props} className={classes.mTableBodyRow} onClick={()=>alert(0) } />
                    // },
                    // Cell:props=>{
                    //     console.log('Cell',props);
                    //     return <div>Test</div>
                    // }
                    // Pagination: props => (
                    //     <TablePagination />),

                }}
                actions={[
                    {isFreeAction:true,icon:()=>(<MoreVert />),tooltip:'منوهای بیشتر',onClick:(event,rowData)=>{}},
                    ...actions,
                ]}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} ', // از {count}
                        labelRowsPerPage:'سطرها در صفحه:',
                        labelRowsSelect: "سطرها",
                        nextTooltip:"بعدی",
                        previousTooltip:"قبلی",
                        lastTooltip:"آخر",
                        firstTooltip:"اول"

                    },
                    toolbar: {
                        nRowsSelected: '{0} سطر(ها) انتخاب شده',
                        searchPlaceholder:'جستجو'
                    },
                    header: {
                        actions: 'عملیات'
                    },
                    body: {
                        emptyDataSourceMessage: 'رکوردی برای نمایش وجود ندارد',
                        filterRow: {
                            filterTooltip: 'فیلتر'
                        }
                    }
                }}
                options={{
                    ...options,
                    headerStyle: {
                        //backgroundColor: '#01579b',
                        //color: '#FFF',
                        fontFamily: 'IRANSans-web',
                        fontSize:12
                    },
                    toolbarButtonAlignment:'left',
                    //selection: true
                }}
                {...props}
            />
        </div>
        </MuiThemeProvider>
    );
}

/*
* : query=> new Promise((resolve,reject)=>{

                    try{
                        const murl = new URL(url);
                    }
                    catch(e){
                        reject({
                            data: null,
                            page: 0,
                            totalCount: 0,
                            error: 'invalid URL |'
                        });
                    }

                    readApi({url:url})
                        .then(res=>{
                            if(res.status===200){

                                resolve({
                                    data: res.data.content ? res.data.content:res.data,
                                    page: res.data.number,
                                    totalCount: res.data.totalElements,
                                });
                            }
                            else{
                                reject({
                                    data: null,
                                    page: 0,
                                    totalCount: 0,
                                });
                            }
                        });

                })
* */
