import { Stack, Typography } from "@mui/material"
import { AnswerCheckbox } from "./AnswerCheckbox"
import { BeigeButton } from "./BeigeButton"

export function Question() {
  const answers = [
    { label: "Zdecydowanie nie" },
    { label: "Nie" },
    { label: "Raczej nie" },
    { label: "Nie wiem" },
    { label: "Raczej tak" },
    { label: "Tak" },
    { label: "Zdecydowanie tak" },
  ]

  return (
    <Stack justifyContent="center" alignItems="center" spacing={4} my="6rem">
      <Typography variant="h6" textAlign="center">
        Czy waliles koniucha do nagich zdiec swojej matki?
      </Typography>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <AnswerCheckbox answers={answers} />
      </Stack>
      <Stack py="2rem">
        <BeigeButton>Następne zdjęcie</BeigeButton>
      </Stack>
    </Stack>
  )
}
