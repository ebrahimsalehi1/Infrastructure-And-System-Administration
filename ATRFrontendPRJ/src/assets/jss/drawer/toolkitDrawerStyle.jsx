
const drawerWidth = 240;

export const styles = theme => ({

    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:'#eeeeee'
    },
    drawerHeader: {
        display: 'flex',
        minHeight:48,
        color:"#9c9c9c",
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        "& span":{
            marginRight:"50%"
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    tab: {
        backgroundColor: 'inherit'
    },
    chatLoginSection:{
        position:"relative",
        marginTop:"80%",
        textAlign:"center"
    }
});
