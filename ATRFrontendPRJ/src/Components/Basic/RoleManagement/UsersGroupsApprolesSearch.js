import React, {useState} from 'react';
import {Select, MenuItem, Grid} from '@material-ui/core';
//import {withStyles} from "@material-ui/core";
//import {styles} from "../../assets/jss/style";
//import {API_BASE_URL} from "../../config/constants";
import * as PropTypes from "prop-types";
import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
//import {readApi, createApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import {API_BASE_URL, LOCAL_STORAGE_BFF} from "../../../Utils/Config/constants";
import {showSnack} from "@irisa/components-material-v.4/lib/redux/actions/snackActions";
import IconButton from '@material-ui/core/IconButton';
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import TextField from "@irisa/components-material-v.4/lib/TextField";
import TextFieldMaterial from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from "../../Dialog";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Chip from "@material-ui/core/Chip";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import RoleIcon from "@material-ui/icons/Accessibility";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import {GROUPS_POST, USERS_GET} from "../../../Utils/Config/RouterServices/External";
import {APPLICATION_ROLE_LIST} from "../../../Utils/Config/RouterServices/Role";
import {CreateApi, ReadApi} from "../../../Utils/Config/CallServiceRouter";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: '100%',
        height: 200,
        overflow: 'auto',
        padding:0,
        boxShadow:'none',
        border:'none'
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
    card:{
        padding:0,
        margin:0,
        border:'none',
        boxShadow:'none'
    },
    cardBoard:{
        padding:0,
        margin:0,
        width:'100%',
        height:200
    },
    chip: {
        padding: theme.spacing.unit
    },
    textfieldfullWidth:{
        MuiFormControl:{
            root:{
                width:'100%'
            }
        }
    },
    // textfieldScroll:{
    //     root:{
    //         overflowY:'scroll',
    //         height:'none',
    //         maxHeight:150,
    //     },
    //     MuiOutlinedInput: {
    //         multiline:{
    //             padding:0,
    //             boxSizing: 'unset'
    //         }
    //     }
    //
    // }

}));

const MyTab = withStyles(({
    root:{
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        },
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: 4,
        marginRight: 4 * 4,
    },
    wrapper:{
        flexDirection: 'row',
        display: 'inline-flex',
        width:'150px',
    },
    labelContainer:{
        //width:'70%',
        fontSize:'10px',
        padding: 0,
        margin: 0,
    }
}))(Tab);

function getItem(item,seperator){
    let s='';
    let prev = null;
    for(let obj in item){
        s += (prev && item[obj] ? seperator:'')+(item[obj] ? item[obj] : '');
        prev = item[obj];
    }
    return s;
}

function getItem2(item,seperator, column1){
    var res = '';
    Object.entries(item)
        .filter(item=>item[0]==column1 )
        .forEach(item=>{
            res += item[1];//+seperator;
        });
    return res;
}

function getJsonFromKeys(item,jsonName,jsonValue){
    //debugger;
    const filteredName = Object.entries(item).find(item=>item[0]==jsonName);
    const filteredValue = Object.entries(item).find(item=>item[0]==jsonValue);

    const jsonData = `{"${jsonName}":"${filteredName[1]}","${jsonValue}":"${filteredValue[1]}"}`;
    console.log('getJsonFromKeys',{item,jsonName,jsonValue},jsonData);

    return JSON.parse(jsonData);
}


