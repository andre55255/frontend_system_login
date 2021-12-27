import React from 'react';
import './Index.css';
import logo from '../assets/logo.png';

export default function Header() {
    return (
        <header className='header'>
            <img src={logo} alt="logo" />
            Sistema de Login
        </header>
    );
}