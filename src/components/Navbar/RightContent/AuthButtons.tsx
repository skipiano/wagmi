import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const AuthButtons: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);

    return (
        <>
            <Button
                variant="outline"
                height="28px"
                display={{ base: "none", sm: "flex" }}
                width={{ base: "80px", md: "130px" }}
                mr={2}
                onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
                Log In
            </Button>
            <Button
                height="28px"
                display={{ base: "none", sm: "none", md: "flex" }}
                width={{ base: "80px", md: "130px" }}
                mr={2}
                onClick={() =>
                    setAuthModalState({ open: true, view: "wallet" })
                }
            >
                Connect Wallet
            </Button>
            <Button
                height="28px"
                display={{ base: "none", sm: "flex", md: "none" }}
                width={{ base: "80px", md: "130px" }}
                mr={2}
                onClick={() =>
                    setAuthModalState({ open: true, view: "wallet" })
                }
            >
                Connect
            </Button>
        </>
    );
};
export default AuthButtons;
