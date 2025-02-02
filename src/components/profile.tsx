import { useContext } from "react";
import { Context } from "../App";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { backgroundStyle } from "./style";


export default () => {
  const [user] = useContext(Context);
  return (<>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"

    >
      <Card
        sx={{
          borderRadius: 3,
          textAlign: "center",
          padding: 2,
          ...backgroundStyle
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            {user.firstName ? `${user.firstName} ${user.lastName}` : "User Details"}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            📍 {user.address || "No Address Provided"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            📧 {user.email}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            📞 {user.phone || "No Phone Number"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </>)
}