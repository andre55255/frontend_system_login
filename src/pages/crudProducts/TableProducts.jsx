import React, { useEffect, useState, useContext } from 'react';
import './Products.css';

import { authContext } from '../../providers/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
    useToast,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    useDisclosure,
    Modal
} from '@chakra-ui/react';

import { useCallback } from 'react';
import ModalUpdateProduct from './ModalUpdateProduct';
import iconEdit from '../../assets/ico-edit.png';
import iconDelete from '../../assets/ico-delete.png';

export default function TableProducts() {

    const { user, setUser } = useContext(authContext);
    const toast = useToast();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);

    const getProducts = useCallback(async () => {
        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/product`,
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
    }, [setUser, getProducts]);

    function renderTableRows() {
        if (products.length > 0) {
            
            return products.map((prod, ind) => {
                return (
                    <Tr index={ind} key={ind}>
                        <Td>{prod.description}</Td>
                        <Td>
                            {prod.valueUnitary.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                        </Td>
                        <Td className="container-actions">
                            <img 
                                src={iconEdit}
                                alt="editar"
                                className="ico"
                                id="ico-edit"
                                loading="lazy"
                                onClick={e => openModal(e)}
                            />
                            <img 
                                src={iconDelete} 
                                alt="deletar"
                                className="ico"
                                id="ico-delete"
                                loading="lazy"
                                onClick={e => deleteProduct(e)}
                            />
                        </Td>
                    </Tr>
                );
            });
        } else {
            return (
                <Tr>
                    <Td colSpan={3}>
                        Não há produtos cadastrados
                    </Td>
                </Tr>
            );
        }
    }

    function openModal(e) {
        const indexProductList = e.target.parentNode.parentNode.getAttribute("index");

        setProduct(products[indexProductList]);
        onOpen();
    }

    async function deleteProduct(e) {
        if (!window.confirm("Deseja mesmo excluir?")) return;

        const indexProductList = e.target.parentNode.parentNode.getAttribute("index");
        
        const product = products[indexProductList];
        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/product/${product._id}`,
                method: "DELETE",
                headers: { Authorization: "Bearer "+user.token }
            });
            
            if (resp.data.message) {
                toast({
                    title: "Sucesso",
                    description: "Produto deletado com sucesso",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    variant: "top-accent",
                    position: "top"
                });

                window.location.reload();

                return;
            } else {
                setUser({ name: "",  email: "", token: "" });
                localStorage.clear();
    
                toast({
                    title: "Erro",
                    description: "Erro ao deletar produto, faça login e tente novamente",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
            }
        } catch (err) {
            console.log(err);

            setUser({ name: "",  email: "", token: "" });
            localStorage.clear();

            toast({
                title: "Erro",
                description: "Erro ao deletar produto, faça login e tente novamente",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });

            return;
        }
    }

    return (
        <>
            <Table variant="simple" size="sm">
                <TableCaption>Produtos cadastrados por você</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Descrição</Th>
                        <Th>Valor Unitário</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {renderTableRows()}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalUpdateProduct product={product}/>
            </Modal>
        </>
    );
}
