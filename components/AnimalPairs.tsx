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
    const dogs = images.dogs
    const cows = images.cows
    const pigs = images.pigs
    const rabbits = images.rabbits
    const fillers = images.fillers
    const firstDogImages = getRandomAnimals(dogs, 6)
    const firstCowImages = getRandomAnimals(cows, 6)
    const firstPigImages = getRandomAnimals(pigs, 6)
    const firstRabbitImages = getRandomAnimals(rabbits, 6)
    const firstFillerImages = getRandomFillers(fillers, 8)
    const firstNewDogs = dogs.map((dog) =>
      dog.filter((d) => !firstDogImages.includes(d))
    )
    const firstNewCows = cows.map((cow) =>
      cow.filter((c) => !firstCowImages.includes(c))
    )
    const firstNewPigs = pigs.map((pig) =>
      pig.filter((p) => !firstPigImages.includes(p))
    )
    const firstNewRabbits = rabbits.map((rabbit) =>
      rabbit.filter((r) => !firstRabbitImages.includes(r))
    )
    const firstNewFillers = fillers.filter(
      (f) => !firstFillerImages.includes(f)
    )
    const firstPairImages = [
      ...firstDogImages,
      ...firstCowImages,
      ...firstPigImages,
      ...firstRabbitImages,
    ]
    setFirstTaskImages(
      [...firstPairImages, ...firstFillerImages].sort(() => Math.random() - 0.5)
    )
    const secondPairImages = firstPairImages.map((animal) => {
      const lastChar = animal[animal.length - 1]
      const newLastChar = lastChar === "a" ? "b" : "a"
      return animal.slice(0, -1) + newLastChar
    })
    const secondNewDogs = firstNewDogs
      .map((dog) => dog.filter((d) => !secondPairImages.includes(d)))
      .filter((d) => d.length > 0)
    const secondNewCows = firstNewCows
      .map((cow) => cow.filter((c) => !secondPairImages.includes(c)))
      .filter((c) => c.length > 0)
    const secondNewPigs = firstNewPigs
      .map((pig) => pig.filter((p) => !secondPairImages.includes(p)))
      .filter((p) => p.length > 0)
    const secondNewRabbits = firstNewRabbits
      .map((rabbit) => rabbit.filter((r) => !secondPairImages.includes(r)))
      .filter((r) => r.length > 0)
    const secondDogImages = getRandomAnimals(secondNewDogs, 6)
    const secondCowImages = getRandomAnimals(secondNewCows, 6)
    const secondPigImages = getRandomAnimals(secondNewPigs, 6)
    const secondRabbitImages = getRandomAnimals(secondNewRabbits, 6)
    const secondFillerImages = getRandomFillers(firstNewFillers, 8)
    const secondOddImages = [
      ...secondDogImages,
      ...secondCowImages,
      ...secondPigImages,
      ...secondRabbitImages,
    ]
    setSecondTaskImages(
      [...secondPairImages, ...secondOddImages, ...secondFillerImages].sort(
        () => Math.random() - 0.5
      )
    )
  }

  const getRandomAnimals = (animalArr, count) => {
    const shuffled = animalArr
      .map((animal) => animal[Math.floor(Math.random() * 2)])
      .sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  const getRandomFillers = (fillerArr, count) => {
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
