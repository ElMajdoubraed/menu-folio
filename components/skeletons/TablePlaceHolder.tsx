import { Box } from "@material-ui/core";
import { Skeleton } from "@mui/material";
const TablePlaceHolder = () => {
  return (
    <Box
      sx={{
        width: "50%",
      }}
    >
      <Skeleton />
      <Skeleton variant="rectangular" height={60} />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton variant="rounded" height={60} />
    </Box>
  );
};

export default TablePlaceHolder;
