import React, { useState, useContext } from 'react';
import './ForgotPasswordStepOne.css';

import {
    Box,
    Text,
    Stack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    useToast
} from '@chakra-ui/react';

import { validationEmail } from '../../validations/user';
import axios from 'axios';
import { authContext } from '../../providers/auth';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordStepOne() {

    const [email, setEmail] = useState("");
    const [sentEmail, setSentEmail] = useState(false);
    const [token, setToken] = useState("");

    const toast = useToast();
    const { setUser } = useContext(authContext);
    const navigate = useNavigate();

    async function sendEmailWithToken() {
        if (!email || !validationEmail(email)) {
            return toast({
                title: "Aviso",
                description: "Email inválido ou não informado",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/user/forgotPasswordStepOne`,
                method: "POST",
                data: { email }
            });
            
            if (resp.data.message) {
                toast({
                    title: "Sucesso",
                    description: "Email com token enviado",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
                document.getElementById("email").disabled = true;
                document.getElementById("btnSendToken").disabled = true;
                setSentEmail(true);
                return;
            } else {
                return toast({
                    title: "Erro",
                    description: "Email não encontrado na base de dados",
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
                description: "Email não encontrado na base de dados",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

    }

    async function validToken() {
        if (!token || !sentEmail) {
            return toast({
                title: "Aviso",
                description: "Token não informado ou email não disparado",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/user/forgotPasswordValidToken`,
                method: "POST",
                data: { token }
            });

            if (resp.data.email && resp.data.token) {

                if (resp.data.email !== email) {
                    return toast({
                        title: "Erro",
                        description: "Token inválido ou diferente do enviado por email",
                        status: "error",
                        duration: 5000,
                        position: "top",
                        variant: "top-accent",
                        isClosable: true
                    });
                }

                toast({
                    title: "Sucesso",
                    description: "Token validado com sucesso",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });

                setUser({
                    email,
                    token
                });

                navigate("/twoForgotPassword");
                return;
            } else {
                return toast({
                    title: "Erro",
                    description: "Token inválido ou diferente do enviado por email",
                    status: "warning",
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
                description: "Token inválido ou diferente do enviado por email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }
    }

    return (
        <div className="forgot-password-step-one">
            <Box bg="#676FA3" w="80%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Esqueceu sua senha?
                </Text>
            </Box>
            <Box bg="#fdfdfd" w="80%" h="55vh" marginTop="2" borderRadius="md">
                <Stack spacing={3}>
                    <form name="form_forgot_password_step_one">
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                type="email" 
                                placeholder="Digite seu email"
                                size="sm"
                                autoComplete="off"
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                            <FormHelperText>
                                Informe o seu email de acesso para enviarmos o token de redefinição de senha
                            </FormHelperText>
                        </FormControl>
                        <div className="btn-group">
                            <Button
                                colorScheme="blue"
                                size="sm"
                                id="btnSendToken"
                                onClick={sendEmailWithToken}
                            >
                                Enviar token de redefinição de senha
                            </Button>
                        </div>
                        <FormControl isRequired>
                            <FormLabel htmlFor="token">
                                Token de redefinição de senha
                            </FormLabel>
                            <Input 
                                id="token"
                                type="text"
                                placeholder="Digite o token enviado para seu email"
                                size="sm"
                                autoComplete="off"
                                required
                                onChange={e => setToken(e.target.value)}
                            />
                        </FormControl>
                        <div className="btn-group">
                            <Button
                                colorScheme="blue"
                                size="sm"
                                id="btnContinue"
                                onClick={validToken}
                            >
                                Continuar
                            </Button>
                        </div>
                    </form>
                </Stack>
            </Box>
        </div>
    );
}