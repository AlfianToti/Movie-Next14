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
        backgroundColor: bgColor,
        borderRadius: "23px",
        "&:hover": {
          backgroundColor: hover,
        },
      }}
    >
      {icon && icon}
      {text}
    </Button>
  );
}
