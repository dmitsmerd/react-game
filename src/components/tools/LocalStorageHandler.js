import React from 'react'

export default function LocalStorageHandler (props) {
    if (!props) {
        if(!localStorage.best) {
            localStorage.setItem('best', '0')
            return 0
        }
        return localStorage.getItem('best')
    } else {
        if (+localStorage.getItem('best') < props.best) {
            localStorage.setItem('best', props.best)
        }
    }
}
