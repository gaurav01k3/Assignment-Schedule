import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { Candidates } from '../Candidate';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '36ch',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    }),
);

interface ListCardProps {
    userData: any;
    setstate: any;
}

const Scheduled: React.FC<ListCardProps> = ({ userData, setstate }) => {

    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState<any>(new Date());

    const [open, setOpen] = React.useState(false);
    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleClick = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleSchedule = () => {
        let arr = [];
        let temp: any;
        for (let i = 0; i < Candidates.length; i++) {
            if (Candidates[i] === userData) {
                Candidates[i]['Scheduled interview date'] = selectedDate;
                temp = localStorage.getItem('Candidates')!;
                temp = JSON.parse(temp);
                // arr = JSON.parse(temp)
                if (!temp) {
                    arr.push(Candidates[i])
                    localStorage.setItem('Candidates', JSON.stringify(arr));
                }
                else {
                    temp.push(Candidates[i])
                    localStorage.setItem('Candidates', JSON.stringify(temp));
                }
            }
        }
        handleClose();
        handleClick();
        setstate(((prev: any) => {
            if (prev)
                return false;
            else
                return true
        }));
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
                message="Interview Scheduled"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Card style={{ marginBottom: 10, position: 'relative' }}>
                <CardContent style={{ padding: '10px 0 10px 15px' }}>
                    <Typography variant="h5" component="h2">
                        {userData['Candidate Name']}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {userData.Qualification}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Years of Experience: {userData['Years of Experience']}
                    </Typography>
                </CardContent>
                <CardActions style={{ padding: '10px 0 10px 15px' }}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker disablePast value={selectedDate} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider>
                    <Button onClick={handleClickOpen} variant="contained" color="primary">Schedule</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    // PaperComponent={PaperComponent}
                    // aria-labelledby="draggable-dialog-title"
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Scheduling an Interview
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure want to schedule an interview?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSchedule} color="primary">
                                Schedule
                            </Button>
                        </DialogActions>
                    </Dialog>
                </CardActions>
            </Card>
        </>
    );
}

export default Scheduled