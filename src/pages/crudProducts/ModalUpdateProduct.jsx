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

export default function ModalUpdateProduct({ product }) {

    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity);
    const [valueUnitary, setValueUnitary] = useState(product.valueUnitary);

    const toast = useToast();
    const navigate = useNavigate();
    const { user, setUser } = useContext(authContext);

    async function updateProduct() {
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

        if (description === product.description &&
            quantity === product.quantity &&
            valueUnitary === product.valueUnitary
        ) {
            return toast({
                title: "Aviso",
                description: "Informações são iguais, não é possível atualizar",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (document.getElementById("id").value !== product._id) {
            return toast({
                title: "Aviso",
                description: "ID do produto não reconhecido",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/product/${product._id}`,
                method: "PATCH",
                headers: { Authorization: "Bearer "+user.token },
                data: { description, quantity, valueUnitary }
            });

            if (resp.data.message) {
                toast({
                    title: "Sucesso",
                    description: "Produto atualizado com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
                document.forms.form_update_product.reset();
                return;
            } else {
                setUser({ name: "", email: "", token: "" });
                localStorage.clear();
    
                toast({
                    title: "Erro",
                    description: "Ocorreu um erro ao atualizar este produto, tente novamente mais tarde",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
                
                navigate("/");
                return;
            }
        } catch (err) {
            console.log(err);

            setUser({ name: "", email: "", token: "" });
            localStorage.clear();

            toast({
                title: "Erro",
                description: "Ocorreu um erro ao atualizar este produto, tente novamente mais tarde",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });

            navigate("/");
            return;
        }
    }

    return (
        <>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Atualizar produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <form name="form_update_product">
                            <FormControl>
                                <FormLabel htmlFor="id">ID do produto</FormLabel>
                                <Input 
                                    id="id"
                                    type="text"
                                    value={product._id}
                                    disabled
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="description">Descrição do produto</FormLabel>
                                <Input 
                                    id="description"
                                    type="text"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="quantity">Quantidade do produto</FormLabel>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </FormControl>
                            <FormControl margin="1">
                                <FormLabel htmlFor="valueUnitary">
                                    Valor unitário (R$, separado por ponto)
                                </FormLabel>
                                <Input 
                                    id="valueUnitary"
                                    type="number"
                                    value={valueUnitary}
                                    onChange={e => setValueUnitary(e.target.value)}
                                />
                            </FormControl>
                            <div className="group-btn">
                                <Button
                                    colorScheme="yellow"
                                    size="md"
                                    width="100%"
                                    onClick={updateProduct}
                                >
                                    Atualizar
                                </Button>
                            </div>
                        </form>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </>
    )
}
