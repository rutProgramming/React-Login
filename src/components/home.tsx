import { Container, Grid2 as Grid, Typography } from "@mui/material";
const Home = () => {

    return (
        <Container maxWidth="md">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: "100vh", textAlign: "center" }}
                sx={{
                    color: "#a9643b", 
                }}
            >
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Cook. Savor. Share.
                </Typography>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                    A Place Where Every Meal Tells a Story!
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Explore delicious recipes, try new flavors, and share your creations with food lovers worldwide.
                </Typography>
            </Grid>
        </Container>
    );
}
export default Home