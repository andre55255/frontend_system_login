import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Main from './Main';

export default function Index(props) {
    return (
        <Grid
            h='100vh'
            templateRows='80px 50px 1fr 32px'
            templateColumns='100vw'
        >
            <GridItem
                rowSpan={1} colSpan={1} bg='#676FA3'
            >
                <Header />
            </GridItem>
            <GridItem 
                rowSpan={1} colSpan={1} bg='#676FA3'
            >
                <Nav />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1} bg='#EEF2FF'>
                <Main>
                    {props.children}
                </Main>
            </GridItem>
            <GridItem
                rowSpan={1} colSpan={1} bg='#EEF2FF'
            >
                <Footer />
            </GridItem>
        </Grid>
    )
}
