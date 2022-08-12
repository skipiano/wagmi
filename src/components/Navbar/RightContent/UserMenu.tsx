import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Icon,
    Flex,
    MenuDivider,
    Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { MdOutlineLogin, MdOutlineDarkMode, MdDarkMode } from "react-icons/md";
import { auth, firestore } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const UserMenu: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [user] = useAuthState(auth);
    const [displayName, setDisplayName] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const logout = async () => {
        await signOut(auth);
    };

    const fetchUserData = async () => {
        try {
            const userSnap = await getDoc(doc(firestore, "users", user!.uid));
            setDisplayName(userSnap.get("displayName"));
            setDarkMode(userSnap.get("darkMode"));
        } catch (error: any) {
            console.log("fetchUserData error", error);
        }
    };

    const toggleDarkMode = async () => {
        try {
            setDarkMode((prev) => !prev);
            if (user) {
                console.log(darkMode);
                await setDoc(
                    doc(firestore, "users", user.uid),
                    { darkMode: !darkMode },
                    { merge: true }
                );
            }
        } catch (error: any) {
            console.log("toggleDarkMode error", error);
        }
    };

    useEffect(() => {
        if (user) fetchUserData();
    }, []);

    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding="0px 6px"
                borderRadius={4}
                _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            >
                <Flex align="center">
                    <Flex align="center">
                        <Icon
                            as={CgProfile}
                            mr={1}
                            color="gray.500"
                            fontSize={24}
                        />
                        <Flex
                            direction="column"
                            display={{ base: "none", lg: "flex" }}
                            fontSize="8pt"
                            align="flex-start"
                            mr={8}
                        >
                            <Text fontWeight={700}>{displayName}</Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                <MenuItem
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{ bg: "blue.500", color: "white" }}
                >
                    <Flex>
                        <Icon as={CgProfile} fontSize={20} mr={2} />
                        Profile
                    </Flex>
                </MenuItem>
                <MenuItem
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{ bg: "blue.500", color: "white" }}
                >
                    <Flex>
                        <Icon as={FiSettings} fontSize={20} mr={2} />
                        Settings
                    </Flex>
                </MenuItem>
                <MenuItem
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{ bg: "blue.500", color: "white" }}
                    onClick={toggleDarkMode}
                >
                    <Flex>
                        <Icon
                            as={darkMode ? MdDarkMode : MdOutlineDarkMode}
                            fontSize={20}
                            mr={2}
                        />
                        Dark Mode
                    </Flex>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                    fontSize="10pt"
                    fontWeight={700}
                    _hover={{ bg: "blue.500", color: "white" }}
                    onClick={logout}
                >
                    <Flex>
                        <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                        Disconnect / Log Out
                    </Flex>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};
export default UserMenu;
