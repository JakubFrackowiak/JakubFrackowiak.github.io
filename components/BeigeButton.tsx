import { Button, Typography } from "@mui/material"

export function BeigeButton({ onClick = () => null, children }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disableElevation
      sx={{
        py: "1rem",
        px: "2rem",
        width: "fit-content",
        textTransform: "none",
        bgcolor: "#cbcaab",
        color: "grey.800",
        borderRadius: "1.5rem",
        "&:hover": {
          bgcolor: "#c4a484",
        },
      }}
    >
      <Typography variant="h5" noWrap>
        {children}
      </Typography>
    </Button>
  )
}
