import React from 'react';
import ReactDOM from 'react-dom';

import App from './container/App.jsx'; 
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './providers/auth';

ReactDOM.render(
    <ChakraProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ChakraProvider>,
    document.getElementById('root')
);