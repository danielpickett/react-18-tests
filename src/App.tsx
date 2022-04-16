import './App.scss'
import { useState, startTransition, useDeferredValue, ChangeEvent } from 'react'

const arr = Array(18).fill('x')

function blockThreasd(millis: number) {
  var date = new Date().valueOf()
  var curDate = null

  do {
    curDate = new Date().valueOf()
  } while (curDate - date < millis)
}

export const App = () => {
  const [value, setValue] = useState('')

  return (
    <div className="App">
      <TextInput value={value} onChange={setValue} />
      {value}
      <div className="cells">
        {arr.map((_, index) => (
          <Cell count={value.length} key={index} />
        ))}
      </div>
    </div>
  )
}

const TextInput = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  const [localValue, setlocalValue] = useState(value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setlocalValue(newValue)
    startTransition(() => onChange(newValue))
    // onChange(newValue)
  }

  return (
    <input className="text-input" value={localValue} onChange={handleChange} />
  )
}

const Cell = ({ count }: { count: number }) => {
  blockThreasd(50)

  const r = rando()
  const g = rando()
  const b = rando()

  return (
    <div
      className="cell"
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b})`,
        color: getTextColor(r, g, b),
      }}
    >
      {count}
    </div>
  )
}

const rando = () => Math.floor(Math.random() * 255).toFixed(0)
const getTextColor = (r: string, g: string, b: string) =>
  Math.round(
    (parseInt(r) * 299 + parseInt(g) * 587 + parseInt(b) * 114) / 1000
  ) > 125
    ? 'black'
    : 'white'
