import React from 'react';
import TextFieldMaterial from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import {createApi, readApi} from "@irisa/components-material-v.4/lib/config/FetchSign";
import {API_BASE_URL} from "../../../Utils/Config/constants";
import {hideLoading, showLoading} from "@irisa/components-material-v.4/lib/redux/actions/openActions";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@irisa/components-material-v.4/lib/TextField';
import {CreateApi} from "../../../Utils/Config/CallServiceRouter";

const DynamicList = ({data})=>{
    return (
        <>
            <datalist id="persons" >
                {
                    data.map((item,index)=> {
                        return (
                            <option key={item} value={item} />
                        )
                    })
                }
            </datalist>
        </>
    )
}

export default function PersonAutocomplete(props){

    const {others,seperatorCharacter,returnFunction,value} = props;

    const url =`${API_BASE_URL}/OID/api/v1.0/users/search?&size=1000&page=0&filter=`;
    const [val,setVal] = React.useState(value ? value.join(seperatorCharacter):[]);
    const [list,setList] = React.useState([]);

    const numberRender = React.useRef(0);

    if(numberRender.current==0)
        CreateApi({
            url:url,
            data:{
                employeeNumber:"9",
                displayName:"",
                categories:"4,6"
            }
        })
        .then(result=>{
            if(result.status==200){
                setList(result.data.content.map(obj=>obj.employeeNumber+","+obj.displayname));
            }

            hideLoading();
        });


    numberRender.current++;

    return (
            <div>
                <TextField {...others} value={val}  inputProps={{ "list": "persons", "id": "myPerson","name":"myPerson" }}
                       onChange={async e=>
                {
                    setVal(e.target.value);
                    if(e.target.value.length<=2)
                        return;
                    showLoading(null,null);

                    returnFunction(e.target.value.toString().split(seperatorCharacter)[0],e.target.value.toString().split(seperatorCharacter)[1]);
                    await createApi({
                        url:url,
                        data:{
                            employeeNumber:e.target.value,
                            displayName:"",
                            categories:"4,6"
                        }
                    })
                        .then(result=>{
                            if(result.status==200){
                                setList(result.data.content.map(obj=>obj.employeeNumber+","+obj.displayname));
                            }

                            hideLoading();
                        });
                }}

                />

            {val.length>0 &&
            <DynamicList data={list}/>
            }

            </div>

    )
}
