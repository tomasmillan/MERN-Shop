import React from 'react'
import { FadeLoader } from 'react-spinners'

const LoadingSpinner = () => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        justifyContent: 'center',
        alignItems: 'center'
    }
  return (
    <div style={style}>
         <FadeLoader 
            color="#36d7b7"
            speedMultiplier={0.6}
          />
    </div>
  )
}

export default LoadingSpinner