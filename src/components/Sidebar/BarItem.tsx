import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { sidebarState } from "../../atoms/sidebarAtom";
import { SidebarItem } from "./SidebarItems";

type BarItemProps = {
    item: SidebarItem;
    selected: boolean;
};

const BarItem: React.FC<BarItemProps> = ({ item, selected }) => {
    const setSelectedTab = useSetRecoilState(sidebarState);
    return (
        <Flex
            justify="left"
            align="center"
            flexGrow={1}
            cursor="pointer"
            fontWeight={700}
            _hover={{ bg: "gray.50" }}
            color={selected ? "blue.500" : "gray.500"}
            borderWidth={1}
            borderColor={selected ? "blue.100" : "white"}
            borderRadius={5}
            onClick={() => setSelectedTab({ tab: item.title })}
        >
            <Flex align="center" height="20px" ml={1} mr={2} width="20px">
                <Icon as={item.icon} fontSize={item.height} />
            </Flex>
            <Text>{item.title}</Text>
        </Flex>
    );
};
export default BarItem;
