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

export function AnswerCheckbox({ questionIndex, answer }) {
  const { thirdTaskIndex, thirdTaskAnswers, setThirdTaskAnswers } =
    useSurveyStore((state) => ({
      thirdTaskIndex: state.thirdTaskIndex,
      thirdTaskAnswers: state.thirdTaskAnswers,
      setThirdTaskAnswers: state.setThirdTaskAnswers,
    }))

  const handleChange = (event) => {
    setThirdTaskAnswers([thirdTaskIndex, questionIndex], event.target.value)
  }

  return (
    <FormControlLabel
      sx={{
        position: "relative",
      }}
      checked={
        thirdTaskAnswers.length > 0 && thirdTaskAnswers[thirdTaskIndex] != null
          ? thirdTaskAnswers[thirdTaskIndex][questionIndex] == answer.label
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
