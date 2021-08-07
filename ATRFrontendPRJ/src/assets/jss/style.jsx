import {fade} from '@material-ui/core/styles/colorManipulator';
import {grey} from '@material-ui/core/colors';

const drawerWidth = 240;
const appBarHeight = 64;

export const styles = theme => ({
    backWarning: {
        backgroundColor: "#ffba1d"
    },
    backSuccess: {
        backgroundColor: "#7fd41b",
        color: "#fff"
    },
    backInfo: {
        backgroundColor: "#009ce6"
    },
    backError: {
        backgroundColor: "#ee453e"
    },
    textWarning: {
        color: "#ffba1d"
    },
    textSuccess: {
        color: "#7fd41b",
    },
    textInfo: {
        color: "#009ce6"
    },
    textError: {
        color: "#ee453e"
    },
    ltr: {
        direction: 'ltr'
    },
    root: {
        display: 'flex',
    },
    Dashboard: {
        Content: {
            marginTop: '48px'
        }
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit + 4,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: drawerWidth,
        marginTop: 48,
        PaginationPagination: {

            backgroundColor: 'red',

        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: theme.spacing.unit * 8,
    },
    searchBox: {
        color: "#ffffff"
    },

    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            marginLeft: "80%",
            display: 'flex',
        },
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            marginLeft: "75%"
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }, itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
    },
    itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "right",
        marginRight: "10px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(255, 255, 255, 0.8)"
    },
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 5,
        },
    },
    personIdInput: {
        width: "75%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            backgroundColor: theme.palette.error,
        },
    },
    panelSummary: {
        color: '#646464 !important',
        padding: '15px 15px',
        backgroundColor: 'inherit',
    },
    panelGrid: {
        padding: '5px 7px',
    },
    main: {
        '@media screen and (min-width: 960px)': {
            width: 800
        },
        '@media screen and (max-width: 460px)': {
            width: '100%'
        },
        display: 'block', // Fix IE 11 issue.
        // color:'inherit',
        position: 'absolute',
        // marginLeft: theme.spacing.unit * 3,
        // marginRight: theme.spacing.unit * 3,
        //[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        //width: 400,
        //marginLeft: 'auto',
        //marginRight: 'auto',
        //},
        transform: 'translate(-50%,-50%)',
        top: '50%',
        left: '50%'

    },
    signInBackground: {
        display: 'flex',
        minHeight: '100vh',
        //background: `url(${backImage})`,
        backgroundColor: "#fafafa",
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    backTransparent: {
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',

    },
    paper: {
        backgroundColor: `${theme.palette.common.white} 99`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        color: '#004365'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 3,
        "& input[type='text'],input[type='password'] ": {
            direction: 'ltr',
            textAlign: 'right'
        }
    },
    submit: {
        border: '1px solid #7fd41b',
        transition: 'background 0s',
        backgroundColor: "#f1fbe8",
        color: "#7fd41b",
        '&:hover': {
            backgroundSize: '100%',
            transition: 'background 0.8s',
            backgroundColor: "#f1fbe8",
            boxShadow: "0px 0px 5px #7fd41b"
        },
    },
    errorButtonOutLine: {
        padding: "5px 8px",
        margin: 0,
        border: '1px solid #ee453e',
        transition: 'background 0s',
        color: "#ee453e",
        '&:hover': {
            backgroundSize: '100%',
            transition: 'background 0.8s',
            backgroundColor: "#f9dad9",
        },
    },
    warningButtonContained: {
        padding: '4px 12px',
        backgroundColor: "#f9f0dc",
        border: '1px solid #ffba1d',
        transition: 'background 0s',
        color: "#ffba1d",
        '&:hover': {
            backgroundSize: '100%',
            transition: 'background 0.8s',
            backgroundColor: "#ffba1d",
            color: "#fff"
        },
    },
    signInHeader: {
        backgroundColor: `#10234acc`,
        color: theme.palette.common.white,
        margin: `${theme.spacing.unit * 8}px 0 0`,
        padding: (theme.spacing.unit) + 2,
        display: 'inline-flex',
        width: `calc(100%)`,
        borderRadius: '8px 8px 0 0',
    },
    signInTitle: {
        //marginLeft: `calc(${(theme.spacing.unit * 5) - 2}%)`,
    },
    signInField: {
        color: 'inherit'
    },
    darkDivider: {
        backgroundColor: theme.palette.primary.main
    },

    // card page

    card: {
        // backgroundColor: theme.palette.common.white,
        margin: 5
    },

    cardPanel: {
        backgroundColor: "inherit",
        marginBottom: theme.spacing.unit * 2,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    actions: {
        float: 'left',
    },
    chip: {
        marginTop: 0,
    },
    linkIconStyle: {
        marginLeft: '0px',
        marginRight: '8px',
        color: grey[400],
        '&:hover': {
            color: grey[600]
        },
    },
    linkHelpStyle: {
        color: "#ee453e"
    },
    pagingPanel: {
        color: 'black',
        justifyContent: 'center',
        marginTop: '8px',
        '& button': {
            minWidth: 32,
            borderRadius: 50,
            height: 32
        }
    },
    PageSizeSelector: {
        color: 'inherit'
    },
    tableStriped: {
        '& tbody tr:nth-of-type(odd)': {
            backgroundColor: fade('#f7f7f7', 0.15),
        },
    }, handleDrawer: {
        color: 'white',
    },
    fullScreen: {
        background: '#ffffff',
        width: '100%',
        height: '100%',
        zIndex: 2000,
        top: 0,
        left: 0,
        position: 'fixed',
    }, fabIcon: {
        marginDense: theme.spacing.unit,
    },
    dialogToolbar: {
        backgroundColor: theme.palette.primary.main
    },
    dialogAction: {
        backgroundColor: theme.palette.common.main
    }, closeButton: {
        position: 'absolute',
        left: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },

    outComeBarDisable: {
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #cccccc",
        pointerEvents: 'none',
        opacity: 0.4,
    },
    outComeBar: {},
    page: {
        margin: "5px 0",
        padding: 10,
        width: '98%'
    },
    outComeButtons: {
        margin: 'auto'
    }, outCome: {
        margin: '0 5px',
        fontSize: 11,
    }, outComeAccept: {
        backgroundColor: "#f1fbe8",
        color: "#7fd41b",
        border: "1px solid #7fd41b",
        '&:hover': {
            backgroundColor: "#f1fbe8",
            boxShadow: "0 0 8px #7fd41b"
        },
    }, outComeReject: {
        color: "#ffba1d",
        border: "1px solid #ffba1d",
        backgroundColor: "#f9f0dc",
        '&:hover': {
            backgroundColor: "#f9f0dc",
            boxShadow: "0 0 8px #ffba1d"
        },
    }, divider: {
        backgroundColor: "#ffffff",
        width: "100%",
        margin: "15px 0 5px"
    }, hidden: {
        display: "none"
    },
    cssLabel: {
        '&$cssFocused': {
            color: "#009ce6",
        }, '&$cssFocused $notchedOutline': {
            borderColor: "#009ce6",
        },
        '& $notchedOutline legend': {
            //textAlign: 'left',
        },

    },
    cssFocused: {},
    cssAnimated: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: "#009ce6",
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: "#009ce6",
        },
        '&$cssFocused $notchedOutline legend': {},
        '& $notchedOutline legend': {},
    },
    notchedOutline: {
        borderColor: "#009ce6",
    },
    margin: {
        margin: theme.spacing.unit,
    },
    white: {
        color: "#ffffff"
    },
    datePickerFieldSet: {
        border: '1px solid #009ce6',
        borderRadius: 4,
        margin: 0,
        color: '#009ce6',
        backgroundColor: '#f2fafd',
        boxShadow: '0 0 8px #009ce680',
        padding: `0px ${theme.spacing.unit}px`
    },
    formControl: {
        margin: '12px 16px 8px', //comment by Mohsen
        minWidth: '85%',
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing.unit * 10,
        left: theme.spacing.unit * 3,
    },
    speedDialAction: {
        backgroundColor: theme.palette.secondary.main
    },
    loginMenu: {
        color: grey[800]
    }, cover: {
        width: 151,
    }, actionBarIcon: {
        padding: 2,
    },
    defaultCardHeader: {
        padding: '8px 8px'
    },

    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    slideShowRoot: {
        maxWidth: '100%',
        marginTop: `${theme.spacing.unit * 2}px`,
        flexGrow: 1,
    },
    slideHeader: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    slideImg: {
        height: 255,
        display: 'block',
        overflow: 'hidden',
        width: '100%',
    },
    actionBarHelp: {
        color: '#009ce6'
    },
    modalAppBar: {
        right: 0
    },
    sticky: {
        position: 'fixed',
        //position: '-webkit-sticky',
        width: theme.spacing.unit * 5,
        height: theme.spacing.unit * 5,
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center',
        boxShadow: '0 0 6px #000',
        color: '#fff',
        left: 0,
        borderRadius: '0 5px 5px 0',
        '& $span': {
            display: "none"
        },
        '&:hover': {
            textDecoration: "none",
            width: theme.spacing.unit * 20,
            '& $span': {
                display: "contents"
            }
        },
    },
    loginForm: {
        backgroundColor: 'white',
        border: '1px solid #e6e6e6',
        borderRadius: 8,
        padding: '20px 30px',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
        '&:hover': {
            boxShadow: 'none'
        },
    },
    margin2: {
        margin: '12px 16px 8px',
        //width: '85%'
    },
    marginFullwidth: {
        margin: '12px 16px 8px',
    },
    forgetLink: {
        marginTop: 10,
        color: '#999',
        fontSize: '0.70rem'
    },
    helpLink: {
        color: '#bababa',
        position: 'absolute',
        top: 20,
        right: 20,
        '&:hover': {
            webkitAnimationName: 'swing',
            animationName: 'swing'
        }
    },
    logoSignIn: {
        color: '#c7c7c7',
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    slideImage: {
        borderRadius: 8
    },
    nemayeText: {
        fontSize: 10
    },
    taskListSearch: {
        backgroundColor: "#fcfcfc",
        padding: 16,
        margin: '10px 0px',
        borderTop: '1px solid #ececec',
        borderBottom: '1px solid #ececec'
    },
    uploaderMargin: {margin: 16},
    lovRoot: {
        backgroundColor: "#f2fafd"
    },
    //processViewer
    tabPaper: {
        backgroundColor: "#fff",
        flexGrow: 1,
        margin: '-10px -10px 0 -10px',
        boxShadow: '0'
    },
    tabsRoot: {
        minHeight: 35
    },
    tabsIndicator: {
        backgroundColor: "#009ce6",
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 110,
        fontSize: '0.71rem',
        fontWeight: 'bold',
        padding: 0,
        backgroundColor: '#fff',
        color: "#9c9c9c",
        '&:hover': {
            color: "#009ce6",
            backgroundColor: "#fff",
            opacity: 1,
        },
        '&:focus': {
            color: "#009ce6",
        },
    },
    tabSelected: {
        color: `#009ce6`
    },
    tabIcon: {
        margin: '0 8px -4px'
    },
    cmnActionHeader: {
        marginTop: 4
    },
    cmnHeaderContent: {
        marginLeft: 4
    },
    cmnContent: {
        margin: 4
    },
    cmnAvatar: {
        backgroundColor: "#ff5722",
        marginTop: 8
    },
    actionSection: {
        right: 8,
        position: "absolute",

    },
    formButtonSection: {
        textAlign: 'right',
        padding: 8,
        backgroundColor: "#fafafa"
    },
    titleSection:{
        fontSize:11,
        color:"#9c9c9c",
        fontWeight:'bold'
    }
});