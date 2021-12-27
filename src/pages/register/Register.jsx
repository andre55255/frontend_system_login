import React, { useState } from 'react';
import './Register.css';

import { 
    Box,
    Text,
    Stack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    InputGroup,
    InputRightElement,
    Button,
    useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
    validationEmail,
    validationPassword,
    validationName
} from '../../validations/user';

export default function Register() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();

    const handleClick = () => setShow(!show);

    async function signUp() {
        if (!email || !name || !password) {
            return toast({
                title: "Aviso",
                description: "Nome/Email/Senha são obrigatórios",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (!validationEmail(email)) {
            return toast({
                title: "Aviso",
                description: "Email em formato inválido",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (!validationPassword(password)) {
            return toast({
                title: "Aviso",
                description: "Senha em formato inválido, verifique e tente novamente",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (!validationName(name)) {
            return toast({
                title: "Aviso",
                description: "Nome inválido",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/user`,
                method: "POST",
                data: { name, email, password }
            });

            if (resp.data.id) {
                document.forms.form_register.reset();

                return toast({
                    title: "Sucesso",
                    description: "Cadastro efetuado com sucesso",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
            } else {
                return toast({
                    title: "Erro",
                    description: "Falha na criação de conta, Email já existente na base de dados ou Servidor fora de área",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
            }
        } catch (err) {
            console.log(err);
            return toast({
                title: "Erro",
                description: "Falha na criação de conta, Email já existente na base de dados ou Servidor fora de área",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }
    }

    return (
        <div className='register'>
            <Box bg="#676FA3" w="80%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Criar conta
                </Text>
            </Box>
            <Box bg="#fdfdfd"  w="80%" h="55vh" marginTop="2" borderRadius="md">
                <Stack spacing={3}>
                    <form name="form_register">
                        <FormControl id="name" isRequired>
                            <FormLabel htmlFor='name'>Nome completo</FormLabel>
                            <Input 
                                type="text"
                                placeholder="Digite seu nome"
                                size="sm"
                                autoComplete="off"
                                required
                                onChange={e => setName(e.target.value)}
                            />
                            <FormHelperText>
                                Informe o seu nome completo (ex: Fulano de tal da Silva)
                            </FormHelperText>
                        </FormControl>
                        <FormControl id="email" marginTop={1} isRequired>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input
                                type="email" 
                                placeholder="Digite seu email"
                                size="sm"
                                autoComplete="off"
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                            <FormHelperText>
                                Informe um email válido (ex: fulano@email.com)
                            </FormHelperText>
                        </FormControl>
                        <FormControl id="password" marginTop="1" isRequired>
                            <FormLabel>Senha</FormLabel>
                            <InputGroup size="sm">
                                <Input
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>
                            Mínimo de 6 e máximo de 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial
                            </FormHelperText>
                        </FormControl>
                        <div className="btn-group">
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={signUp}
                                id="btnSignUp"
                            >
                                Criar Conta
                            </Button>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                variant="outline"
                                marginLeft="1"
                                onClick={() => navigate("/")}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </Stack>
            </Box>
        </div>
    );
}