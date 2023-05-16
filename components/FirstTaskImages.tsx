import { CircularProgress, Stack } from "@mui/material"
import { getDownloadURL, ref } from "firebase/storage"
import { useEffect, useState } from "react"
import { useStorage } from "reactfire"
import { BeigePaper } from "./BeigePaper"
import { Img } from "react-image"
import { useSurveyStore } from "storage/survey-store"

export function FirstTaskImages() {
  const {
    setCurrentTask,
    firstTaskImages,
    firstTaskIndex,
    setFirstTaskIndex,
    firstTaskURLs,
    setFirstTaskURLs,
  } = useSurveyStore((state) => ({
    setCurrentTask: state.setCurrentTask,
    firstTaskImages: state.firstTaskImages,
    firstTaskIndex: state.firstTaskIndex,
    setFirstTaskIndex: state.setFirstTaskIndex,
    firstTaskURLs: state.firstTaskURLs,
    setFirstTaskURLs: state.setFirstTaskURLs,
    setId: state.setId,
  }))

  const storage = useStorage()

  useEffect(() => {
    if (firstTaskURLs.length > 0) {
      const interval = setInterval(() => {
        setFirstTaskIndex()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [firstTaskURLs])

  useEffect(() => {
    if (firstTaskImages.length > 0) {
      const promises = firstTaskImages.map((imageName) => {
        const imageRef = ref(storage, imageName)
        return getDownloadURL(imageRef)
      })

      Promise.all(promises).then((urls) => setFirstTaskURLs(urls))
      firstTaskURLs.map((url) => console.log(url))
    }
  }, [firstTaskImages])

  useEffect(() => {
    if (firstTaskIndex === firstTaskURLs.length && firstTaskURLs.length > 0) {
      setCurrentTask(1)
    }
  }, [firstTaskIndex])

  console.log("firstTaskURLs", firstTaskURLs)

  return firstTaskURLs && firstTaskURLs.length > 0 ? (
    <Stack>
      <BeigePaper width="fit-content" height="60vh" p="0">
        {firstTaskURLs.map((url, index) => (
          <Img
            key={index}
            src={url}
            style={{
              height: "60vh",
              width: "100%",
              objectFit: "contain",
              borderRadius: "0.5rem",
              display: index === firstTaskIndex ? "block" : "none",
            }}
            alt="animal image"
          />
        ))}
      </BeigePaper>
    </Stack>
  ) : (
    <CircularProgress variant="indeterminate" />
  )
}
