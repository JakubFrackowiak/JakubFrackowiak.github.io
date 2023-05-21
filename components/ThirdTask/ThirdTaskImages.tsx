import { Box, CircularProgress, Stack } from "@mui/material"
import { getDownloadURL, ref } from "firebase/storage"
import { useEffect, useState } from "react"
import { useStorage } from "reactfire"
import { BeigePaper } from "../common/BeigePaper"
import { Img } from "react-image"
import { useSurveyStore } from "../../storage/survey-store"
import { ProgressBar } from "components/common/ProgressBar"

export function ThirdTaskImages() {
  const [progress, setProgress] = useState(0)
  const {
    thirdTaskIndex,
    thirdTaskURLs,
    isThirdTaskLoaded,
    setIsThirdTaskLoaded,
  } = useSurveyStore((state) => ({
    thirdTaskIndex: state.thirdTaskIndex,
    thirdTaskURLs: state.thirdTaskURLs,
    isThirdTaskLoaded: state.isThirdTaskLoaded,
    setIsThirdTaskLoaded: state.setIsThirdTaskLoaded,
  }))

  useEffect(() => {
    if (progress >= 100) {
      setIsThirdTaskLoaded(true)
    }
  }, [progress])

  const handleImageLoad = () => {
    setProgress((prev) => prev + (1 / thirdTaskURLs.length) * 100)
  }

  const handleImageError = () => {
    setIsThirdTaskLoaded(false)
  }

  return (
    <Stack>
      {!isThirdTaskLoaded ? <ProgressBar progress={progress} /> : null}
      {thirdTaskURLs.map((url, index) => (
        <Box
          sx={{
            display:
              index === thirdTaskIndex && thirdTaskIndex ? "block" : "none",
            height: "60vh",
          }}
        >
          <BeigePaper width="fit-content" height="60vh" p="0">
            <Img
              key={index}
              src={url}
              style={{
                width: "100%",
                height: "60vh",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              alt="animal image"
            />
          </BeigePaper>
        </Box>
      ))}
    </Stack>
  )
}
