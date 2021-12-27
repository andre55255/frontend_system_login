import React, { useState, useContext } from 'react';
import './ForgotPasswordStepTwo.css';

import axios from 'axios';
import { authContext } from '../../providers/auth';
import { useNavigate } from 'react-router-dom';
import { validationPassword } from '../../validations/user';

import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast
} from '@chakra-ui/react';

export default function ForgotPasswordStepTwo() {

    const { user, setUser } = useContext(authContext);
    const navigate = useNavigate();
    const toast = useToast();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    async function resetPassword() {
        const token = user.token;
        const email = user.email;
        
        if (!token || !email) {
            toast({
                title: "Aviso",
                description: "Token e email não encontrados, tente novamente",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });

            navigate("/oneForgotPassword");
            return;
        }

        if (!password || !confirmPassword) {
            return toast({
                title: "Aviso",
                description: "Preencha todos os campos",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        if (password !== confirmPassword) {
            return toast({
                title: "Aviso",
                description: "Senhas não conferem",
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
                description: "Senha fora do padrão",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
        }

        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/user/forgotPasswordStepTwo`,
                method: "POST",
                data: { email, token, password }
            });

            if (resp.data.message) {
                toast({
                    title: "Sucesso",
                    description: "Senha redefinida com sucesso",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });

                setUser({ email: "", name: "", token: "" });

                navigate("/");
            } else {
                return toast({
                    title: "Erro",
                    description: "Erro na redefinição da senha, tente novamente mais tarde",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                    variant: "top-accent"
                });
            }
        } catch (err) {
            console.log(err);
            toast({
                title: "Erro",
                description: "Erro na redefinição da senha, tente novamente mais tarde",
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
        <div className='forgot-password-step-two'>
            <Box bg="#676FA3" w="80%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Esqueceu sua senha?
                </Text>
            </Box>
            <Box bg="#fdfdfd" w="80%" h="55vh" marginTop="2" borderRadius="md">
                <Stack spacing={3}>
                    <form name="form_forgot_password_step_two">
                        <FormControl isRequired>
                            <FormLabel htmlFor="password">Senha</FormLabel>
                            <InputGroup size="sm">
                                <Input
                                    id="password"
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
                        <FormControl isRequired marginTop="1">
                            <FormLabel htmlFor="confirmPassword">Confirme sua senha</FormLabel>
                            <InputGroup size="sm">
                                <Input
                                    id="confirmPassword"
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    placeholder="Digite novamente sua senha"
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Ocultar" : "Mostrar"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>
                                Este campo deve ser idêntico ao anterior
                            </FormHelperText>
                        </FormControl>
                        <div className="btn-group">
                            <Button
                                colorScheme="blue"
                                size="sm"
                                id="btnResetPassword"
                                onClick={resetPassword}
                            >
                                Redefinir senha
                            </Button>
                        </div>
                    </form>
                </Stack>
            </Box>
        </div>
    )
}
