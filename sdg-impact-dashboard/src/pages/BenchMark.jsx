import { Paper, Typography } from "@mui/material"

export default function Benchmark() {

    const institutionalData =[
        { university: "Daystar University", impactScore: 85, sdgCoverage: 12 },
        { university: "MelWater University", impactScore: 78, sdgCoverage: 10 },
        { university: "ValleyBridge University", impactScore: 90, sdgCoverage: 14 },
        { university: "ModernWake University", impactScore: 65, sdgCoverage: 8 },
        { university: "GreenField University", impactScore: 82, sdgCoverage: 11 },
    ]
    return (
        <>
        <Paper
        sx ={{ 
            padding: 2, 
            margin: 2 }}
        position="absolute">
            <Typography variant="h4" component="h1" gutterBottom>
                    BenchMark
            </Typography>
            <Typography variant="body1">
                A display of benchmark data and analytics of daystar University against other universities in various SDG initiatives.
            </Typography>
            
        </Paper>
        </>
    )
}