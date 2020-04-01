import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getAdjective, getNoun, getVerb } from '../utils/fetch-words'
import { randIndexOfArray, randNumber } from '../utils/random-number'
import { capitalizeString } from '../utils/string-manipulation'
import names from '../utils/name-list'
const fillTypes = [
  '!drumfill',
  '!drumloop',
  '!drums',
  '!title',
  '!titlebadly',
  '!venue',
  '!venuebadly'
]
const wordTypeEnum = {
  0: getAdjective,
  1: getVerb,
  2: getNoun
}
const fillerWords = {
  0: 'A',
  1: 'After',
  2: 'And',
  3: 'Before',
  4: 'For',
  5: 'In',
  6: 'Is',
  7: 'Of',
  8: 'On',
  9: 'Over',
  10: 'The',
  11: 'This',
  12: 'That',
  13: 'Under'
}
let count = 0
const DrumfillGenerator = () => {
  // state
  const [customWord, setCustomWord] = useState('')
  const [drumfillCount, setDrumfillCount] = useState(10)
  const [drumfillLength, setDrumfillLength] = useState(50)
  const [fills, setFills] = useState([])
  const [selectedFillType, setSelectedFillType] = useState('!drumfill')
  const [shouldUseRegularList, setShouldUseRegularList] = useState(false)
  const [wasCopied, setWasCopied] = useState({})
  // state
  const getFills = async () => {
    const validatedDrumfillLength = parseInt(drumfillLength)
    if (validatedDrumfillLength <= 0 || validatedDrumfillLength > 1000) {
      return setDrumfillLength(50)
    }
    const validatedDrumfillCount = parseInt(drumfillCount)
    if (validatedDrumfillCount <= 0 || validatedDrumfillCount > 500) {
      return setDrumfillCount(10)
    }
    const f = []
    let fillCount = 0
    let killCount = 0
    do {
      let drumfill = ' '
      let secondWord
      const firstWord = customWord || await wordTypeEnum[randNumber(0, 2)]()

      if (!shouldUseRegularList && firstWord.length === validatedDrumfillLength) {
        drumfill = firstWord
      } else {
        secondWord = shouldUseRegularList ? randIndexOfArray(names) : await wordTypeEnum[randNumber(0, 2)]()
        drumfill = randNumber(0, 1)
          ? randNumber(0, 1) ? `${firstWord} ${secondWord}` : `${secondWord} ${firstWord}`
          : randNumber(0, 1) ? `${secondWord} ${getFiller()} ${firstWord}` : `${getFiller()} ${secondWord} ${firstWord}`
      }
      let thirdWord = await wordTypeEnum[randNumber(0, 2)]()
      drumfill = `${drumfill} ${thirdWord}`.length <= validatedDrumfillLength && randNumber(0, 1)
        ? randNumber(0, 1)
          ? `${drumfill} ${thirdWord}`
          : `${thirdWord} ${drumfill}`
        : drumfill

      if (validatedDrumfillLength && drumfill.length > validatedDrumfillLength) {
        if (f.includes(firstWord) || shouldUseRegularList) {
          killCount += 1
        } else {
          f.push(firstWord)
          fillCount += 1
        }
      } else {
        f.push(drumfill)
        fillCount += 1
      }
    } while (fillCount < validatedDrumfillCount && killCount < 2000)
    return setFills(f)
  }

  const getFiller = () => {
    let filler = fillerWords[randNumber(0, 13)]
    let word2 = randNumber(0, 1) ? ' ' + fillerWords[randNumber(0, 13)] : ''
    if (filler.trim().length && word2.trim().length && word2.trim() === filler.trim()) {
      do {
        word2 = fillerWords[randNumber(0, 13)]
      } while (word2.trim() === filler.trim())
      filler += ' ' + word2
    }
    if (filler.length) count += 1
    return filler
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (drumfillCount) {
      getFills()
    }
  }
  const handleFillCountChange = (e) => {
    setDrumfillCount(e.target.value)
  }
  const handleFillLengthChange = (e) => {
    setDrumfillLength(e.target.value)
  }
  const handleRegularListChange = (e) => {
    setShouldUseRegularList(e.target.checked)
  }
  const handleFillTypeChange = (e) => {
    setSelectedFillType(e.target.id)
  }
  const handleSetCustomWord = (e) => {
    setCustomWord(capitalizeString(e.target.value))
  }
  const handleOnCopy = (fill) => {
    setWasCopied({ [fill]: true })
    setTimeout(() => {
      setWasCopied({ [fill]: false })
    }, 500)
  }
  useEffect(() => {
    getFills()
  }, [])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='drumfillCountInput'>
            Number of Generations
            <input
              type='number'
              value={drumfillCount}
              name='drumfillCountInput'
              onChange={handleFillCountChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor='drumfillLengthInput'>
            Max Fill Length
            <input
              type='number'
              value={drumfillLength}
              name='drumfillLengthInput'
              onChange={handleFillLengthChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor='customWordInput'>
            Use Custom Word?
            <input
              type='text'
              value={customWord}
              name='customWordInput'
              onChange={handleSetCustomWord}
            />
          </label>
        </div>
        <div>
          <label htmlFor='useRegularList'>
            Use Names?
            <input
              type='checkbox'
              name='useRegularList'
              onChange={handleRegularListChange}
              checked={shouldUseRegularList}
            />
          </label>
        </div>
        <button type='submit'>Generate</button>
      </form>
      <h3>Generated Text</h3>
      <div>
        {fillTypes.map((fillType) =>
          <label htmlFor={fillType} key={fillType}>
            <input
              checked={fillType === selectedFillType}
              id={fillType}
              name='fillTypeSelect'
              onChange={handleFillTypeChange}
              type='radio'
              value={fillType}
            />
            {fillType}
          </label>
        )}
      </div>
      <div className='marginTop'>
        {fills.map((fill, i) => {
          const textString = `${selectedFillType} ${fill}`
          return (
            <CopyToClipboard onCopy={handleOnCopy} key={fill + i} text={textString}>
              <div className='fill'> {wasCopied[textString] ? 'Copied!' : textString}</div>
            </CopyToClipboard>
          )
        })}
      </div>
      <style jsx>{`
        .fill {
          -webkit-user-select: all;
          -moz-user-select: all;
          -ms-user-select: all;
          user-select: all;
        }
        .marginTop {
          margin-top: 1rem;
        }
      `}
      </style>
    </div>
  )
}
export default DrumfillGenerator
