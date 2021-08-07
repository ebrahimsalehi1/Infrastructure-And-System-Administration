const drawerWidth = 240;
export const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: `${theme.spacing.unit * 8}px !important`,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
        '&:hover': {
            width: drawerWidth,
        },
    },
    categoryHeader: {
        paddingTop: 16,
        paddingBottom: 16,
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: 12,
    },
    subServices: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: 12,
        paddingBottom: 8,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#404854',
            color: '#4ec4f7',
        },
    },
    firebase: {
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.white,
    },
    firebaseBottom: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        fontSize: 20,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.white,
    },
    fireBaseBtn: {
        opacity: 0.6,
        color: '#eee',
        fontSize: 22
    },
    itemActionable: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        color: 'inherit',
        fontSize: 12,
        '&$textDense': {
            fontSize: 12,
        },
    },
    textDense: {},
    divider: {
        marginTop: theme.spacing.unit * 2,
    },
    subSystemSelector: {
        color: "white",
        width: 53,
        height: 53,
        display: 'block',
        position: 'absolute',
        right: 0,
        top: 0,
        textAlign: 'center',
        lineHeight: '61px',
        borderLeft: '1px solid #404854',
        '&:hover': {
            backgroundColor: '#404854',
            '& i': {
                display: 'inline-block'
            }
        },
    },
    i: {
        border: 'solid',
        borderWidth: '0 2px 2px 0',
        display: 'none',
        padding: 3
    },
    left: {
        transform: 'rotate(-45deg)',
        webkitTransform: 'rotate(-45deg)',
        marginBottom: 5
    },
    down: {
        border: 'solid',
        borderWidth: '0 2px 2px 0',
        display: 'inline-block',
        padding: 3,
        transform: 'rotate(45deg)',
        webkitTransform: 'rotate(45deg)',
        marginLeft: 15
    },
    link: {
        color: "white",
        fontSize: 12
    },
    cartableCategory: {
        padding: '16px 16px',
        color: 'white',
        borderTop: '1px solid #404854'
    },
    cartableProccessError: {
        display: "flex",
        flexDirection: "column",
        color: '#fffc00',
        fontWeight: 'bold',
        alignItems: "center",
        fontSize: 12
    },
    cartableProccessLoadingText: {
        color: '#ddd',
        fontSize: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    transition5s: {
        transition: 'all 0.5s ease'
    }
    ,
    tabsRoot: {
        minHeight: 'auto',
        margin: 'auto',
        paddingRight: '0 !important'
    },
    tabsIndicator: {
        display: 'none'
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 27,
        height: 27,
        paddingTop: 5,
        minHeight: 'auto',
        borderRadius: 4,
        backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
        color: '#fff',
        fontWeight: theme.typography.fontWeightRegular,
        //marginRight: theme.spacing.unit * 4,
        '&:hover': {
            color: '#4ec4f7',
            opacity: 1,
        },
        '&$tabSelected': {
            margin: 0,
            backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
            borderRadius: 4,
            color: '#4ec4f7',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#4ec4f7',
        },
    },
    tabSelected: {
        border: 0,
        color: '#4ec4f7'
    },
    labelContainer: {
        padding: 0
    },
    typography: {
        padding: theme.spacing.unit * 3,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    expandPanelRoot: {
        backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
        borderRadius: 4
    },
    expanDetailRoot: {
        padding: '8px 0',
        borderTop: '1px solid hsla(0, 0%, 100%, 0.1)',
        '& ul': {
            color: 'hsla(0, 0%, 100%, 0.8)'
        },
        '& >div:first-child': {
            padding: '0px !important',
            width: '100%'
        }
    },
    expanRoot: {
        minHeight: 'auto',
        height: 27,
        padding: 4,
    },
    expanRound: {
        margin: 8
    },
    expanExpanded: {
        minHeight: 'auto !important',
        margin: '0 !important'
    },
    expandPanelServiceRoot: {
        backgroundColor: 'hsla(0, 0%, 100%, 0.1)'
    },
    expanDetailServiceRoot: {
        position: 'relative',
        width: '100%',
        zIndex: 1,
        backgroundColor: "#232f3e",
        padding: '8px 0',
        borderTop: '1px solid hsla(0, 0%, 100%, 0.1)',
        '& ul': {
            color: 'hsla(0, 0%, 100%, 0.8)',
            width: '100%',
        },
        '& >div:first-child': {
            padding: '0px !important',
            width: '100%',
        }
    },
    expanServiceRoot: {
        minHeight: 'auto',
        height: 44,
        padding: '4px 0'
    },
    expanServiceRound: {},
    expandedPanelServiceRoot: {
        marginTop: 0
    },
    expanServiceExpanded: {
        minHeight: 'auto !important',
    },
    expanServiceExpandIcon: {
        right: 50,
        left: 'auto'
    },
    itemButton: {
        width: '100%',
        paddingLeft: 8,
        color: '#fff',
        '&:hover': {
            backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
            borderRadius: 0,
            color: '#4ec4f7',
            width: '100%',
            paddingLeft: 10
        }
    },
    itemButtonChild: {
        width: '100%',
        paddingLeft: 16,
        color: '#fff',
        '&:hover': {
            backgroundColor: 'hsla(0, 0%, 100%, 0.1)',
            borderRadius: 0,
            color: '#4ec4f7',
            width: '100%',
            paddingLeft: 18
        }
    },
    selectedList: {
        color: '#4ec4f7',
    },
    listText: {
        display: 'block',
        width: 178,
        overflow: 'hidden'
    },
    menu: {
        overflowX: 'auto',
        position: 'absolute',
        top: 103,
        bottom: 50,
        width: '100%',
        direction: 'rtl'
    },
    menuNav:{
        direction:'ltr'
    }
});
