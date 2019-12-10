import { useState } from 'react'
import names from '../utils/name-list'
const NameDisplay = () => {
  // state
  const [shouldShowNameList, setShouldShowNameList] = useState(false)
  // state
  const handleToggleNamesList = (e) => {
    setShouldShowNameList(!shouldShowNameList)
  }
  return (
    <div>
      <button className='showHide' onClick={handleToggleNamesList}>
        {shouldShowNameList ? 'Hide' : 'Show'} List Of Names
      </button>
      {shouldShowNameList
        ? <div>
          <h3>Current List Of Names</h3>
          <div className='NameList'>
            <span>
              {names.map((name, i) => `${name}${i !== names.length - 1 ? ', ' : ''}`)}
            </span>
            <br />
            <div className='marginTop'>please contact explodedsoda if you'd like to be added</div>
          </div>
        </div>
        : null
      }
      <style jsx>{`
        .marginTop {
          margin-top: 1rem;
        }
        .showHide {
          margin-top: 3rem;
          padding: 0;
        }
        .NameList {
          font-size: 0.75rem;
          line-height: 1.5;
          text-align: center;
        }
      `}
      </style>
    </div>
  )
}
export default NameDisplay
