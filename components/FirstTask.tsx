import { Box, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { StorageImage, useStorage, useStorageDownloadURL } from "reactfire"
import { getRandomImages } from "images"

export function FirstTask({ setCurrentTask }) {
  const [firstTaskImages, setFirstTaskImages] = useState([])
  const [firstTaskIndex, setFirstTaskIndex] = useState(0)
  const [secondTaskImages, setSecondTaskImages] = useState([])
  const [secondTaskIndex, setSecondTaskIndex] = useState(0)

  const storage = useStorage()

  const getImages = async () => {
    const { firstTaskImages: firstImages, secondTaskImages: secondImages } =
      await getRandomImages(storage)
    setFirstTaskImages(firstImages)
    setSecondTaskImages(secondImages)
  }

  useEffect(() => {
    getImages()
    const interval = setInterval(() => {
      setFirstTaskIndex((firstTaskIndex) => firstTaskIndex + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (firstTaskIndex === 3) {
      setCurrentTask(2)
    }
  }, [firstTaskIndex])

  return (
    <Stack direction="row" spacing={10}>
      {firstTaskImages && firstTaskImages.length > 0 && firstTaskIndex < 3 ? (
        <Box>
          <StorageImage
            storagePath={firstTaskImages[firstTaskIndex]}
            style={{
              height: "80vh",
              width: "90vw",
              objectFit: "contain",
            }}
            alt="animal image"
          />
        </Box>
      ) : (
        <Typography>Ładowanie...</Typography>
      )}
    </Stack>
  )
}
