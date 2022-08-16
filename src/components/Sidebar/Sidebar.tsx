import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import AdItems from "./AdItems";
import SidebarItems from "./SidebarItems";
import SubcommunitySidebar from "./SubcommunitySidebar";

type SidebarProps = {
    sidebarType: "Profile" | "Settings" | "Admin" | "Ads" | "Subcommunity";
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarType }) => {
    return (
        <Flex
            direction="column"
            bg="white"
            padding="10px"
            borderRadius={5}
            border="1px solid"
            borderColor="gray.300"
            width="250px"
        >
            {sidebarType === "Subcommunity" ? (
                <SubcommunitySidebar communityId="" />
            ) : (
                <>
                    <Text fontWeight={700}>{sidebarType}</Text>
                    <Divider color="gray.500" mt={2} mb={1} />
                    {sidebarType === "Ads" ? (
                        <AdItems />
                    ) : (
                        <SidebarItems sidebarType={sidebarType} />
                    )}
                </>
            )}
        </Flex>
    );
};
export default Sidebar;
