import { Box, Card, Typography } from "@mui/material"
import { BeigePaper } from "./BeigePaper"
import ContentCopy from "@mui/icons-material/ContentCopy"
import { useEffect, useState } from "react"

export function CopyID({ id }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)

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
    <BeigePaper width="fit-content" height="fit-content" p="0">
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
          }}
        >
          <Typography lineHeight="50px" variant="body1">
            Skopiowano!
          </Typography>
        </Card>
      ) : null}
    </BeigePaper>
  )
}
