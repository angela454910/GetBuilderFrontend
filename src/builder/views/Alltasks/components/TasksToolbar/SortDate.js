import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "32px",
    flexGrow: 1,
  },
  formControl: {
    minWidth: 150,
    [theme.breakpoints.down("xs")]: {
      width: 170,
    },
    "& > span": {
      fontSize: "13px",
      color: "#0006",
    },
  },
  menuTitle: {
    textAlign: "center",
    "& > small": {
      color: "#0005",

      fontSize: "0.8rem",
    },
  },
  menuItem: {
    fontSize: "0.9rem",
    color: "#0009",
  },
}));

export default function SortDate(props) {
  const classes = useStyles();
  const [dateOrder, setDateOrder] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setDateOrder(event.target.value);
    if (event.target.value === 1) return props.sortAscending();
    if (event.target.value === -1) return props.sortDescending();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <span id="select-label">Sort by Due Date</span>

        <Select
          labelId="select-label"
          id="select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={dateOrder}
          onChange={handleChange}
          color="secondary"
        >
          <MenuItem className={classes.menuItem} value={0}>
            None
          </MenuItem>
          <MenuItem className={classes.menuItem} value={1}>
            Ascending
          </MenuItem>
          <MenuItem className={classes.menuItem} value={-1}>
            Descending
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
