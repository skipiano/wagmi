import { Flex, Icon } from "@chakra-ui/react";
import { auth } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
    IoFilterCircleOutline,
    IoNotificationsOutline,
    IoVideocamOutline,
} from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import useDirectory from "../../../hooks/useDirectory";

const Icons: React.FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const { toggleMenuOpen } = useDirectory();
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
        <Flex>
            <>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsChatDots} fontSize={20} />
                </Flex>
                <Flex
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={IoNotificationsOutline} fontSize={20} />
                </Flex>
                <Flex
                    display={{ base: "none", md: "flex" }}
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                    onClick={onPostClick}
                >
                    <Icon as={GrAdd} fontSize={20} />
                </Flex>
            </>
        </Flex>
    );
};
export default Icons;
