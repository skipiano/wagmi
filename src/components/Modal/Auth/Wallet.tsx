import React, { useEffect, useState } from "react";
import MetamMaskOnBoarding from "@metamask/onboarding";
import { Flex, Text } from "@chakra-ui/react";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

const Wallet: React.FC = () => {
    const onboarding = React.useRef<MetamMaskOnBoarding>();
    const setAuthModalState = useSetRecoilState(authModalState);
    const [onboardError, setOnboardError] = useState("");

    const onboardMetamask = () => {
        if (MetamMaskOnBoarding.isMetaMaskInstalled()) {
            setOnboardError(
                "You already have Metamask installed, please try connecting above"
            );
        } else {
            onboarding.current?.startOnboarding();
        }
    };

    useEffect(() => {
        setOnboardError("");
        if (!onboarding.current) {
            onboarding.current = new MetamMaskOnBoarding();
        }
    }, []);

    return (
        <Flex direction="column" align="center">
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>No wallet?</Text>
                <Text
                    mr={1}
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={onboardMetamask}
                >
                    Install Metamask
                </Text>
                <Text color="gray.500" fontWeight={700} mr={1}>
                    OR
                </Text>
                <Text
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
                    Log In
                </Text>
            </Flex>
            {onboardError && (
                <Text textAlign="center" color="red" fontSize="10pt">
                    {onboardError}
                </Text>
            )}
        </Flex>
    );
};
export default Wallet;
