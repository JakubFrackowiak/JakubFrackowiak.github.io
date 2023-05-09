import AnimalPairs from "components/AnimalPairs"
import { Container, Stack } from "@mui/material"

export default function Badanie() {
  return (
    <Container>
      <Stack height="100vh" justifyContent="center" alignItems="center">
        <AnimalPairs />
      </Stack>
    </Container>
  )
}
