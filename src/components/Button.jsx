import { Button } from "@mui/material";

export default function ButtonComponent({
  data,
  text,
  padding,
  icon,
  transform,
  hover = "red",
  handleClick,
  isActive,
  bgColorActive = "red",
  bgColor = "#292929",
  fontSize = "12px",
  minWidth,
}) {
  return (
    <Button
      variant="contained"
      key={data}
      size="small"
      onClick={() => {
        handleClick(data);
      }}
      sx={{
        minWidth: minWidth,
        fontSize: fontSize,
        textTransform: transform,
        paddingY: "8px",
        paddingX: padding,
        backgroundColor: isActive ? bgColorActive : bgColor,
        borderRadius: "23px",
        "&:hover": {
          backgroundColor: isActive ? bgColor : hover,
        },
      }}
    >
      {icon && icon}
      {text}
    </Button>
  );
}
