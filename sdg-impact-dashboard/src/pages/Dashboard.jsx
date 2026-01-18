import { Container, Box } from "@mui/material"
import SideMenu from "../components/SideMenu"
import TopNavigation from "../components/TopNavigation"
import { useState } from "react"
import MainContent from "../components/MainContent"
import { Outlet } from "react-router-dom"

const drawerWidth = 240;
const closedDrawerWidth = 72;


export default function Dashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Container color="white" maxWidth={false} disableGutters={true}>
            <SideMenu open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <Box
            sx={(theme) => ({
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            ml: isDrawerOpen ? `${drawerWidth}px` : `${closedDrawerWidth}px`,
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        })}
      >
        <TopNavigation onMenuClick={() => setIsDrawerOpen((prev) => !prev)} />
            <Outlet />
            </Box>
        </Container>
    )
}