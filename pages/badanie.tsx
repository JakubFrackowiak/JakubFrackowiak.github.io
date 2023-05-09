import AnimalPairs from "components/AnimalPairs"
import { Container, Stack } from "@mui/material"

export default function Badanie() {
  return (
    <Container>
      <Stack height="80vh" alignItems="center" justifyContent="flex-end">
        <AnimalPairs />
      </Stack>
    </Container>
  )
}
