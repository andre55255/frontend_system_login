import React from 'react';
import './Products.css';

import {
    Box,
    Stack,
    Text,
    Button,
    useDisclosure,
    Modal
} from '@chakra-ui/react';

import TableProducts from './TableProducts';
import ModalNewProduct from './ModalNewProduct';
import { useNavigate } from 'react-router-dom';

export default function Products() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    return (
        <div className="products">
            <Box bg="#676FA3" w="95%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Crud de produtos
                </Text>
            </Box>
            <Box bg="#fdfdfd" w="95%" minHeight="55vh" marginTop="2" borderRadius="md">
                <Stack spacing={3}>
                    <div className="group-btn">
                        <Button
                            colorScheme="whatsapp"
                            size="sm"
                            onClick={onOpen}
                        >
                            Novo produto
                        </Button>
                        <Button
                            colorScheme="telegram"
                            size="sm"
                            marginLeft="2"
                            onClick={() => navigate("/allProducts")}
                        >
                            Todos os produtos
                        </Button>
                    </div>
                    <div className="tableProduct">
                        <TableProducts />
                    </div>
                </Stack>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalNewProduct />
                </Modal>
            </Box>
        </div>
    );
}