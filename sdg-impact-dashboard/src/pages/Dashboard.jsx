import { Container } from "@mui/material"
import SideMenu from "../components/SideMenu"
import TopNavigation from "../components/TopNavigation"
import { useState } from "react"

export default function Dashboard() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Container color="white" maxWidth={false} disableGutters={true}>
            <TopNavigation onMenuClick={() => setIsDrawerOpen((prev) => !prev)} />
            <SideMenu open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </Container>
    )
}