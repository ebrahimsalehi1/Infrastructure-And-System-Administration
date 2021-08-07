import React from 'react';
import Button from "@material-ui/core/Button";
import {withStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classnames from 'classnames';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root:{
        textAlign:'center'
    },
    card: {
        //maxWidth: 400,
        margin:8
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            hasError: false,
            error: null,
            errorInfo:null,
            expanded: false,
            showRowByRow: false,
            errorDate: new Date()
        };
    }

    static getDerivedStateFromError(error){
        return {hasError:true};
    }

    componentDidCatch(error, errorInfo) {
        //debugger;
        console.log('componentDidCatch',{error,errorInfo});
        this.setState({...this.state,error:String(error),errorInfo:errorInfo,errorDate:new Date()});
    }

    render(){
        console.log('ErrorBoundary is rendering ....',this.props);

        const {classes} = this.props;

        if(this.state.hasError)
        return(<Grid container className={classes.root}>
        <Grid item xs={12} md={12}>
            <Card className={classes.card}>
                <CardHeader
                    // avatar={
                    //     <Avatar aria-label="Recipe" className={classes.avatar}>
                    //         R
                    //     </Avatar>
                    // }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="مدیریت خطاها"
                    subheader={`تاریخ و ساعت :  ${this.state.errorDate.toLocaleString('fa-IR')} `}
                />
                {/*<CardMedia*/}
                {/*    className={classes.media}*/}
                {/*    image="/static/images/cards/paella.jpg"*/}
                {/*    title="Paella dish"*/}
                {/*/>*/}
                <CardContent>
                    <Typography variant={"h3"} component="h3">
                         یک خطای سیستمی بوجود آمده است. لطفا با مسئول سیستم تماس حاصل فرمایید
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    {/*<IconButton aria-label="Add to favorites">*/}
                    {/*    <FavoriteIcon />*/}
                    {/*</IconButton>*/}
                    {/*<IconButton aria-label="Share">*/}
                    {/*    <ShareIcon />*/}
                    {/*</IconButton>*/}
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={()=>{this.setState({...this.state,expanded:!this.state.expanded})}}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {this.state.error}
                        <hr/>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            style={{marginTop:8}}
                            onClick={()=>{
                                this.setState({...this.state,showRowByRow:!this.state.showRowByRow});
                            }}>{this.state.showRowByRow ? 'نمایش کلی' : 'نمایش سطر به سطر'}</Button>
                        <br/>

                        {this.state.showRowByRow ? this.state.errorInfo?.componentStack.split('\n')
                            .map(item=><div>{item}</div>)
                            :
                            this.state.errorInfo?.componentStack
                        }
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
        <Grid item xs={12} md={12}>
            <Button
                variant={"contained"}
                color={"secondary"}
                onClick={()=>{this.setState({...this.state,hasError:false,error:null,errorInfo:null,expanded:false})}}>بازگشت به صفحه اصلی</Button>
        </Grid>
        </Grid>

    );

        return this.props.children;
    }

}

export default withStyles(styles)(ErrorBoundary);
