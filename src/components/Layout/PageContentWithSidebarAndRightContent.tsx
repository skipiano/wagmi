import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageContentWithSidebarAndRightContentProps = {
    children: ReactNode;
};

const PageContentWithSidebarAndRightContent: React.FC<
    PageContentWithSidebarAndRightContentProps
> = ({ children }) => {
    return (
        <Flex justify="center" p="16px 0px">
            <Flex width="95%" justify="center">
                {/* LHS */}
                <Flex direction="column" display={{ base: "none", md: "flex" }}>
                    {children && children[0 as keyof typeof children]}
                </Flex>
                {/* MHS */}
                <Flex
                    direction="column"
                    width={{ base: "100%", xl: "60%" }}
                    mr={{ base: 0, md: 6 }}
                    ml={{ base: 0, md: 6 }}
                >
                    {children && children[1 as keyof typeof children]}
                </Flex>
                {/* RHS */}
                <Flex
                    direction="column"
                    display={{ base: "none", xl: "flex" }}
                    minWidth="250px"
                    flexGrow={1}
                >
                    {children && children[2 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    );
};
export default PageContentWithSidebarAndRightContent;
