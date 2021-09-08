import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardContent } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';

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
        margin: {
            margin: theme.spacing(1),
            textTransform: 'capitalize'
        },
    }),
);

interface ListCardProps {
    userData: any;
}

const UnScheduled: React.FC<ListCardProps> = ({ userData }) => {

    const classes = useStyles();
    const [selectedDate, handleDateChange] = useState<any>(new Date());

    return (
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
                <Button variant="outlined" color="primary" size="medium" className={classes.margin}>
                    Interview Scheduled at : {moment(userData['Scheduled interview date']).format('YYYY - MM - DD HH:mm:ss')}
                </Button>
            </CardContent>
        </Card>
    );
}

export default UnScheduled