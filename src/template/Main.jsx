import React from 'react'
import './Index.css';

export default function Main(props) {
    return (
        <main className='main'>
            {props.children}
        </main>
    );
}