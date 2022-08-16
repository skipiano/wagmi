import React, { useEffect, useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiFile3Line, RiGroupLine } from "react-icons/ri";
import { VscComment } from "react-icons/vsc";
import { BiDollar, BiSidebar, BiWallet } from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IconType } from "react-icons";
import { Flex, Icon } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { sidebarState } from "../../atoms/sidebarAtom";
import BarItem from "./BarItem";

type SidebarItemsProps = {
    sidebarType: "Profile" | "Settings" | "Admin" | "Ads" | "Subcommunity";
};

export type SidebarItem = {
    icon: IconType;
    title: string;
    height: string;
};

const SidebarItems: React.FC<SidebarItemsProps> = ({ sidebarType }) => {
    const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
    const [selectedTab, setSelectedTab] = useRecoilState(sidebarState);

    const getSidebarItemList = () => {
        switch (sidebarType) {
            case "Profile":
                setSidebarItems([
                    {
                        icon: CgProfile,
                        title: "Overview",
                        height: "20px",
                    },
                    {
                        icon: RiFile3Line,
                        title: "Posts",
                        height: "20px",
                    },
                    {
                        icon: VscComment,
                        title: "Comments",
                        height: "20px",
                    },
                    {
                        icon: BsBookmark,
                        title: "Saved",
                        height: "18px",
                    },
                ]);
                setSelectedTab({ tab: "Overview" });
                break;
            case "Settings":
                setSidebarItems([
                    {
                        icon: CgProfile,
                        title: "General",
                        height: "20px",
                    },
                    {
                        icon: BiWallet,
                        title: "Linked Wallets",
                        height: "20px",
                    },
                    {
                        icon: IoNotificationsOutline,
                        title: "Notifications",
                        height: "20px",
                    },
                ]);
                setSelectedTab({ tab: "General" });
                break;
            case "Admin":
                setSidebarItems([
                    {
                        icon: BiSidebar,
                        title: "Subcommunities",
                        height: "20px",
                    },
                    {
                        icon: RiGroupLine,
                        title: "Roles",
                        height: "20px",
                    },
                    {
                        icon: BiDollar,
                        title: "Community Rewards",
                        height: "20px",
                    },
                ]);
                setSelectedTab({ tab: "Subcommunities" });
                break;
        }
    };

    useEffect(() => {
        getSidebarItemList();
    }, []);

    return (
        <Flex direction="column" mt={1} gap={2}>
            {sidebarItems.map((item) => (
                <BarItem
                    key={item.title}
                    item={item}
                    selected={item.title === selectedTab.tab}
                />
            ))}
        </Flex>
    );
};
export default SidebarItems;
