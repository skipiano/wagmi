import { Flex, Icon, Button, Box, Image, Text } from "@chakra-ui/react";
import { auth } from "../../firebase/clientApp";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const OverviewPage: React.FC = () => {
    const [user] = useAuthState(auth);

    return (
        <Flex direction="column" width="100%" height="400px">
            <Box height="50%" bg="blue.400" />
            <Flex justify="center" bg="white" flexGrow={1}>
                <Flex width="95%" maxWidth="860px">
                    {false ? (
                        <Image
                            src=""
                            borderRadius="full"
                            boxSize="150px"
                            alt="Logo"
                            position="relative"
                            top={-3}
                            border="4px solid"
                            borderColor="blue.400"
                        />
                    ) : (
                        <Image
                            src="/images/wagmi_logo.png"
                            borderRadius="full"
                            boxSize="150px"
                            alt="Logo"
                            position="relative"
                            top={-3}
                            color="blue.400"
                            border="4px solid"
                            borderColor="blue.400"
                        />
                    )}
                    <Flex padding="10px 16px">
                        <Flex direction="column" mr={6}>
                            <Text fontWeight={800} fontSize="16pt">
                                Hi
                            </Text>
                            <Text
                                fontWeight={600}
                                fontSize="10pt"
                                color="gray.400"
                            >
                                c/hi
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default OverviewPage;
