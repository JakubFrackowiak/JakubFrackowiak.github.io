import { Box } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { images } from "../images"

export default function AnimalPairs() {
  const [firstTaskImages, setFirstTaskImages] = useState([])
  const [secondTaskImages, setSecondTaskImages] = useState([])

  useEffect(() => {
    handleSelectElements()
  }, [])

  const handleSelectElements = () => {
    const animals = [images.dogs, images.cows, images.pigs, images.rabbits]
    const fillers = images.fillers
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
    const secondAnimalImages = firstAnimalImages.map((animalPairs) =>
      animalPairs.map((animalPair) => {
        const lastChar = animalPair[animalPair.length - 1]
        const newLastChar = lastChar === "a" ? "b" : "a"
        return animalPair.slice(0, -1) + newLastChar
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

  return (
    <Stack direction="row" spacing={10} mt="55rem">
      <Stack direction="column" spacing={0}>
        {firstTaskImages.map((animal, index) => (
          <Box key={index}>{animal}</Box>
        ))}
        {firstTaskImages.length}
      </Stack>
      <Stack direction="column" spacing={0}>
        {secondTaskImages.map((animal, index) => (
          <Box key={index}>{animal}</Box>
        ))}
        {secondTaskImages.length}
      </Stack>
      <Stack direction="column" spacing={2}></Stack>
    </Stack>
  )
}
