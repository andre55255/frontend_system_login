import React, { useState, useCallback, useContext, useEffect } from 'react';
import './AllProducts.css';

import {
    Box,
    Table,
    TableCaption,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
    useDisclosure,
    Modal
} from '@chakra-ui/react';

import { authContext } from '../../providers/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import iconDetails from '../../assets/ico-details.png';
import ModalDetailsProduct from './ModalDetailsProduct';

export default function AllProducts() {

    const { user, setUser } = useContext(authContext);
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    const getProducts = useCallback(async () => {
        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/product/all/users`,
                method: "GET",
                headers: {
                    Authorization: "Bearer "+user.token
                }
            });  
            setProducts(resp.data);
        } catch (err) {
            console.log(err);
            setUser({
                name: "",
                email: "",
                token: ""
            });
            localStorage.clear();
            toast({
                title: "Erro",
                description: "Usuário não encontrado, faça login novamente",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
            navigate("/");
        }
    }, [navigate, toast, user, setUser]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    function renderTableRows() {
        return products.map((prod, ind) => {
            return (
                <Tr index={ind} key={ind}>
                    <Td>{prod.nameUser}</Td>
                    <Td>{prod.description}</Td>
                    <Td>
                        <img 
                            src={iconDetails} 
                            alt="detalhes" 
                            id="ico-details"
                            loading="lazy"
                            onClick={e => openModal(e)}
                        />
                    </Td>
                </Tr>
            );
        });
    }

    function openModal(e) {
        const indexProductList = e.target.parentNode.parentNode.getAttribute("index");

        setProduct(products[indexProductList]);
        onOpen();
    }

    return (
        <div className="all-products">
            <Box bg="#676FA3" w="95%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Todos os produtos
                </Text>
            </Box>
            <Box bg="#fdfdfd" w="95%" minHeight="55vh" marginTop="2" borderRadius="md">
                <Table variant="simple" size="sm">
                    <TableCaption>Todos os produtos da base de dados</TableCaption>
                    <Thead>
                        <Th>Usuário</Th>
                        <Th>Descrição</Th>
                        <Th>Ações</Th>
                    </Thead>
                    <Tbody>
                        {renderTableRows()}
                    </Tbody>
                </Table>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalDetailsProduct product={product} />
            </Modal>    
        </div>
    );
}
