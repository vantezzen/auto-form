"use client";
import { Card, CardContent, Typography, Container } from "@mui/material";
import Basics from "../components/Basics";

export default function Home() {
  return (
    <div>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              Auto Form demo
            </Typography>
            <Basics />
            {/* <Array /> */}
            {/* <Mantine /> */}
            {/* <Shadcn /> */}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
