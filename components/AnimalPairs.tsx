import { Box } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useStorage } from "reactfire"
import { setRandomImages } from "images"

export default function AnimalPairs() {
  const [firstTaskImages, setFirstTaskImages] = useState([])
  const [secondTaskImages, setSecondTaskImages] = useState([])

  const storage = useStorage()

  useEffect(() => {
    setRandomImages(storage, setFirstTaskImages, setSecondTaskImages)
  }, [])

  return (
    <Stack direction="row" spacing={10} mt="55rem">
      <Stack direction="column" spacing={0}>
        {firstTaskImages.map((animal, index) => (
          <Box key={index}>{animal}</Box>
        ))}
        {firstTaskImages.length}
      </Stack>
      <Stack direction="column" spacing={0}>
        {secondTaskImages.map((animal, index) => (
          <Box key={index}>{animal}</Box>
        ))}
        {secondTaskImages.length}
      </Stack>
      <Stack direction="column" spacing={2}></Stack>
    </Stack>
  )
}
