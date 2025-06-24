import React from 'react'
import './LayeredButton.css'
export default function LayeredButton({ shadow_color, children, ...props }) {
    return (
        <button
            className="layered-button"
            style={{ '--shadow-color': shadow_color }}
            {...props}
        >
            {children}
        </button>
    )
}
