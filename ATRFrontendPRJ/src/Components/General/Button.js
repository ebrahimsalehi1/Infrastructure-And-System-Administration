import React from 'react';
import {styled} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)(props=>({
    margin:8,
    paddingLeft: 12,
    paddingRight: 12,
    height:32,
    minWidth:64,
    alignItems: 'center',
    textAlign: 'center',
    color: props.color=="primary" ? '#fff' : props.color=='secondary' ? '#263238':'',
    //padding: '8px 30px',
    backgroundColor: props.color=="primary" ? '#3f51b5' : props.color=='secondary' ? '#f5f5f5':'',
    '&:hover': {
        backgroundColor: props.color=="primary" ? '#3f51b5': props.color=='secondary' ? '#d5d5d5':'',
        color: props.color=="primary" ? '#fff' : props.color=='secondary' ? '#000000':'',
        transition: 'all 0.5s ease'
    },
}));

export default function StyledButton(props){
    return (<MyButton {...props}>{props.children}</MyButton>)
}
