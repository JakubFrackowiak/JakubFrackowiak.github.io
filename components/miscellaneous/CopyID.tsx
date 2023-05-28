import ContentCopy from "@mui/icons-material/ContentCopy"
import { Box, Card, Typography } from "@mui/material"
import { BeigePaper } from "../common/BeigePaper"
import { useEffect, useState } from "react"
import { useSurveyStore } from "../../storage/survey-store"

export function CopyID() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)
  const { id } = useSurveyStore((state) => ({
    id: state.id,
  }))

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(id)
      setCopied(true)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }
  return (
    <BeigePaper width="fit-content" height="100%" p="0">
      <Box position="relative" py="1.5rem" px="2.5rem">
        <Typography variant="h5">ID: {id}</Typography>
        <Box sx={{ position: "absolute", top: "0.4rem", right: "0.4rem" }}>
          <ContentCopy
            onClick={() => handleClick()}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
      {copied ? (
        <Card
          sx={{
            position: "absolute",
            left: position.x,
            top: position.y - 50,
            textAlign: "center",
            height: "50px",
            px: "1rem",
            bgcolor: (theme) => theme.palette.grey[600],
            color: "white",
          }}
        >
          <Typography lineHeight="50px" variant="h6">
            Skopiowano!
          </Typography>
        </Card>
      ) : null}
    </BeigePaper>
  )
}
