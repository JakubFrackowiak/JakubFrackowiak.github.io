import { Box } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { images } from "../images"

export default function AnimalPairs() {
  const [animals, setAnimals] = useState<string[]>(images.animals)
  const [firstAnimals, setFirstAnimals] = useState<string[]>([])
  const [secondAnimals, setSecondAnimals] = useState<string[]>([])

  useEffect(() => {
    const firstAnimals = animals
      .sort(() => Math.random() - Math.random())
      .slice(0, 10)
    setFirstAnimals(firstAnimals)
    setAnimals(animals.filter((animal) => !firstAnimals.includes(animal)))
    const possibleAnimals = firstAnimals
      .map((animal) => [
        animal.slice(0, animal.length - 1),
        animal.slice(animal.length - 1),
      ])
      .map(([animal, letter]) => [
        animal + (letter === "a" ? "b" : "a"),
        animal + (letter === "a" ? "b" : "a"),
      ])
      .flat()
      .concat(images.fillers)
    const secondAnimalss = possibleAnimals
      .sort(() => Math.random() - Math.random())
      .slice(0, 10)
    setSecondAnimals(secondAnimalss)
    setAnimals(animals.filter((animal) => !secondAnimals.includes(animal)))
  }, [])

  return (
    <Stack direction="row" spacing={10}>
      <Stack direction="column" spacing={2}>
        {firstAnimals.map((animal) => (
          <Box>{animal}</Box>
        ))}
      </Stack>
      <Stack direction="column" spacing={2}>
        {secondAnimals.map((animal) => (
          <Box>{animal}</Box>
        ))}
      </Stack>
    </Stack>
  )
}
