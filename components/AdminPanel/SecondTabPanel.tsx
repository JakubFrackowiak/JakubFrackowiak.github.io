import { OutlinedInput, Stack } from "@mui/material"
import { SecondTaskSettings } from "./index"
import { BeigeButton } from "components/common/BeigeButton"

interface TabPanelProps {
  index: number
  value: number
  secondTaskSettings: SecondTaskSettings
}

export function SecondTabPanel({
  value,
  index,
  secondTaskSettings,
}: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Stack>
          <OutlinedInput type="number"></OutlinedInput>
          <OutlinedInput></OutlinedInput>
          <BeigeButton>Zapisz</BeigeButton>
          <BeigeButton>Przywróć domyślne</BeigeButton>
        </Stack>
      )}
    </div>
  )
}
