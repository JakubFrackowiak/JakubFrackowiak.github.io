"use client"
import { Box, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { BeigePaper } from "../common/BeigePaper"
import { useSurveyStore } from "storage/survey-store"
import Image from "next/image"
import { ProgressBar } from "../common/ProgressBar"

export function FirstTaskImages() {
  const [progress, setProgress] = useState(0)
  const {
    setCurrentTask,
    firstTaskIndex,
    setFirstTaskIndex,
    firstTaskURLs,
    isFirstTaskLoaded,
    setIsFirstTaskLoaded,
  } = useSurveyStore((state) => ({
    setCurrentTask: state.setCurrentTask,
    firstTaskIndex: state.firstTaskIndex,
    setFirstTaskIndex: state.setFirstTaskIndex,
    firstTaskURLs: state.firstTaskURLs,
    isFirstTaskLoaded: state.isFirstTaskLoaded,
    setIsFirstTaskLoaded: state.setIsFirstTaskLoaded,
  }))

  useEffect(() => {
    if (isFirstTaskLoaded) {
      const interval = setInterval(() => {
        setFirstTaskIndex()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isFirstTaskLoaded, firstTaskIndex])

  useEffect(() => {
    if (firstTaskIndex === firstTaskURLs.length - 1 && isFirstTaskLoaded) {
      setCurrentTask(2)
    }
  }, [firstTaskIndex])

  useEffect(() => {
    if (progress === 100) {
      setIsFirstTaskLoaded(true)
    }
  }, [progress])

  const handleImageLoad = () => {
    setProgress((prev) => prev + (1 / firstTaskURLs.length) * 100)
  }

  const handleImageError = () => {
    setIsFirstTaskLoaded(false)
  }

  return (
    <Stack>
      {!isFirstTaskLoaded ? <ProgressBar progress={progress} /> : null}
      {firstTaskURLs.map((url, index) => (
        <Box
          sx={{
            display:
              index === firstTaskIndex && isFirstTaskLoaded ? "block" : "none",
          }}
        >
          <BeigePaper width="fit-content" height="60vh" p="0">
            <Image
              key={index}
              src={url}
              width="100%"
              height="60vh"
              objectFit="contain"
              style={{
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
