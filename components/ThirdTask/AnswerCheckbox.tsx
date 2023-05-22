import CircleIcon from "@mui/icons-material/Circle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect } from "react"
import { useSurveyStore } from "storage/survey-store"

export function AnswerCheckbox({
  setImageAnswers,
  questionIndex,
  answer,
  imageAnswers,
}) {
  const { thirdTaskIndex } = useSurveyStore((state) => ({
    thirdTaskIndex: state.thirdTaskIndex,
  }))

  useEffect(() => {
    setImageAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[thirdTaskIndex] = Array(1).fill(null)
      return newAnswers
    })
  }, [thirdTaskIndex])

  const handleChange = (event) => {
    setImageAnswers((prev) => {
      const newAnswers = [...prev]
      newAnswers[thirdTaskIndex][questionIndex] = answer.label
      return newAnswers
    })
  }
  return (
    <FormControlLabel
      sx={{
        position: "relative",
      }}
      checked={
        imageAnswers.length > 0 && imageAnswers[thirdTaskIndex] != null
          ? imageAnswers[thirdTaskIndex][questionIndex] == answer.label
          : false
      }
      onChange={handleChange}
      key={answer.label}
      value={answer.label}
      control={
        <Checkbox
          checkedIcon={
            <Stack
              width="fit-content"
              height="fit-content"
              bgcolor="#fffff0"
              alignItems="center"
              justifyContent="center"
            >
              <CircleIcon
                sx={{
                  color: grey[700],
                }}
              />
            </Stack>
          }
          icon={
            <Stack
              width="fit-content"
              height="fit-content"
              bgcolor="#fffff0"
              justifyContent="center"
            >
              <RadioButtonUncheckedIcon />
            </Stack>
          }
        />
      }
      label={
        <Typography noWrap position="absolute" bottom="-1.5rem">
          {answer.label}
        </Typography>
      }
      labelPlacement="bottom"
    />
  )
}
