import './App.scss'
import { useState, startTransition, ChangeEvent } from 'react'
import { atom, useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil'

const textValueAtom = atom({
  key: 'textValue',
  default: '',
})

const arr = Array(18).fill('x')

function blockThreasd(millis: number) {
  var date = new Date().valueOf()
  var curDate = null

  do {
    curDate = new Date().valueOf()
  } while (curDate - date < millis)
}

export const App = () => {
  // const [value, setValue] = useState('')
  const [value, setValue] =
    useRecoilState_TRANSITION_SUPPORT_UNSTABLE(textValueAtom)

  const handleChange = (value: string) => {
    startTransition(() => {
      setValue(value)
    })
  }

  return (
    <div className="App">
      {/* <Slider value={count} onChange={setCount} /> */}
      <TextInput value={value} onChange={handleChange} />
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
  }

  return (
    <input className="text-input" value={localValue} onChange={handleChange} />
  )
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
const num = () => getRandomInt(255).toFixed(0)

const Cell = ({ count }: { count: number }) => {
  blockThreasd(50)

  const r = num(),
    g = num(),
    b = num()

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

const p = parseInt
const getTextColor = (r: string, g: string, b: string) =>
  Math.round((p(r) * 299 + p(g) * 587 + p(b) * 114) / 1000) > 125
    ? 'black'
    : 'white'
