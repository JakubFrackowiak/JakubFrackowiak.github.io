import { Stack } from "@mui/system"
import { useState } from "react"

import { BeigeButton } from "./BeigeButton"
import { FirstTaskImages } from "./FirstTaskImages"

export function FirstTask({ setCurrentTask, firstTaskImages }) {
  const [isReady, setIsReady] = useState(false)

  return (
    <Stack height="60vh" justifyContent="center">
      {isReady ? (
        <FirstTaskImages
          setCurrentTask={setCurrentTask}
          firstTaskImages={firstTaskImages}
        />
      ) : (
        <BeigeButton onClick={() => setIsReady(true)}>Jestem gotów</BeigeButton>
      )}
    </Stack>
  )
}
