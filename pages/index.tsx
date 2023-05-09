import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import Link from "next/link"

export default function index() {
  return (
    <Container
      maxWidth="md"
      sx={{
        my: "10rem",
      }}
    >
      <Stack alignItems="center" spacing={10}>
        <Paper
          variant="elevation"
          elevation={24}
          sx={{
            bgcolor: "#f7faf2",
            height: "20rem",
            width: "100%",
            p: "2rem",
            borderRadius: "1.5rem",
          }}
        >
          <Stack height="100%" justifyContent="space-around">
            <Divider orientation="horizontal" />
            <Typography variant="h6" textAlign="justify" color="grey.800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              sed, dolorem doloribus consequuntur libero nemo nam expedita
              impedit obcaecati eos perspiciatis doloremque magni iure
              reiciendis laudantium ipsum quae, voluptate distinctio!
            </Typography>
            <Divider orientation="horizontal" />
          </Stack>
        </Paper>
        <Paper
          variant="elevation"
          elevation={24}
          sx={{
            borderRadius: "1.5rem",
          }}
        >
          <Link href="/badanie">
            <Button
              variant="contained"
              disableElevation
              sx={{
                py: "1rem",
                px: "2rem",
                textTransform: "none",
                bgcolor: "#f7faf2",
                color: "grey.800",
                borderRadius: "1.5rem",
                "&:hover": {
                  bgcolor: "#cbcaab",
                },
              }}
            >
              <Typography variant="h5" whiteSpace="nowrap">
                Get Notified
              </Typography>
            </Button>
          </Link>
        </Paper>
      </Stack>
    </Container>
  )
}
