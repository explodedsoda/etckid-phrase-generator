import { useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { getAdjective, getNoun, getVerb, names } from '../../utils/fetch-words.js';
import { randIndexOfArray, randNumber } from '../../utils/random-number.js';
import { capitalizeString } from '../../utils/string-manipulation.js';

const fillTypes = ['!drumfill', '!drumloop', '!drums', '!title', '!titlebadly', '!tour', '!venue', '!venuebadly'];
const wordTypeEnum = {
  0: getAdjective,
  1: getVerb,
  2: getNoun,
};
const fillerWords = {
  0: 'After',
  1: 'And',
  2: 'Before',
  3: 'For',
  4: 'In',
  5: 'Is',
  6: 'Of',
  7: 'On',
  8: 'Over',
  9: 'The',
  10: 'This',
  11: 'That',
  12: 'Under',
};
let count = 0;
const DrumfillGenerator = () => {
  // state
  const [customWord, setCustomWord] = useState('');
  const [drumfillCount, setDrumfillCount] = useState(10);
  const [drumfillLength, setDrumfillLength] = useState(50);
  const [fills, setFills] = useState([]);
  const [selectedFillType, setSelectedFillType] = useState('!drumfill');
  const [shouldUseRegularList, setShouldUseRegularList] = useState(false);
  const [wasCopied, setWasCopied] = useState({});
  // state
  const getFills = useCallback(async () => {
    const validatedDrumfillLength = parseInt(drumfillLength);
    if (validatedDrumfillLength <= 0 || validatedDrumfillLength > 1000) {
      return setDrumfillLength(50);
    }
    const validatedDrumfillCount = parseInt(drumfillCount);
    if (validatedDrumfillCount <= 0 || validatedDrumfillCount > 500) {
      return setDrumfillCount(10);
    }
    const f = [];
    let fillCount = 0;
    let killCount = 0;
    do {
      let drumfill = ' ';
      let secondWord;
      const firstWord = customWord || (await wordTypeEnum[randNumber(0, 2)]());

      if (!shouldUseRegularList && firstWord.length === validatedDrumfillLength) {
        drumfill = firstWord;
      } else {
        secondWord = shouldUseRegularList ? randIndexOfArray(names) : await wordTypeEnum[randNumber(0, 2)]();
        drumfill = randNumber(0, 1)
          ? randNumber(0, 1)
            ? `${firstWord} ${secondWord}`
            : `${secondWord} ${firstWord}`
          : randNumber(0, 1)
          ? `${secondWord} ${getFiller()} ${firstWord}`
          : `${getFiller()} ${secondWord} ${firstWord}`;
      }
      let thirdWord = await wordTypeEnum[randNumber(0, 2)]();
      drumfill =
        `${drumfill} ${thirdWord}`.length <= validatedDrumfillLength && randNumber(0, 1)
          ? randNumber(0, 1)
            ? `${drumfill} ${thirdWord}`
            : `${thirdWord} ${drumfill}`
          : drumfill;

      if (validatedDrumfillLength && drumfill.length > validatedDrumfillLength) {
        if (f.includes(firstWord) || shouldUseRegularList) {
          killCount += 1;
        } else {
          f.push(firstWord);
          fillCount += 1;
        }
      } else {
        f.push(drumfill);
        fillCount += 1;
      }
    } while (fillCount < validatedDrumfillCount && killCount < 2000);
    return setFills(f);
  }, [customWord, drumfillCount, drumfillLength, shouldUseRegularList]);

  const getFiller = () => {
    let filler = fillerWords[randNumber(0, 12)];
    let word2 = randNumber(0, 1) ? ' ' + fillerWords[randNumber(0, 12)] : '';
    if (filler.trim().length && word2.trim().length && word2.trim() === filler.trim()) {
      do {
        word2 = fillerWords[randNumber(0, 12)];
      } while (word2.trim() === filler.trim());
      filler += ' ' + word2;
    }
    if (filler.length) {
      count += 1;
    }
    return filler;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (drumfillCount) {
      getFills();
    }
  };
  const handleFillCountChange = (e) => {
    setDrumfillCount(e.target.value);
  };
  const handleFillLengthChange = (e) => {
    setDrumfillLength(e.target.value);
  };
  const handleRegularListChange = (e) => {
    setShouldUseRegularList(e.target.checked);
  };
  const handleFillTypeChange = (e) => {
    setSelectedFillType(e.target.id);
  };
  const handleSetCustomWord = (e) => {
    setCustomWord(capitalizeString(e.target.value));
  };
  const handleOnCopy = (fill) => {
    setWasCopied({ [fill]: true });
    setTimeout(() => {
      setWasCopied({ [fill]: false });
    }, 500);
  };

  useEffect(() => {
    getFills();
  }, [getFills]);

  return (
    <div>
      <form className="flexColumn textLeft" onSubmit={handleSubmit}>
        <label className="flexRow" htmlFor="drumfillCountInput">
          <div>Number of Generations</div>
          <input type="number" value={drumfillCount} name="drumfillCountInput" onChange={handleFillCountChange} />
        </label>
        <label className="flexRow" htmlFor="drumfillLengthInput">
          <div>Max Fill Length</div>
          <input type="number" value={drumfillLength} name="drumfillLengthInput" onChange={handleFillLengthChange} />
        </label>
        <label className="flexRow" htmlFor="customWordInput">
          <div>Use Custom Word?</div>
          <input type="text" value={customWord} name="customWordInput" onChange={handleSetCustomWord} />
        </label>
        <label className="flexRow" htmlFor="useRegularList">
          Use Names?
          <input
            type="checkbox"
            name="useRegularList"
            onChange={handleRegularListChange}
            checked={shouldUseRegularList}
          />
        </label>
        <button type="submit">Generate</button>
      </form>
      <h3>Generated Text</h3>
      <div>
        {fillTypes.map((fillType) => (
          <label htmlFor={fillType} key={fillType}>
            <input
              checked={fillType === selectedFillType}
              id={fillType}
              name="fillTypeSelect"
              onChange={handleFillTypeChange}
              type="radio"
              value={fillType}
            />
            {fillType}
          </label>
        ))}
      </div>
      <div className="marginTop textLeft">
        {fills.map((fill, i) => {
          const textString = `${selectedFillType} ${fill}`;
          return (
            <CopyToClipboard onCopy={handleOnCopy} key={fill + i} text={textString}>
              <div className="fill"> {wasCopied[textString] ? 'Copied!' : textString}</div>
            </CopyToClipboard>
          );
        })}
      </div>
      <style jsx>
        {`
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
  );
};
export default DrumfillGenerator;
