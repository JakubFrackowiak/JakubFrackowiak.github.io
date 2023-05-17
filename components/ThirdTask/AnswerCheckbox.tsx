import CircleIcon from "@mui/icons-material/Circle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import { Checkbox, FormControlLabel, Typography } from "@mui/material"
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
      newAnswers[thirdTaskIndex] = Array(4).fill(null)
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
            <CircleIcon
              sx={{
                color: grey[700],
              }}
            />
          }
          icon={<RadioButtonUncheckedIcon />}
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
