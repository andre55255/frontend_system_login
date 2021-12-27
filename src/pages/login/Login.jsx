import React, { useState, useContext } from "react";
import "./Login.css";

import { 
    Box, 
    Stack,
    FormControl, 
    FormLabel, 
    Input, 
    InputRightElement,
    Button,
    InputGroup,
    Text,
    useToast
} from "@chakra-ui/react";

import axios from 'axios';
import { authContext } from '../../providers/auth';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState("");

    const toast = useToast();
    const navigate = useNavigate();
    const { setUser } = useContext(authContext);


    function handleClick() {
        setShow(!show);
    }

    async function signIn() {
        if (!email || !password) {
            toast({
                title: "Aviso",
                description: "Email/Senha são obrigatórios",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
                variant: "top-accent"
            });
            return;
        }

        try {
            const resp = await axios({
                url: `${process.env.REACT_APP_URL_BACKEND}/user/signIn`,
                method: "POST",
                data: {
                    email,
                    password
                }
            });
    
            if (resp.data.token) {
    
                localStorage.setItem("email", email);
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("name", resp.data.name);
                
                setUser({
                    email,
                    token: resp.data.token,
                    name: resp.data.name
                });
    
                toast({
                    title: "Sucesso",
                    description: "Autenticação efetuada com sucesso",
                    status: "success",
                    variant: "top-accent",
                    position: "top",
                    isClosable: true
                });
    
                document.forms.form_login.reset();

                return;
            } else {
                setUser({ name: "", email: "", token: "" });
                localStorage.clear();

                toast({
                    title: "Erro",
                    description: "Falha na autenticação",
                    status: "success",
                    variant: "top-accent",
                    position: "top",
                    isClosable: true
                });

                return;
            }
        } catch (err) {
            console.log(err);
            toast({
                title: "Erro",
                description: "Falha na autenticação",
                status: "error",
                variant: "top-accent",
                position: "top",
                isClosable: true
            });
        }
    }

    return (
        <div className="login">
            <Box bg="#676FA3" w="80%" color="#fff" padding="3" borderRadius="md" textAlign="center">
                <Text fontSize="xl">
                    Login
                </Text>
            </Box>
            <Box bg="#fdfdfd" w="80%" h="55vh" marginTop="2" borderRadius="md">
                <Stack spacing={3}>
                    <form name="form_login">
                        <FormControl>
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
                        </FormControl>
                        <FormControl marginTop="1">
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
                        </FormControl>
                        <div className="btn-group">
                            <Button
                                colorScheme="blue"
                                size="sm"
                                onClick={signIn}
                                id="btnSignIn"
                            >
                                Login
                            </Button>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                variant="outline"
                                marginLeft="1"
                                onClick={() => navigate("register")}
                            >
                                Registrar
                            </Button>
                        </div>
                        <div className="forgot-password" onClick={() => navigate("/oneForgotPassword")}>
                            Esqueceu sua senha?
                        </div>
                    </form>
                </Stack>
            </Box>
        </div>
    );
}