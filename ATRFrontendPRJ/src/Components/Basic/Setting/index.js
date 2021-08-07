import React from 'react';
import {LOCAL_STORAGE_BFF} from "../../../Utils/Config/constants";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from "@material-ui/core/Switch/Switch";

export default function Setting(props) {

    const [flg,setFlg] = React.useState(localStorage.getItem('LOCAL_STORAGE_BFF')=='1');

    return (
        <Grid container >
            <Grid item md={12} xs={12}>
                <FormControlLabel style={{margin:2,padding:2}}
                                  control={
                                      <Switch
                                          checked={flg}
                                          onChange={(e)=>{
                                              localStorage.setItem('LOCAL_STORAGE_BFF',localStorage.getItem('LOCAL_STORAGE_BFF')=='0' ? '1':'0');
                                              setFlg(e.target.checked);
                                              //setFlg(!flg);
                                          }}
                                          name="checkedB"
                                          color="primary"
                                      />
                                  }
                                  label={'وضعیت کشینگ'}
                />
            </Grid>
            {'localstorage='+localStorage.getItem('LOCAL_STORAGE_BFF')}
            <button onClick={()=>{
                localStorage.setItem('LOCAL_STORAGE_BFF',localStorage.getItem('LOCAL_STORAGE_BFF')=='0' ? '1':'0');
                setFlg(!flg);
            }}>Change Local Storage</button>
        </Grid>
    );
}

