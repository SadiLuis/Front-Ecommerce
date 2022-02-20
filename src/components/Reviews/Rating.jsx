import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    
    width: 200,
    display: 'flex',
    alignItems: 'center',
    bottom: '15%',
    right: '0',
    margin: '0',
    padding: '10px',
    backgroundColor: '#f5f5f5',
  },
  

});

function Range() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        } }
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        } } />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
      </div>     

  );
}

export default Range;