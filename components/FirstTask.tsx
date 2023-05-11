import { LinearProgress, CircularProgress } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { useStorage } from "reactfire"
import { getRandomImages } from "images"
import { getDownloadURL, ref } from "firebase/storage"

export function FirstTask({ setCurrentTask }) {
  const [firstTaskImages, setFirstTaskImages] = useState([])
  const [firstTaskURLs, setFirstTaskURLs] = useState([])
  const [firstTaskIndex, setFirstTaskIndex] = useState(0)
  const [secondTaskImages, setSecondTaskImages] = useState([])
  const [secondTaskIndex, setSecondTaskIndex] = useState(0)
  const [progress, setProgress] = useState(0)

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
      setProgress(0)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (firstTaskIndex === 50) {
      setCurrentTask(1)
    }
  }, [firstTaskIndex])

  useEffect(() => {
    let intervalId
    if (progress < 100) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(intervalId)
            return 100
          }
          return prevProgress + 1
        })
      }, 30) // update progress every 30 milliseconds
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [firstTaskIndex, progress])

  useEffect(() => {
    const promises = firstTaskImages.map((imageName) => {
      const imageRef = ref(storage, imageName)
      return getDownloadURL(imageRef)
    })

    Promise.all(promises).then((urls) => setFirstTaskURLs(urls))
  }, [])

  console.log("firstTaskImages", firstTaskURLs)

  return (
    <Stack>
      {firstTaskURLs && firstTaskURLs.length > 0 ? (
        <Stack>
          <img
            src={firstTaskURLs[firstTaskIndex]}
            style={{ width: "80vw", height: "50vh", objectFit: "contain" }}
            alt="animal image"
          />
          <LinearProgress variant="determinate" value={progress} />
        </Stack>
      ) : (
        <CircularProgress variant="indeterminate" />
      )}
    </Stack>
  )
}
