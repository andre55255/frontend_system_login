import React from 'react';

import Template from '../template/Index';
import Router from '../routes/Router';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    return (
        <BrowserRouter>
            <Template>
                <Router />
            </Template>
        </BrowserRouter>
    );
}
