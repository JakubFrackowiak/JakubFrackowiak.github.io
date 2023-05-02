import React from "react"
import styles from "../styles/Home.module.css"

import AnimalPairs from "components/AnimalPairs"

export default function Home() {
  return (
    <div className={styles.container}>
      <AnimalPairs />
    </div>
  )
}
