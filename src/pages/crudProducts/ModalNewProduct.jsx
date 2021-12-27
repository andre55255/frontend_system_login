import React, { useState, useContext } from 'react';

import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
} from '@chakra-ui/react';

import { authContext } from '../../providers/auth';
import { validationDescription, validationQuantity, validationValueUnitary } from '../../validations/product';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ModalNewProduct() {

    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [valueUnitary, setValueUnitary] = useState(0);

    const toast = useToast();
    const navigate = useNavigate();
    const { user, setUser } = useContext(authContext);

    async function registerNewProduct() {
        if (!description || !quantity || !valueUnitary) {
            return toast({
                title: "Aviso",
                description: "Descrição, quantidade e valor unitário obrigatórios",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (!validationDescription(description)) {
            return toast({
                title: "Aviso",
                description: "Descrição inválida",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (!validationQuantity(quantity)) {
            return toast({
                title: "Aviso",
                description: "Informe um valor válido em quantidade",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (!validationValueUnitary(valueUnitary)) {
            return toast({
                title: "Aviso",
                description: "Informe um valor válido em valor unitário",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/product`,
                method: "POST",
                headers: { Authorization: "Bearer "+user.token },
                data: { 
                    description, 
                    quantity: parseInt(quantity),
                    valueUnitary: parseFloat(valueUnitary) 
                }
            });

            if (resp.data.message) {
                toast({
                    title: "Sucesso",
                    description: "Produto cadastrado com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });

                document.forms.form_new_product.reset();
                return;
            } else {
                setUser({
                    name: "",
                    email: "",
                    token: ""
                });

                localStorage.clear();
                navigate("/");

                return toast({
                    title: "Erro",
                    description: "Ocorreu um erro no cadastro do produto",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
            }
        } catch (err) {
            console.log(err);

            setUser({
                name: "",
                email: "",
                token: ""
            });

            localStorage.clear();
            navigate("/");

            return toast({
                title: "Erro",
                description: "Ocorreu um erro no cadastro do produto",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }
    }

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Novo produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <form name="form_new_product">
                            <FormControl>
                                <FormLabel htmlFor="description">Descrição</FormLabel>
                                <Input 
                                    id="description"
                                    type="text"
                                    placeholder="Descrição do produto"
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="quantity">Quantidade</FormLabel>
                                <Input 
                                    id="quantity"
                                    type="number"
                                    placeholder="Quantidade de produtos"
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="valueUnitary">
                                    Valor unitário (R$, separado por ponto)
                                </FormLabel>
                                <Input 
                                    id="valueUnitary"
                                    type="number"
                                    placeholder="Valor unitário do produto em reais"
                                    onChange={e => setValueUnitary(e.target.value)}
                                />
                            </FormControl>
                            <div className="group-btn">
                                <Button
                                    colorScheme="whatsapp"
                                    size="md"
                                    width="100%"
                                    onClick={registerNewProduct}
                                >
                                    Cadastrar
                                </Button>
                            </div>
                        </form>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </>
    )
}
