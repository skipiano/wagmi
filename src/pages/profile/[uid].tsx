import { Flex, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Sidebar from "../../components/Sidebar/Sidebar";
import { sidebarState } from "../../atoms/sidebarAtom";
import PageContentWithSidebarAndRightContent from "../../components/Layout/PageContentWithSidebarAndRightContent";
import AdLink from "../../components/RightContent/AdLink";
import PremiumLink from "../../components/RightContent/PremiumLink";
import ProfileOverview from "../../components/RightContent/ProfileOverview";
import OverviewPage from "../../components/Profile/OverviewPage";
import { useRouter } from "next/router";
import { firestore } from "../../firebase/clientApp";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export type KarmaContent = {
    voteStatus: number;
    userId: string;
};

export type User = {
    messageToSign?: string | null;
    createdAt: Timestamp;
    displayName: string;
    darkMode: boolean;
    isPremium: boolean;
    karma: number;
    karmaContent: [KarmaContent];
    isWeb3: boolean;
    claimedWAG: number;
    totalWAG: number;
    wallets: [string];
    nameService: string;
};

const Profile: React.FC = () => {
    const selectedTab = useRecoilValue(sidebarState);
    const router = useRouter();
    const [selectedUser, setSelectedUser] = useState<User>();

    const fetchUser = async (userId: string) => {
        try {
            const userDocRef = doc(firestore, "users", userId);
            const userDoc = await getDoc(userDocRef);
            setSelectedUser({ ...userDoc.data } as User);
        } catch (error: any) {
            console.log("fetchUser error", error);
        }
    };

    useEffect(() => {
        const { uid } = router.query;
        if (uid) {
            fetchUser(uid as string);
        }
    }, [router.query]);

    return (
        <PageContentWithSidebarAndRightContent>
            <Sidebar sidebarType="Profile" />
            <Flex
                bg="white"
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
            >
                {selectedTab.tab === "Overview" ? <OverviewPage /> : "Nohi"}
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
