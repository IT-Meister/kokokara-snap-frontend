// src/components/common/Tabs.tsx
import React from "react";
import { Tabs as MuiTabs, Tab } from "@mui/material";

interface TabsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabClick }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabClick(newValue);
  };

  return (
    <MuiTabs
      value={activeTab}
      onChange={handleChange}
      centered
      sx={{ marginTop: 3 }}
    >
      <Tab value="posts" label="ポスト" />
      <Tab value="favorites" label="お気に入り" />
    </MuiTabs>
  );
};

export default Tabs;
