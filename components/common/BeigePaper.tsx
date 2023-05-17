import { Paper } from "@mui/material"

export function BeigePaper({
  children,
  height = "100%",
  width = "100%",
  p = "2rem",
  borderRadius = "0.5rem",
}) {
  return (
    <Paper
      variant="elevation"
      elevation={12}
      sx={{
        bgcolor: "#f7faf2",
        height: height,
        maxHeight: "60vh",
        width: width,
        p: p,
        borderRadius: borderRadius,
      }}
    >
      {children}
    </Paper>
  )
}
