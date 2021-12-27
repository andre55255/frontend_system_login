import React from 'react';

import { 
    FormControl,
    FormLabel,
    Input,
    ModalBody,
    ModalCloseButton,
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    Stack
} from '@chakra-ui/react';

export default function ModalDetailsProduct({ product }) {
    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Detalhes do produto</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={3}>
                        <form name="form_details_product">
                            <FormControl>
                                <FormLabel htmlFor="idUser">ID usuário dono</FormLabel>
                                <Input 
                                    id="idUser"
                                    type="text"
                                    disabled
                                    size="sm"
                                    value={product.id_user}
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="nameUser">Nome usuário dono</FormLabel>
                                <Input 
                                    id="nameUser"
                                    type="text"
                                    disabled
                                    size="sm"
                                    value={product.nameUser}
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="idProduct">ID do produto</FormLabel>
                                <Input 
                                    id="idProduct"
                                    type="text"
                                    disabled
                                    size="sm"
                                    value={product._id}
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="descriptionProduct">Descrição do produto</FormLabel>
                                <Input 
                                    id="descriptionProduct"
                                    type="text"
                                    disabled
                                    size="sm"
                                    value={product.description}
                                />
                            </FormControl>
                            <FormControl marginTop="1">
                                <FormLabel htmlFor="quantityProduct">Quantidade do produto</FormLabel>
                                <Input 
                                    id="quantityProduct"
                                    type="text"
                                    disabled
                                    size="sm"
                                    value={product.quantity}
                                />
                            </FormControl>
                            <FormControl marginTop="1" marginBottom="2">
                                <FormLabel htmlFor="valueUnitaryProduct">Valor unitário do produto</FormLabel>
                                <Input 
                                    id="valueUnitaryProduct"
                                    type="text"
                                    disabled
                                    size="sm"
                                    value={product.valueUnitary.toLocaleString('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    })}
                                />
                            </FormControl>
                        </form>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </>
    )
}
