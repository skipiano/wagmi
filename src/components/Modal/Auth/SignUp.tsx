import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const SignUp: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);

    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [createUserWithEmailAndPassword, user, loading, userError] =
        useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (error) setError("");
            if (signUpForm.password !== signUpForm.confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            createUserWithEmailAndPassword(
                signUpForm.email,
                signUpForm.password
            );
        } catch (error: any) {
            console.log("onSubmit error", error);
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name="email"
                placeholder="email"
                type="email"
                mb={2}
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg="gray.50"
            />
            <Input
                required
                name="password"
                placeholder="password"
                type="password"
                mb={2}
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg="gray.50"
            />
            <Text
                mt={2}
                fontSize="9pt"
                color="blue.500"
                fontWeight={700}
                cursor="pointer"
                onClick={() =>
                    setAuthModalState((prev) => ({
                        ...prev,
                        view: "login",
                    }))
                }
            >
                LOG IN
            </Text>
            <Input
                required
                name="confirmPassword"
                placeholder="confirm password"
                type="password"
                mb={2}
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg="gray.50"
            />
            <Text textAlign="center" color="red" fontSize="10pt">
                {error ||
                    FIREBASE_ERRORS[
                        userError?.message as keyof typeof FIREBASE_ERRORS
                    ]}
            </Text>
            <Button
                width="100%"
                height="36px"
                mt={2}
                mb={2}
                type="submit"
                isLoading={loading}
            >
                Sign Up
            </Button>
            <Flex fontSize="9pt" justifyContent="center" mb={2}>
                <Text mr={1}>Have a wallet already?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "wallet",
                        }))
                    }
                >
                    CONNECT
                </Text>
            </Flex>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already have an account?</Text>
                <Text
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "login",
                        }))
                    }
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    );
};
export default SignUp;
