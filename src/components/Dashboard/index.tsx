import Grid from "@mui/material/Grid2";

import MessageListSidebar from "../MessageListSidebar";
import MessageViewer from "../MessageViewer";

const Dashboard = () => (
  <Grid container spacing={2}>
    <Grid size={3}>
      <MessageListSidebar />
    </Grid>
    <Grid size={9}>
      <MessageViewer />
    </Grid>
  </Grid>
);

export default Dashboard;
