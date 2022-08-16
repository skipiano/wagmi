import React from "react";
import { Flex, Icon, Text, Stack, Button } from "@chakra-ui/react";
import { IoRadio } from "react-icons/io5";

const AdLink: React.FC = () => {
    return (
        <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            cursor="pointer"
            p="12px"
            border="1px solid"
            borderColor="gray.300"
        >
            <Flex mb={2}>
                <Icon as={IoRadio} fontSize={26} color="blue.500" mt={2} />
                <Stack spacing={1} fontSize="9pt" pl={2}>
                    <Text fontWeight={600}>Advertise</Text>
                    <Text>Anyone can advertise on WAGMI.</Text>
                </Stack>
            </Flex>
            <Button height="30px" bg="blue.500">
                Try Now
            </Button>
        </Flex>
    );
};
export default AdLink;
