import CircleIcon from "@mui/icons-material/Circle"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useState } from "react"

export function AnswerCheckbox({ answers: answers }) {
  const [selectedValue, setSelectedValue] = useState("")

  const handleChange = (event) => {
    setSelectedValue(event.target.value)
  }

  return (
    <Stack direction="row" width="100%" justifyContent="space-between">
      {answers.map((answer) => (
        <FormControlLabel
          sx={{
            position: "relative",
          }}
          checked={selectedValue === answer.label}
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
      ))}
    </Stack>
  )
}
