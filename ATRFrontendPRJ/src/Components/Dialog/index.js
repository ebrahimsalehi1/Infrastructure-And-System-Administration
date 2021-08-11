import React,{memo} from 'react';
import Dialog from '@material-ui/core/Dialog';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        padding: '16px',
        backgroundColor:'white',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    }
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h5" >{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: "0px",
        padding:"8px",
        backgroundColor:'white'
    },
}))(MuiDialogActions);

const PaperDialogContent = withStyles(({
    root:{
        paddingTop:"8px",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "0px",
        margin: 0,
        overflow: 'hidden',
        maxHeight: '600px',
        border:'0px',
        boxShadow: 0
    }
}))(Paper);

function Transition(props) {
    return <Slide direction="left" {...props} />;
}

class IbxDialog extends React.PureComponent {

    render() {
        const {classes, eventClose, maxWidth,
            openModal,title,children,fullScreen,
            TransitionComponent,actionBar,onKeyDown,useOwnDialog,...others} = this.props;

        return (
            <div id={"IbxDialogIrisa"} className={".IbxDialog.style"}>
                {openModal &&
                <Dialog
                    onClose={eventClose}
                    onKeyDown={onKeyDown}
                    data-testId
                    aria-labelledby="customized-dialog-title"
                    open={openModal}
                    fullScreen={fullScreen}
                    maxWidth={maxWidth}
                    TransitionComponent={TransitionComponent ? Transition : null}
                    {...others}
                >

                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        {title}
                    </DialogTitle>

                    <MuiDialogContent>

                        <PaperDialogContent>

                            {children}

                        </PaperDialogContent>

                    </MuiDialogContent>

                    <DialogActions>
                        {actionBar}
                    </DialogActions>

                </Dialog>
                }
            </div>
        );
    }
}

IbxDialog.propTypes = {
    //classes: PropTypes.object.isRequired,
    eventClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    fullScreen:PropTypes.bool,
    TransitionComponent:PropTypes.bool,
    actionBar:PropTypes.node
};

export default IbxDialog;

