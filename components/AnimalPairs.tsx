import { Box } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { StorageImage, useStorage, useStorageDownloadURL } from "reactfire"
import { getImageNames } from "images"

export default function AnimalPairs() {
  const [firstTaskImages, setFirstTaskImages] = useState([])
  const [firstTaskIndex, setFirstTaskIndex] = useState(0)
  const [secondTaskImages, setSecondTaskImages] = useState([])
  const [secondTaskIndex, setSecondTaskIndex] = useState(0)

  const storage = useStorage()

  useEffect(() => {
    setRandomImages(storage)
  }, [])

  const setRandomImages = async (storage) => {
    const { animals, fillers } = await getImageNames(storage)
    const firstAnimalImages = animals.map((animal) =>
      getRandomAnimals(animal, 6)
    )
    const firstFillerImages = getRandomFillers(fillers, 8)
    const firstNewAnimals = animals.map((animalPairs, index) =>
      animalPairs.map((animalPair) =>
        animalPair.filter((a) => !firstAnimalImages[index].includes(a))
      )
    )
    const firstNewFillers = fillers.filter(
      (filler) => !firstFillerImages.includes(filler)
    )
    setFirstTaskImages(
      [...firstAnimalImages.flat(2), ...firstFillerImages].sort(
        () => Math.random() - 0.5
      )
    )
    const secondAnimalImages = firstAnimalImages.map((animalPair) =>
      animalPair.map((animal) => {
        const animalName = animal.split(".")[0]
        const lastChar = animalName.slice(-1)
        const newLastChar = lastChar === "a" ? "b.jpg" : "a.jpg"
        const newAnimalName = animalName.slice(0, -1) + newLastChar
        return newAnimalName
      })
    )
    const secondNewAnimals = firstNewAnimals.map((animalPairs, index) =>
      animalPairs
        .map((animalPair) =>
          animalPair.filter((a) => !secondAnimalImages[index].includes(a))
        )
        .filter((animalPairs) => animalPairs.length > 0)
    )
    const secondOddImages = secondNewAnimals.map((animal) =>
      getRandomAnimals(animal, 6)
    )
    const secondFillerImages = getRandomFillers(firstNewFillers, 8)
    setSecondTaskImages(
      [
        ...secondAnimalImages.flat(2),
        ...secondOddImages.flat(2),
        ...secondFillerImages,
      ].sort(() => Math.random() - 0.5)
    )
  }

  const getRandomAnimals = (animalArr: string[][], count: number): string[] => {
    const shuffled = animalArr
      .map((animal) => animal[Math.floor(Math.random() * 2)])
      .sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  const getRandomFillers = (fillerArr: string[], count: number): string[] => {
    const shuffled = fillerArr.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  useEffect(() => {
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
            width={200}
            height={200}
          />
        </Box>
      ) : null}
    </Stack>
  )
}
