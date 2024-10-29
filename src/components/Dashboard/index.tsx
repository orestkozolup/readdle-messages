import Grid from "@mui/material/Grid2";

import MessageListSidebar from "../MessageListSidebar";
import MessageViewer from "../MessageViewer";

const Dashboard = () => (
  <Grid container spacing={2}>
    <Grid size={{ sm: 5, md: 4, lg: 3 }}>
      <MessageListSidebar />
    </Grid>
    <Grid size={{ sm: 7, md: 8, lg: 9 }}>
      <MessageViewer />
    </Grid>
  </Grid>
);

export default Dashboard;
