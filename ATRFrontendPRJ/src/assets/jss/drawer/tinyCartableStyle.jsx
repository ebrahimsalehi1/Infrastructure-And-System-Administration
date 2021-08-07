import {grey, lime} from '@material-ui/core/colors'

export const styles = theme => ({
    tabsRoot: {
        borderTop: `1px solid ${lime[300]}`,
        minWidth: 112,
        minHeight: 35,
    },
    flexContainer: {
        backgroundColor: grey[500],
    },
    tabsIndicator: {
        backgroundColor: grey[600],
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: '33.33%',
        minHeight: 35,
        padding: 0,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover': {
            color: grey[800],
            opacity: 1,
        },
        '&$tabSelected': {
            color: grey[800],
        },
        '&:focus': {
            color: grey[800],
        },
    },
    tabSelected: {
        backgroundColor: '#00acc1',
        color: `white !important`
    },
    typography: {
        color: theme.palette.common.white
    },
    tinyCartable: {
        bottom: 0,
        position: 'fixed',
        width: '17%'
    }
});
