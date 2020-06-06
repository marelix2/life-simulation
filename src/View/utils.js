import { populate, moveCreature, createCreaturesTillMinimum } from "./creature"
import { sow } from './plant'

let creatures = []
let plants = []
let mainInterval
let ctx

const loop = (props) => {
  const creaturesLength = creatures.length 
  for (let i = creaturesLength - 1; i >= 0; i--) {
    moveCreature({ id: i, creatures, plants, ...props });
  }
  drawWorld();
  if (creatures.length === 0) {
    clearInterval(mainInterval);
  }
  creatures = createCreaturesTillMinimum({ creatures, ...props });
  sow({ creatures, plants, ...props })
}

const drawWorld = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  let plantsCount = plants.length;
  for (let i = 0; i < plantsCount; i++) {
    plants[i].draw(ctx);
  }
  let creaturesCount = creatures.length;
  for (let i = 0; i < creaturesCount; i++) {
    creatures[i].draw(ctx);
  }
}

export const handleStart = ({ context, ...props }) => {
  ctx = context

  ctx.width = props.mapSize
  ctx.height = props.mapSize

  clearInterval(mainInterval);
  creatures = populate({ ...props })
  plants = sow({ creatures, plants, ...props })

  mainInterval = setInterval(() => loop(props), props.speed);
}

export const handleStop = () => {
  clearInterval(mainInterval);
}

export const handleReset = (window) => {
  window.location.reload()
  clearInterval(mainInterval)
}



