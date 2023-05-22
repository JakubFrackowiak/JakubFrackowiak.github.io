import { Container, Divider, Stack, Typography } from "@mui/material"
import { BeigePaper } from "components/common/BeigePaper"

export function ThirdTaskQuestion() {
  return (
    <Container
      maxWidth="md"
      sx={{
        my: "10rem",
      }}
    >
      <Stack alignItems="center" spacing={10}>
        <BeigePaper height="20rem">
          <Stack height="100%" justifyContent="space-around">
            <Divider orientation="horizontal" />
            <Typography variant="h6" textAlign="justify" color="grey.800">
              To ostatnia część tego zadania. Za chwilę zobaczysz kolejną serię
              zdjęć przedstawiających zwierzęta. Przy każdym zdjęciu poprosimy
              Cię o rozpoznanie konkretnego osobnika i zapytamy, czy
              widziałaś/łeś już to konkretne zwierzę. Uwaga! Zwierzęta mogą być
              przedstawione w tych samych lub innych ujęciach niż miało to
              miejsce w poprzedniej serii zdjęć.
            </Typography>
            <Divider orientation="horizontal" />
          </Stack>
        </BeigePaper>
      </Stack>
    </Container>
  )
}
