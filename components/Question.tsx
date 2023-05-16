import { Stack, Typography } from "@mui/material"
import { AnswerCheckbox } from "./AnswerCheckbox"

export function Question({
  questionIndex,
  setImageAnswers,
  imageAnswers,
  question,
}) {
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
        {question}
      </Typography>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Stack direction="row" width="100%" justifyContent="space-between">
          {answers.map((answer) => (
            <AnswerCheckbox
              imageAnswers={imageAnswers}
              questionIndex={questionIndex}
              answer={answer}
              setImageAnswers={setImageAnswers}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
