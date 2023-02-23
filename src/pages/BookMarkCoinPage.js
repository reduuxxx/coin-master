import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const BookMarkCoinPage = () => {
  const [watchListArray, setWatchListArray] = useState(undefined);
  useEffect(() => {
    let watch = JSON.parse(localStorage.getItem("watchList"));
    setWatchListArray(watch);
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        noWrap
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 900,
          letterSpacing: ".01rem",
          color: "purple",
        }}
      >
        Your Watch List :-
      </Typography>
      <Demo>
        <List className="mt-3 p-5 rounded list">
          {watchListArray &&
            watchListArray.map((item, i) => (
              <ListItem
                key={i}
                className="border mt-2 rounded rounded-lg shadow-md list-item"
                secondaryAction={
                  <>
                    <Chip
                      className="text-dark mx-3 font-weight-bold"
                      variant="outline"
                      label={item.current_price}
                    ></Chip>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar src={item && item.image}></Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={item && item.name}
                  secondary={item && item.symbol.toUpperCase()}
                />
              </ListItem>
            ))}
        </List>
      </Demo>
    </>
  );
};

export default BookMarkCoinPage;
