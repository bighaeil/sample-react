import { useState, useEffect } from "react";

const UPDATE_CYCLE = 1000
const KEY_LOCALE = 'KEY_LOCALE'

enum Local {
    US = 'en-US',
    KO = 'ko-KR',
}

const getLocaleFromString = (text: string) => {
    switch(text) {
        case Local.US:
            return Local.US
        case Local.KO:
            return Local.KO
        default:
            return Local.US
    }
}

const Clock = () => {
    const [timestamp, setTimestamp] = useState(new Date())
    const [local, setLocal] = useState(Local.US)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimestamp(new Date())
        }, UPDATE_CYCLE)

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY_LOCALE, local)
    }, [local])

    return (
        <div>
            <p>
                <span id="current-time-label">현재 시각</span>
                <span>:{timestamp.toLocaleString(local)}</span>
                <select
                    value={local}
                    onChange={(e) => setLocal(getLocaleFromString(e.target.value))}>
                        <option value="en-US">en-US</option>
                        <option value="ko-KR">ko-KR</option>
                </select>
            </p>
        </div>
    )
}

export default Clock;