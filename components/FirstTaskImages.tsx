import { CircularProgress, Stack } from "@mui/material"
import { getDownloadURL, ref } from "firebase/storage"
import { useEffect, useState } from "react"
import { useStorage } from "reactfire"
import { BeigePaper } from "./BeigePaper"

export function FirstTaskImages({ setCurrentTask, firstTaskImages }) {
  const [firstTaskURLs, setFirstTaskURLs] = useState([])
  const [firstTaskIndex, setFirstTaskIndex] = useState(0)

  const storage = useStorage()

  useEffect(() => {
    if (firstTaskURLs.length > 0) {
      const interval = setInterval(() => {
        setFirstTaskIndex((firstTaskIndex) => firstTaskIndex + 1)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [firstTaskURLs])

  useEffect(() => {
    if (firstTaskIndex === firstTaskImages.length) {
      setCurrentTask(1)
    }
  }, [firstTaskIndex])

  useEffect(() => {
    const promises = firstTaskImages.map((imageName) => {
      const imageRef = ref(storage, imageName)
      return getDownloadURL(imageRef)
    })

    Promise.all(promises).then((urls) => setFirstTaskURLs(urls))
  }, [firstTaskImages])

  return firstTaskURLs && firstTaskURLs.length > 0 ? (
    <Stack>
      <BeigePaper width="fit-content" height="60vh" p="0">
        <img
          src={firstTaskURLs[firstTaskIndex]}
          style={{
            height: "60vh",
            width: "100%",
            objectFit: "contain",
            borderRadius: "1.5rem",
          }}
          alt="animal image"
        />
      </BeigePaper>
    </Stack>
  ) : (
    <CircularProgress variant="indeterminate" />
  )
}
