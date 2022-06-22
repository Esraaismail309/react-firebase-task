import React, { useEffect, useState } from 'react'
import { Btn } from './Btn'

export const Form = ({ handleSubmit, handler, index, ...list }) => {
    const [userName, setUserName] = useState('')
    const [userAge, setUserAge] = useState('')
    useEffect(() => {
        setUserAge(list[index]?.data?.Age)
        setUserName(list[index]?.data?.Name)
    }
        , [])

    return (
        <div>
            <form onSubmit={(e) => {
                handleSubmit(e, userName, userAge)
            }}>
                <label> Enter your name</label>
                <input
                    type="text"
                    placeholder="enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label>Enter your age</label>
                <input
                    type="number"
                    placeholder="enter your age"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                />
                <Btn handler={handler} setUserAge={userAge} setUserName={userName} />
            </form>
        </div>
    )
}
