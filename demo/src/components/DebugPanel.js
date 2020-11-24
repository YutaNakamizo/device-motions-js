import React from 'react';
import {
  makeStyles,
} from '@material-ui/core/styles';
import {
  Box,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

export const DebugPanel = ({
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Paper
      className={classes.root}
      {...props}
    >
      <Box
        m={2}
      >
        {children}
      </Box>
    </Paper>
  );
};

