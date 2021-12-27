import React from 'react';
import './Index.css';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="nav">
            <li>
                <Link to="/">Login</Link>
            </li>
            <li>
                <Link to="/products">Produtos</Link>
            </li>
        </nav>
    );
}