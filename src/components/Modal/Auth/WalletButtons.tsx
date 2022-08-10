import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Web3 from "web3";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import Caver from "caver-js";

const WalletButtons: React.FC = () => {
    const [metamaskLoading, setMetamaskLoading] = useState(false);
    const [kaikasLoading, setKaikasLoading] = useState(false);
    const [error, setError] = useState("");

    const connectMetamask = async () => {
        setError("");
        setMetamaskLoading(true);
        try {
            if (window?.ethereum?.isMetaMask) {
                const accounts = (await window.ethereum.request({
                    method: "eth_requestAccounts",
                })) as string[];
                const account = Web3.utils.toChecksumAddress(accounts[0]);

                const baseURL =
                    "https://us-central1-wagmi-242e9.cloudfunctions.net/expressApi";
                const response = await axios.get(
                    `${baseURL}/message?address=${account}&network=eth`
                );
                const messageToSign = response?.data?.messageToSign;
                const web3 = new Web3(Web3.givenProvider);
                const signature = await web3.eth.personal.sign(
                    messageToSign,
                    account,
                    ""
                );
                const jwtResponse = await axios.get(
                    `${baseURL}/jwt?address=${account}&signature=${signature}&network=eth`
                );

                const customToken = jwtResponse?.data?.customToken;

                if (!customToken) {
                    throw new Error("Invalid JWT");
                }

                await signInWithCustomToken(auth, customToken);
            } else {
                throw new Error(
                    "Metamask is not installed, try another wallet or install Metamask below"
                );
            }
        } catch (error: any) {
            console.log("connectMetamask error", error);
            setError(error);
        }
        setMetamaskLoading(false);
    };

    const connectKaikas = async () => {
        setError("");
        setKaikasLoading(true);
        try {
            if (window?.klaytn?.isKaikas) {
                const accounts = await window.klaytn.enable();
                const account = Web3.utils.toChecksumAddress(accounts[0]);

                const baseURL =
                    "https://us-central1-wagmi-242e9.cloudfunctions.net/expressApi";
                const response = await axios.get(
                    `${baseURL}/message?address=${account}&network=eth`
                );
                const messageToSign = response?.data?.messageToSign;
                const web3 = new Web3(Web3.givenProvider);
                const signature = await web3.eth.personal.sign(
                    messageToSign,
                    account,
                    ""
                );
                console.log(signature);
                const jwtResponse = await axios.get(
                    `${baseURL}/jwt?address=${account}&signature=${signature}&network=eth`
                );
                console.log(jwtResponse);

                const customToken = jwtResponse?.data?.customToken;
                console.log(customToken);
                if (!customToken) {
                    throw new Error("Invalid JWT");
                }

                await signInWithCustomToken(auth, customToken);
            } else {
                throw new Error(
                    "Kaikas is not installed, try another wallet or install Kaikas"
                );
            }
        } catch (error: any) {
            console.log("connectKaikas error", error);
            setError(error);
        }
        setKaikasLoading(false);
    };

    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button
                variant="oauth"
                mb={2}
                isLoading={metamaskLoading}
                onClick={connectMetamask}
                disabled={kaikasLoading}
            >
                <Image src="/images/metamask.png" height="20px" mr={4}></Image>
                Continue with Metamask
            </Button>
            <Button
                variant="oauth"
                mb={2}
                isLoading={kaikasLoading}
                onClick={connectKaikas}
                disabled={metamaskLoading}
            >
                <Image src="/images/kaikas.png" height="20px" mr={4}></Image>
                Continue with Kaikas
            </Button>
            {!metamaskLoading && kaikasLoading && error && (
                <Text textAlign="center" color="red" fontSize="10pt">
                    {error}
                </Text>
            )}
        </Flex>
    );
};
export default WalletButtons;
