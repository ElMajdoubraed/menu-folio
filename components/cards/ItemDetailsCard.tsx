import {
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Card } from "@material-ui/core";
import ItemDetails from "@/types/item";
export default function ItemDetailsCard(props: ItemDetails) {
  return (
    <Card
      style={{
        minWidth: "100%",
        direction: "rtl",
        width: "100vh",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={props.imageMenu}>
            {props.nameMenu[0]}
          </Avatar>
        }
        title={props.name}
        subheader={props.nameCategory}
      />
      <CardMedia
        component="img"
        sx={{
          maxHeight: "500px",
        }}
        image={props.image}
        alt={props.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
