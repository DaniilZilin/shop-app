import React from 'react'
// import Inputmask from 'inputmask'

export default function PhoneNumber() {
  const maskRef = React.useRef(null)
  const [ Complete, setComplete ] = React.useState<string>('')

  // React.useEffect(() => {
  //   Inputmask({regex: '^+7 (/d{3}) /d{3} /d{2} /d{2}$'}).mask(maskRef.current)
  // }, [])

  return (
    <div>
      <input ref={maskRef} />
    </div>
  )
}