import { Box } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { StorageImage, useStorage, useStorageDownloadURL } from "reactfire"
import { getRandomImages } from "images"

export default function AnimalPairs() {
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

  return (
    <Stack direction="row" spacing={10}>
      {firstTaskImages && firstTaskImages.length > 0 ? (
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
      ) : null}
    </Stack>
  )
}
