import { Box, CircularProgress, Stack } from "@mui/material"
import { getDownloadURL, ref } from "firebase/storage"
import { useEffect, useState } from "react"
import { useStorage } from "reactfire"
import { BeigePaper } from "../common/BeigePaper"
import { Img } from "react-image"
import { useSurveyStore } from "../../storage/survey-store"
import { ProgressBar } from "components/common/ProgressBar"
import Image from "next/image"

export function ThirdTaskImages() {
  const {
    firstTaskURLs,
    thirdTaskIndex,
    thirdTaskURLs,
    progress,
    setProgress,
  } = useSurveyStore((state) => ({
    firstTaskURLs: state.firstTaskURLs,
    thirdTaskIndex: state.thirdTaskIndex,
    thirdTaskURLs: state.thirdTaskURLs,
    progress: state.progress,
    setProgress: state.setProgress,
  }))

  const handleImageLoad = () => {
    setProgress((1 / (firstTaskURLs.length + thirdTaskURLs.length)) * 100)
    console.log("task 3: ", progress)
  }

  return (
    <Stack>
      {thirdTaskURLs.map((url, index) => (
        <Box
          sx={{
            display: index === thirdTaskIndex ? "block" : "none",
          }}
        >
          <BeigePaper width="30rem" height="40rem" p="0">
            <Image
              key={index}
              src={url}
              layout="fill"
              objectFit="contain"
              style={{
                borderRadius: "0.5rem",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              onLoad={() => handleImageLoad()}
              alt="animal image"
              priority
            />
          </BeigePaper>
        </Box>
      ))}
    </Stack>
  )
}
