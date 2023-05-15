import { Stack } from "@mui/system"
import { FirstTaskImages } from "./FirstTaskImages"

export function FirstTask({
  setCurrentTask,
  firstTaskImages,
  firstTaskIndex,
  setFirstTaskIndex,
}) {
  return (
    <Stack height="60vh" justifyContent="center">
      <FirstTaskImages
        setCurrentTask={setCurrentTask}
        firstTaskImages={firstTaskImages}
        firstTaskIndex={firstTaskIndex}
        setFirstTaskIndex={setFirstTaskIndex}
      />
    </Stack>
  )
}
