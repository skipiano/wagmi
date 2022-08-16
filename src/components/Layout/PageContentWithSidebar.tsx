import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageContentWithSidebarProps = {
    children: ReactNode;
};

const PageContentWithSidebar: React.FC<PageContentWithSidebarProps> = ({
    children,
}) => {
    return (
        <Flex justify="center" p="16px 0px">
            <Flex width="95%" justify="left">
                {/* LHS */}
                <Flex
                    direction="column"
                    display={{ base: "none", md: "flex" }}
                    mr={{ base: 0, md: 6 }}
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>
                {/* RHS */}
                <Flex direction="column" width="100%">
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    );
};
export default PageContentWithSidebar;
