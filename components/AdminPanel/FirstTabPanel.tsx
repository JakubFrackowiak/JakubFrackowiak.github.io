import { Stack } from "@mui/material"

interface TabPanelProps {
  index: number
  value: number
}

export function FirstTabPanel({ value, index, ...other }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Stack>badkandoa</Stack>}
    </div>
  )
}
