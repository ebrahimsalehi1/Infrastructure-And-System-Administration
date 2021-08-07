import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Button from "./Button";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog(props){

    const {openDialog,dialogTitle,dialogContent,setOpen,onExecute} = props;
    return (
        <Dialog open={true} onClose={setOpen} aria-labelledby="form-dialog-title"
                TransitionComponent={Transition}
                maxWidth={"sm"}
                fullWidth={true}
                style={{padding: "10px"}}
        >

            <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <Grid md={12} xs={12} container>
                    <Grid md={12} xs={12} item>
                        <Typography style={{paddingLeft:16,paddingRight:16}}>{dialogContent}</Typography>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions style={{padding: '10px'}}>
                <Button onClick={onExecute}
                        color="primary"
                        >
                    تائید
                </Button>
                <Button onClick={setOpen} color="secondary" variant="contained"
                        color="secondary"
                        >
                    انصراف
                </Button>

            </DialogActions>
        </Dialog>
    )
}
