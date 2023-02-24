import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { DataContext } from "../utils/ContextFile";
import {
  FormControl,
  Badge,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import Loader from "./Loader";
import { currency } from "../utils/api_supported_currency";
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const CoinList = () => {
  const { coinsData, getCoinsDataByCountry, isDataAvail, searchCoins } =
    useContext(DataContext);
  let newArray = [];
  localStorage.setItem("watchList", JSON.stringify(newArray));
  const addToWatchList = (item) => {
    newArray = [...JSON.parse(localStorage.getItem("watchList")), item];
    localStorage.setItem("watchList", JSON.stringify(newArray));
  };

  const [currencyType, setCurrencyType] = useState("usd");
  const [searchQuery, setSearchQuery] = useState("");

  const onClickSearch = async (e) => {
    e.preventDefault();
    await searchCoins(searchQuery);
  };
  const onChangingCurrency = async (e) => {
    setCurrencyType(e.target.value);
    await getCoinsDataByCountry(e.target.value);
  };

  return (
    <>
      <Grid item xs={12} md={6}>
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
          Coin-Market Place
        </Typography>
        <div className="d-flex justify-content-around mt-5">
          <form className="form-inline my-2 my-lg-0 w-50">
            <input
              className="form-control form-control-lg mr-sm-2 w-75"
              type="search"
              placeholder="Search Your Coin (eg. bitcoin)"
              aria-label="Search"
              name="searchQuery"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              value={searchQuery}
            />
            <button
              className="btn btn-lg btn-outline-primary my-2 my-sm-0"
              type="submit"
              onClick={(e) => {
                onClickSearch(e);
              }}
            >
              Get Coin
            </button>
          </form>
          <FormControl style={{ width: "30%" }}>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Currency"
              defaultValue="usd"
              onChange={(e) => {
                onChangingCurrency(e);
              }}
            >
              {currency &&
                currency.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item}>
                      {item.toUpperCase()}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </div>

        <Demo>
          {isDataAvail ? (
            <Loader />
          ) : (
            <List className="mt-3 p-5 rounded list">
              {coinsData &&
                coinsData.map((item, i) => (
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

                        <Badge
                          className="mx-3"
                          badgeContent={currencyType.toUpperCase()}
                          color="primary"
                        ></Badge>
                        <IconButton
                          edge="end"
                          color="default"
                          className="mx-2"
                          onClick={() => {
                            addToWatchList(i);
                          }}
                        >
                          <BookmarkBorderIcon />
                        </IconButton>
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
          )}
        </Demo>
      </Grid>
    </>
  );
};

export default CoinList;
