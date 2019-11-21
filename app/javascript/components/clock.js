import React, { useState, useEffect } from 'react'

export default function Clock () {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => setDate(new Date(), 1000))

        return function cleanup () {
            clearInterval(intervalId)
        }
    })

    return (
        date.toLocaleTimeString()
    )
}
  
