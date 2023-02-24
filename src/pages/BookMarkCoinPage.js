import React, { useState, useEffect,useContext } from "react";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataContext } from "../utils/ContextFile";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const BookMarkCoinPage = () => {
  const { coinsData} =
    useContext(DataContext);
  const [watchListArray, setWatchListArray] = useState(undefined);
  
  useEffect(() => {
    let watch = JSON.parse(localStorage.getItem("watchList"));
    
    let filterArray=watch.filter((item, 
      index) => watch.indexOf(item) === index);
    console.log(filterArray)
    setWatchListArray(filterArray);
  }, []);

  const removeBookmark = (ele) => {
    let watch = JSON.parse(localStorage.getItem("watchList"));
    let filterArray = watch.filter((item) => item !== ele);
    localStorage.setItem("watchList", JSON.stringify(filterArray));
    setWatchListArray(filterArray);
  };
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
          {watchListArray&&watchListArray.length>0 ? 
            watchListArray.map((item, i) => (
              <ListItem
                key={i}
                className="border mt-2 rounded rounded-lg shadow-md list-item"
                secondaryAction={
                  <>
                    <Chip
                      className="text-dark mx-3 font-weight-bold"
                      variant="outline"
                      label={coinsData[item].current_price}
                    ></Chip>
                    <IconButton edge="end" color="default" className="mx-2">
                      <DeleteIcon
                        edge="end"
                        color="default"
                        className="mx-2"
                        onClick={()=>{
                          removeBookmark(item)
                        }}
                      />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar src={coinsData[item].image}></Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={item && coinsData[item].name}
                  secondary={item && coinsData[item].symbol.toUpperCase()}
                />
              </ListItem>
            )): <Typography
        variant="h6"
        noWrap
        sx={{
          mr: 2,
          mt:2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 900,
          letterSpacing: ".01rem",
          color: "red",
        }}
      >
        No item in watch list
      </Typography> }
        </List>
      </Demo>
    </>
  );
};

export default BookMarkCoinPage;
