import React from 'react';
import {withRouter} from "react-router-dom";

function Basic1(props) {

    console.log('Basic1',props.history.location.state);
    return (
        <div>
            <button style={
                {
                    borderRadius:25,
                    border:'1px red solid',
                    backgroundColor:'green',width:200,height:100,
                    color:'white',
                    fontSize:18
                }
            }
            onClick={()=>alert('click occurred !!!')}
            >
                Form Edit, Add
            </button>
        </div>
    );
}

export default withRouter(Basic1);
