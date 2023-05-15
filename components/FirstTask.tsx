import { Stack } from "@mui/system"
import { useState } from "react"

import { BeigeButton } from "./BeigeButton"
import { FirstTaskImages } from "./FirstTaskImages"

export function FirstTask({
  setCurrentTask,
  firstTaskImages,
  firstTaskIndex,
  setFirstTaskIndex,
}) {
  const [isReady, setIsReady] = useState(false)

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
