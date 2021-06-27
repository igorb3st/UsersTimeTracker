import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  info: {
    paddingTop: "100px",
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Users = () => {
  const theme = useTheme();
  const { formControl, info } = useStyles(theme);
  const [ personName, setPersonName ] = useState([]);
  const [ personTime, setPersonTime ] = useState();
  const [ personId, setPersonId ] = useState();
  const [ users, setUsers ] = useState([]);

  const msToTime = (duration) => {
    const seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    return `${hours}hrs :${minutes}min :${seconds}sec `;
  };

  const handleChange = (event) => {
    event.preventDefault();
    let updateData = [];
    const { value } = event.target;
    const getUserIndexbyName = users.findIndex((obj) => obj.name === value);
    setPersonId(users[ getUserIndexbyName ].id);
    setPersonName(value);
    const currentTime = new Date().getTime();
    const prevStorage = JSON.parse(localStorage.getItem("user")) || [];
    const currentData = { name: value, time: currentTime };
    const objIndex = prevStorage.findIndex((obj) => obj.name === value);
    const rest = prevStorage.filter((obj) => obj.name !== value);

    if (objIndex !== -1) {
      updateData = [
        ...rest,
        {
          ...prevStorage[ objIndex ],
          nextTime: currentTime,
        },
      ];
      if (prevStorage[ objIndex ]?.nextTime) {
        const workTime = Math.abs(prevStorage[ objIndex ].time - currentTime);

        setPersonTime(msToTime(workTime));
      } else {
        setPersonTime("");
      }
    } else {
      updateData = [ ...prevStorage, currentData ];
    }

    localStorage.setItem("user", JSON.stringify(value ? updateData : ""));
  };

  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/users`;
    axios(url)
      .then((res) => res.data)
      .then((data) => setUsers(data));
  }, []);

  return (
    <FormControl className={ formControl }>
      <InputLabel id="demo-simple-select-helper-label">USERS</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={ personName }
        onChange={ handleChange }
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        { users.map((user) => (
          <MenuItem
            onChange={ handleChange }
            key={ user.id }
            value={ user.name }
            style={ getStyles(user.name, personName, theme) }
          >
            { user.name }
          </MenuItem>
        )) }
      </Select>
      <FormHelperText>get data for the Some User</FormHelperText>
      <Typography className={ info } gutterBottom>
        Welcome : { personName }
      </Typography>
      <Typography gutterBottom>Your Work Time: { personTime }</Typography>
      <Button variant="outlined" color="primary" size="medium">
        <Link to={ `/${personId}` }>More Details</Link>
      </Button>
    </FormControl>
  );
};

export default Users;