const CustomList = (props) => {
    const classes = useStyles();
    const {isChipEnabled,onChangeSelectionRow,itemUsers,itemGroups,itemApplicationRoles,
            jsonUserName,jsonUserValue,
            jsonGroupName,jsonGroupValue,
            jsonRoleName,jsonRoleValue,
            seperator,
            //zoneId,appId
        } = props;

    const textVal = React.useRef();
    const textValName = React.useRef();
    const [selectType,setSelectType] = React.useState(itemUsers ? 'users': itemGroups ? 'groups' : 'applicationrole');
    const [filteredItems,setFilteredItems] = React.useState(selectType==='users' ? itemUsers : selectType==='groups' ? itemGroups : selectType==='applicationrole' ? itemApplicationRoles:[]);
    const [approles,setApproles] = React.useState([]);
    const [checkedUsers,setCheckedUsers] = React.useState(itemUsers ? itemUsers : []);
    const [checkedGroups,setCheckedGroups] = React.useState(itemGroups ? itemGroups : []);
    const [checkedApplicationRoles,setCheckedApplicationRoles] = React.useState(itemApplicationRoles ? itemApplicationRoles : []);

    //const context = React.useContext(ContextCache);

    const handleToggle = (value) => () => {
        const currentIndex = selectType==='users' ? checkedUsers.indexOf(value) : selectType==='groups' ? checkedGroups.indexOf(value) : checkedApplicationRoles.indexOf(value);
        const newChecked = selectType==='users' ? [...checkedUsers] : selectType==='groups' ? [...checkedGroups] : [...checkedApplicationRoles];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        switch(selectType.toLocaleLowerCase()){
            case 'users':
                setCheckedUsers(newChecked);
                break;
            case 'groups':
                setCheckedGroups(newChecked);
                break;
            case 'applicationrole':
                setCheckedApplicationRoles(newChecked);
                break;
            default:
        }

        let newChecked2 = [];
        if(!jsonUserValue && !jsonUserName) {
            newChecked.map(item=>{
                if(item.name && item.value)
                    newChecked2.push(item.value);
                else
                    newChecked2.push(item);
            });
        }
        if(!jsonGroupValue && !jsonGroupName) {
            newChecked.map(item=>{
                if(item.name && item.value)
                    newChecked2.push(item.value);
                else
                    newChecked2.push(item);
            });
        }

        if(!jsonRoleValue && !jsonRoleName) {
            newChecked.map(item=>{
                if(item.name && item.value)
                    newChecked2.push(item.value);
                else
                    newChecked2.push(item);
            });
        }

        onChangeSelectionRow(selectType,
            selectType==='users' && !jsonUserValue && !jsonUserName ? newChecked2 :
            selectType==='groups' && !jsonGroupValue && !jsonGroupName ? newChecked2 :
            selectType==='applicationrole' && !jsonRoleValue && !jsonRoleName ? newChecked2
                    : newChecked
        );
    };

    const handlerSearch = async ()=>{
        if(!itemUsers && !itemGroups && !itemApplicationRoles)
            return;

        //console.log('textVal-textValName',textVal.current.value.length>2 || textValName.current.value.length>2,textVal.current.value,textValName.current.value);

        if(textVal.current.value.length===0)
            if(selectType.toLowerCase()==='applicationrole')
                setFilteredItems(approles);
            else
                setFilteredItems([]);

        if(textVal.current.value.length>2 || textValName.current.value.length>2){
            switch (selectType.toLowerCase()) {
                case 'users':
                    showLoading('لطفا منتظر بمانید');
                    await CreateApi({url: USERS_GET.URL, data:
                            {
                                employeeNumber: textVal.current.value,
                                displayName: textValName.current.value,
                                categories: "4,6"
                            }
                    })
                        .then(result => {
                            switch(result.status){
                                case 200:
                                    setFilteredItems(result.data.content.map(item=>{
                                        if(!jsonUserName && !jsonUserValue)
                                            return {name:item.displayname,value:item.employeeNumber};
                                        else
                                            return JSON.parse(`{"${jsonUserName}":"${item.displayname}","${jsonUserValue}":"${item.employeeNumber}"}`);
                                    }));
                                    break;
                                case 204:
                                    setFilteredItems([]);
                                    showSnack("هیچگونه اطلاعاتی جهت بازیابی وجود ندارد", "error", true, 3000);
                                    break;
                                default:
                                    showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                                    break;
                            }
                            hideLoading();
                        })
                        .catch(err => {
                            showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                            hideLoading();
                        });
                    break;
                case 'groups':
                    showLoading('لطفا منتظر بمانید');

                    await ReadApi({url:GROUPS_POST(textVal.current.value.toUpperCase()).URL,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'})
                    // await createApi({url:GROUPS_POST.URL,data: {
                    //         name: textVal.current.value.toUpperCase(),
                    //         advanced: true
                    //     }}
                    // )
                        .then(result => {
                            switch(result.status){
                                case 200:
                                    setFilteredItems([]);
                                    setFilteredItems(result.data.content.map(item=>{
                                       // return {name:item.description,value:item.name}
                                        if(!jsonGroupName && !jsonGroupValue)
                                                return {value:item.description,name:item.name};
                                        else
                                            return JSON.parse(`{"${jsonGroupValue}":"${item.description}","${jsonGroupName}":"${item.name}"}`);
                                    }));
                                    break;
                                case 204:
                                    setFilteredItems([]);
                                    showSnack("هیچگونه اطلاعاتی جهت بازیابی وجود ندارد", "error", true, 3000);
                                    break;
                                default:
                                    setFilteredItems([]);
                                    showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                                    break;
                            }
                            hideLoading();
                        })
                        .catch(err => {
                            showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                            hideLoading();
                        });
                    break;
                case 'applicationrole':
                    //     if(!context.atrState.currentData.zoneId) {
                    //     showSnack("حوزه بایستی مشخص شده باشد.", "error", true, 3000);
                    //     break;
                    // }
                    if(approles.length===0) {
                        showLoading('لطفا منتظر بمانید');
                        await ReadApi({url: `${APPLICATION_ROLE_LIST.URL}${localStorage.getItem('userToken')}`,LOCAL_STORAGE_BFF:localStorage.getItem('LOCAL_STORAGE_BFF')=='1'})
                        //await readApi({url: `${API_BASE_URL}/ATR/api/v1.0/applicationRolesByPermission/grid/${localStorage.getItem('userToken')}?size=10&page=0&filter=`})
                        // await createApi(
                        //     {
                        //          url: `${API_BASE_URL}/ATR/api/v1.0/applicationRoleByZoneAndApp?&size=1000&page=0&filter=`,
                        //          data: {
                        //              zoneId:context.atrState.currentData.zoneId,
                        //              appId:context.atrState.currentData.appId
                        //          }
                        // })
                            .then(result => {
                                if (result.status === 200) {

                                    const dataList = result.data.map(item=>({roleId:item.applicationRoleId,roleName:item.namRoleApprol}));
                                    setApproles(dataList.map(item=>{

                                        //if(!jsonRoleName && !jsonRoleValue)
                                        //    return {name:item.namRoleApprol,value:item.applicationRoleId};
                                        //else
                                            return getJsonFromKeys(item,jsonRoleName,jsonRoleValue);
                                            //return JSON.parse(`{"${jsonRoleName}":"${item.namRoleApprol}","${jsonRoleValue}":"${item.applicationRoleId}"}`);
                                    }));
                                    setFilteredItems(dataList
                                                        .filter(item=>item[jsonRoleName].toUpperCase().includes(textVal.current.value.toUpperCase()))
                                                        .map(item=>{
                                                            // if(!jsonRoleName && !jsonRoleValue)
                                                            //     return {name:item.namRoleApprol,value:item.applicationRoleId};
                                                            // else
                                                                return getJsonFromKeys(item,jsonRoleName,jsonRoleValue);
                                                                //return JSON.parse(`{"${jsonRoleName}":"${item.namRoleApprol}","${jsonRoleValue}":"${item.applicationRoleId}"}`);
                                                        })
                                    );
                                }
                                else if (result.status === 204) {
                                    setFilteredItems([]);
                                    showSnack("هیچگونه داده ای بازیابی نشد", "info", true, 3000);
                                }
                                else {
                                    setFilteredItems([]);
                                    showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                                }
                                hideLoading();
                            })
                            .catch(err => {
                                console.error(err);
                                showSnack("خطا در بازیابی اطلاعات", "error", true, 3000);
                                hideLoading();
                            });
                    }
                    else{
                        setFilteredItems(
                            approles.filter(item=>item[jsonRoleName].toUpperCase().includes(textVal.current.value.toUpperCase()))
                        );
                    }
                    break;
                default:

            }

        }
    }

    return (
        <Card className={classes.card}>
            <Grid container spacing={0}>
                {selectType !== 'users' &&
                <Grid item xs={4} md={12}>
                    <TextFieldMaterial
                        variant="outlined"
                        //fullwidth
                        //className={classes.textfieldfullWidth}
                        style={{width:"100%"}}
                        inputRef={textVal}
                        placeholder="لطفا حداقل 3 حرف وارد کنید سپس دکمه Enter را بزنید"
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyDown={e=>{
                            if (e.target.value && (e.keyCode === 13 || e.keyCode === 10))
                                handlerSearch();
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon onClick={handlerSearch}/>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/*<TextFieldMaterial*/}
                    {/*    variant="outlined"*/}
                    {/*    inputRef={textVal}*/}
                    {/*    placeholder="لطفا حداقل 3 حرف وارد کنید سپس دکمه Enter را بزنید"*/}
                    {/*    //placeholder={"شماره پرسنلی"}*/}
                    {/*    inputProps={{'aria-label': 'search'}}*/}
                    {/*    onKeyDown={e => {*/}
                    {/*        if (e.keyCode === 13 || e.keyCode === 10)*/}
                    {/*            handlerSearch();*/}
                    {/*    }}*/}
                    {/*/>*/}
                </Grid>
                }
                {selectType === 'users' &&
                <Grid item xs={4} md={4}>
                    <TextFieldMaterial
                        style={{width:"95%"}}
                        variant="outlined"
                        inputRef={textVal}
                        //placeholder="لطفا حداقل 3 حرف وارد کنید سپس دکمه Enter را بزنید"
                        placeholder={"شماره پرسنلی"}
                        inputProps={{'aria-label': 'search'}}
                        onKeyDown={e => {
                            if (e.keyCode === 13 || e.keyCode === 10)
                                handlerSearch();
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon onClick={handlerSearch}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                }
                {selectType === 'users' &&
                <Grid item xs={8} md={8}>
                    <TextFieldMaterial
                        style={{width:"100%"}}
                        variant="outlined"
                        inputRef={textValName}
                        //placeholder="لطفا حداقل 3 حرف وارد کنید سپس دکمه Enter را بزنید"
                        placeholder={"نام و نام خانوادگی"}
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyDown={e=>{
                            if(e.keyCode===13 || e.keyCode===10)
                                handlerSearch();
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon onClick={handlerSearch}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                }
                {/*<Grid item xs={1} md={1}>*/}
                {/*    <IconButton type="submit" className={classes.iconButton} aria-label="search"*/}
                {/*                onClick={handlerSearch}*/}
                {/*    >*/}
                {/*        <SearchIcon />*/}
                {/*    </IconButton>*/}
                {/*</Grid>*/}

                <Grid item xs={12} md={12}>

                {Boolean(itemUsers)+Boolean(itemGroups)+Boolean(itemApplicationRoles) > 1 &&
                <Tabs
                    value={selectType}
                    onChange={(e,newvalue)=>
                    {
                        switch(newvalue){
                            case 'users':
                                setFilteredItems(checkedUsers);
                                break;
                            case 'groups':
                                setFilteredItems(checkedGroups);
                                break;
                            case 'applicationrole':
                                //if(context.atrState.currentData.zoneId)
                                setFilteredItems(checkedApplicationRoles);
                                //else
                                //    showSnack("حوزه بایستی مشخص شده باشد.", "error", true, 3000);
                                break;
                            default:
                        }
                        console.log('selectType',newvalue,checkedUsers,filteredItems);

                        setSelectType(newvalue);

                    }}
                    //indicatorColor="primary"
                    //textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {itemUsers && <MyTab label="کاربرها" value={"users"} />}
                    {itemGroups && <MyTab label="گروه ها" value={"groups"} />}
                    {itemApplicationRoles && <MyTab label="نقش ها"  value={"applicationrole"}/>}
                </Tabs>
                }

                </Grid>
                <Grid item xs={12} md={12}>

                <Paper className={classes.paper} >
                {selectType==='users' &&
                <List dense component="div" role="list">
                    {filteredItems.map((value) => {
                        let labelId;
                        let itemText;
                        itemText = getItem(value,seperator);
                        labelId = `transfer-list-item-${itemText}-label`;

                        return (
                            <ListItem key={labelId} role="listitem" button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={selectType==='users' ? checkedUsers.indexOf(value)!== -1 : selectType==='groups' ? checkedGroups.indexOf(value)!== -1 : checkedApplicationRoles.indexOf(value)!== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={itemText} style={{textAlign:'right'}} />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
                }
                {selectType==='groups' &&
                <List dense component="div" role="list">
                    {filteredItems.map((value) => {
                        let labelId;
                        let itemText;
                        itemText = getItem(value,seperator);
                        labelId = `transfer-list-item-${itemText}-label`;

                        return (
                            <ListItem key={labelId} role="listitem" button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={selectType==='users' ? checkedUsers.indexOf(value)!== -1 : selectType==='groups' ? checkedGroups.indexOf(value)!== -1 : checkedApplicationRoles.indexOf(value)!== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={itemText} style={{textAlign:'right'}} />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
                }
                {selectType==='applicationrole' &&
                <List dense component="div" role="list">
                    {filteredItems.map((value) => {
                        let labelId;
                        let itemText;
                        itemText = getItem2(value,seperator,jsonRoleName);
                        labelId = `transfer-list-item-${itemText}-label`;

                        return (
                            <ListItem key={labelId} role="listitem" button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={selectType==='users' ? checkedUsers.indexOf(value)!== -1 : selectType==='groups' ? checkedGroups.indexOf(value)!== -1 : checkedApplicationRoles.indexOf(value)!== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={itemText} style={{direction:'ltr',display:'flex',flexDirection:'row-reverse'}} />
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
                }

            </Paper>

                </Grid>
            </Grid>
        </Card>
    );
};


export default function UsersGroupsApprolesSearch(props) {

    const classes = useStyles();
    const {value,selectType,isChipEnabled,onChangeSelectionRow,
            onDeleteUser,onDeleteGroup,onDeleteAppRoles,
            selectedRowsUsers,selectedRowsGroups,selectedRowsAppRoles,
            jsonUserName,jsonUserValue,
            jsonGroupName,jsonGroupValue,
            jsonRoleName,jsonRoleValue,
            seperator,
            label,
    } = props;

    const [openDialog, setOpenDialog] = useState(false);

    console.log('UsersGroupsApprolesSearch is rendering',
        'selectedRowsUsers',selectedRowsUsers,
        'selectedRowsGroups',selectedRowsGroups,
        'selectedRowsAppRoles',selectedRowsAppRoles,
        );

    return (
        <div>
            <Grid container spacing={0}>

                {/*<Grid item md={4} sm={6} xs={6}>*/}
                {/*    <Select*/}
                {/*        value={selectedValueToSearch}*/}
                {/*        autoWidth={true}*/}
                {/*        fullwidth*/}
                {/*        onChange={e => {*/}
                {/*            setSelectedValueToSearch(e.target.value);*/}
                {/*            setLoadGrid(!loadGrid);*/}
                {/*            if (onChangeSelectType !== undefined)*/}
                {/*                onChangeSelectType(e.target.value);*/}
                {/*        }}>*/}
                {/*        <MenuItem value={"users"}>کاربران</MenuItem>*/}
                {/*        <MenuItem value={"groups"}>گروه ها</MenuItem>*/}
                {/*        <MenuItem value={"applicationRole"}>نقش برنامه</MenuItem>*/}
                {/*    </Select>*/}
                {/*</Grid>*/}

                <Grid item md={12} sm={12} xs={12}>
                    {!isChipEnabled &&
                    <TextField
                    multiline
                    label={label}
                    adornment={true}
                    value={
                        (selectedRowsUsers && selectedRowsUsers.length>0 ? selectedRowsUsers.map(item=>!jsonUserValue && !jsonUserName ? (item.name && item.value ? item.name+seperator+item.value : item) : item[jsonUserValue]+seperator+item[jsonUserName]).join(",") : '')+'\n'+
                        (selectedRowsGroups && selectedRowsGroups.length>0 ? selectedRowsGroups.map(item=>!jsonGroupValue && !jsonGroupName ? (item.name && item.value ? item.name+seperator+item.value : item) : item[jsonGroupValue]+seperator+item[jsonGroupName]).join(",") : '')+'\n'+
                        (selectedRowsAppRoles && selectedRowsAppRoles.length>0 ? selectedRowsAppRoles.map(item=>!jsonRoleValue && !jsonRoleName ? (item.name && item.value ? item.value+seperator+item.name : item) : /*item[jsonRoleValue]+seperator+*/item[jsonRoleName]).join(seperator) : '')
                    }
                    onClick={e=>setOpenDialog(true)}
                    icon={<IconButton onClick={e=>setOpenDialog(true)}>
                        <SearchIcon/>
                    </IconButton>}
                    />
                    }
                    {
                        isChipEnabled &&
                        <Card className={classes.cardBoard} onClick={e=>setOpenDialog(true)}>
                            {
                                selectedRowsUsers && selectedRowsUsers.length > 0 && selectedRowsUsers.map(item => {
                                    return  (<Chip
                                        icon={<PersonIcon />}
                                        className={classes.chip}
                                        key={!jsonUserValue && !jsonUserName ? item : item[jsonUserValue]+seperator+item[jsonUserName]}
                                        label={!jsonUserValue && !jsonUserName ? item : item[jsonUserValue]+seperator+item[jsonUserName]}
                                        color="primary"
                                        onDelete={onDeleteUser}
                                        deleteIcon={<CloseIcon />}
                                    />)
                                })
                            }
                            {
                                selectedRowsGroups && selectedRowsGroups.length > 0 && selectedRowsGroups.map(item => {
                                    return  (<Chip
                                        icon={<GroupIcon />}
                                        key={!jsonGroupValue && !jsonGroupName ? item : item[jsonGroupValue]+seperator+item[jsonGroupName]}
                                        label={!jsonGroupValue && !jsonGroupName ? item : item[jsonGroupValue]+seperator+item[jsonGroupName]}
                                        clickable
                                        color="primary"
                                        onDelete={onDeleteGroup}
                                        deleteIcon={<CloseIcon />}
                                    />)
                                })
                            }
                            {
                                selectedRowsAppRoles && selectedRowsAppRoles.length > 0 && selectedRowsAppRoles.map(item => {
                                    return  (<Chip
                                        icon={<RoleIcon />}
                                        key={!jsonRoleValue && !jsonRoleName ? item : item[jsonRoleValue]+seperator+item[jsonRoleName]}
                                        label={!jsonRoleValue && !jsonRoleName ? item : item[jsonRoleValue]+seperator+item[jsonRoleName]}
                                        clickable
                                        color="primary"
                                        onDelete={onDeleteAppRoles}
                                        deleteIcon={<CloseIcon />}
                                    />)
                                })
                            }
                        </Card>
                    }
                </Grid>

                {openDialog &&
                <Dialog
                    title={"انتخاب"}
                    openModal={openDialog}
                    eventClose={() => {
                        setOpenDialog(false)
                    }}
                    TransitionComponent
                    actionBar={
                        <>
                            <Button variant={"contained"} color={"secondary"}
                                    onClick={() => setOpenDialog(false)}> بستن </Button>
                        </>
                    }
                >
                    <Grid container spacing={0}>

                        <Grid item md={12} sm={12} xs={12}>

                            <CustomList
                                isChipEnabled
                                selectionMode={true}
                                itemUsers={selectedRowsUsers}
                                itemGroups={selectedRowsGroups}
                                itemApplicationRoles={selectedRowsAppRoles}
                                jsonUserName={jsonUserName}
                                jsonUserValue={jsonUserValue}
                                jsonGroupName={jsonGroupName}
                                jsonGroupValue={jsonGroupValue}
                                jsonRoleName={jsonRoleName}
                                jsonRoleValue={jsonRoleValue}
                                seperator={seperator}
                                //zoneId={context.atrState.currentData.zoneId}
                                //appId={context.atrState.currentData.appId}
                                onChangeSelectionRow={
                                    (type, selectedRows) => {
                                        onChangeSelectionRow(type, selectedRows);
                                    }
                                }
                            />

                        </Grid>

                    </Grid>
                </Dialog>
                }
            </Grid>

        </div>
    );
}

UsersGroupsApprolesSearch.propTypes = {
    onChangeSelectedRows: PropTypes.func,
    //onChangeSelectType: PropTypes.func,
    //selectType: PropTypes.string
    jsonUserName: PropTypes.string,
    jsonUserValue: PropTypes.string,
    jsonGroupName: PropTypes.string,
    jsonGroupValue: PropTypes.string,
    jsonRoleName: PropTypes.string,
    jsonRoleValue: PropTypes.string,
};

