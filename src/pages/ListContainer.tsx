import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container, Typography, Button, } from '@material-ui/core';
import { Candidates } from '../Candidate';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Scheduled from '../components/Scheduled';
import UnScheduled from '../components/UnScheduled';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // flexGrow: 1,
            marginTop: 15
        },
        paper: {
            padding: theme.spacing(2),
            // textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        listContainer: {
            height: '80vh',
            overflowY: 'auto',
            // border: '1px solid gray',
            backgroundColor: theme.palette.grey[200],
            position: 'relative',
            justifyContent: 'center',

        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    }),
);

export default function ListContainer() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [state, setstate] = useState(false);

    let temp: any;
    temp = localStorage.getItem('Candidates')!;
    temp = JSON.parse(temp);


    return (
        <>
            <Container maxWidth='md' className={classes.root}>
                <Grid container spacing={5}>
                    <Grid xs={6} item>
                        <Button variant="outlined">Un-Scheduled</Button>
                    </Grid>
                    <Grid xs={6} item>
                        <Button variant="outlined">Scheduled</Button>
                    </Grid>
                </Grid >
            </Container >
            <Container maxWidth='md' className={classes.root}>
                <Grid container spacing={3}>
                    <Grid container spacing={3} item xs={6} className={classes.listContainer}>
                        <Grid item xs={12} style={{ textAlign: 'start' }}>

                            {!temp ? (Candidates.map((el: any) => {
                                if (!el['Scheduled interview date'])
                                    return <Scheduled userData={el} setstate={setstate} />
                                else
                                    return null
                            })) : (Candidates.map((el: any) => {
                                let flag = 0;
                                for (let i = 0; i < temp.length; i++) {
                                    if (el['Candidate Name'] === temp[i]['Candidate Name'])
                                        flag = 1;
                                }
                                if (!flag)
                                    return <Scheduled userData={el} setstate={setstate} />
                                else
                                    return null
                            }))
                            }



                        </Grid>
                    </Grid>
                    <Grid container spacing={3} item xs={6} className={classes.listContainer}>
                        <Grid item xs={12} style={{ textAlign: 'start' }}>
                            {!temp &&
                                <Typography variant="h5" component="h2">
                                    No interviews scheduled yet!
                                </Typography>
                            }
                            {temp?.map((el: any) => {
                                return <UnScheduled userData={el} />
                            })}

                        </Grid>
                    </Grid>
                </Grid >
            </Container >
        </>
    );
}
