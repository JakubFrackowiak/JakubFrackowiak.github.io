import { Stack } from "@mui/material"
import { CopyID } from "./CopyID"
import { Question } from "./Question"
import { ThirdTaskImages } from "./ThirdTaskImages"

export function ThirdTask() {
  return (
    <Stack width="100%">
      <ThirdTaskImages />
      <Question />
      <CopyID />
    </Stack>
  )
}
