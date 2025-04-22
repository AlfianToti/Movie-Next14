import { Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";
export default function MenuComponent({
  data,
  height = 48,
  width = "20ch",
  handleClick,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="error">
        Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: height * 4.5,
              width: width,
            },
          },
        }}
      >
        {data.map((item) => (
          <MenuItem key={item.id} selected={item.id} onClick={handleClick}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
