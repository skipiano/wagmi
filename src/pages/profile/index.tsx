import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Sidebar from "../../components/Sidebar/Sidebar";
import { sidebarState } from "../../atoms/sidebarAtom";
import PageContentWithSidebarAndRightContent from "../../components/Layout/PageContentWithSidebarAndRightContent";
import AdLink from "../../components/RightContent/AdLink";
import PremiumLink from "../../components/RightContent/PremiumLink";
import ProfileOverview from "../../components/RightContent/ProfileOverview";

const Profile: React.FC = () => {
    const selectedTab = useRecoilValue(sidebarState);

    return (
        <PageContentWithSidebarAndRightContent>
            <Sidebar sidebarType="Profile" />
            <Flex bg="white" borderRadius={5}>
                {selectedTab.tab === "Overview" ? "Hi" : "Nohi"}
            </Flex>
            <Stack spacing={5}>
                {selectedTab.tab !== "Overview" && <ProfileOverview />}
                <PremiumLink />
                <AdLink />
            </Stack>
        </PageContentWithSidebarAndRightContent>
    );
};
export default Profile;
