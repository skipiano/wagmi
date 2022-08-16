import React, { useState } from "react";
import { Button, Flex, Stack, Text, Image } from "@chakra-ui/react";
import { auth } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import useDirectory from "../../hooks/useDirectory";
import CreateCommunityModal from "../Modal/CreateCommunity/CreateCommunityModal";

const PersonalHome: React.FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const { toggleMenuOpen } = useDirectory();
    const [open, setOpen] = useState(false);

    const onPostClick = () => {
        if (!user) {
            setAuthModalState({ open: true, view: "login" });
            return;
        }
        const { communityId } = router.query;
        if (communityId) {
            router.push(`/c/${communityId}/submit`);
            return;
        }
        toggleMenuOpen();
    };

    return (
        <>
            <CreateCommunityModal
                open={open}
                handleClose={() => setOpen(false)}
            />
            <Flex
                direction="column"
                bg="white"
                borderRadius={4}
                cursor="pointer"
                border="1px solid"
                borderColor="gray.300"
                position="sticky"
            >
                <Flex
                    align="flex-end"
                    color="white"
                    p="6px 10px"
                    bg="blue.500"
                    height="34px"
                    borderRadius="4px 4px 0px 0px"
                    fontWeight={600}
                    bgImage="url(/images/redditPersonalHome.png)"
                    backgroundSize="cover"
                ></Flex>
                <Flex direction="column" p="12px">
                    <Flex align="center" mb={2}>
                        <Image
                            src="/images/wagmi_logo.png"
                            width="50px"
                            mr={2}
                        />
                        <Text fontWeight={600}>Home</Text>
                    </Flex>
                    <Stack spacing={3}>
                        <Button height="30px" onClick={onPostClick}>
                            Create Post
                        </Button>
                        <Button
                            variant="outline"
                            height="30px"
                            onClick={() => setOpen(true)}
                        >
                            Create Community
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        </>
    );
};
export default PersonalHome;
