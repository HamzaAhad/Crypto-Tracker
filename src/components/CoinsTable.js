import React from "react";
import { useState, useEffect } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  makeStyles
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
// import numberWithCommas from "../components/Banner/Carousel";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [search, setSearch] = useState(" ");
  //pagination
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  // const currency = "USD";

  // using coins list API
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  // console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    }
  });
  const handleSearch = () => {
    // this function will filter out the searched coins if not found will return all the coins
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111"
      },
      fontFamily: "Montserrat"
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold"
      }
    }
  }));

  // console.log(`handlesearch${handleSearch()}`);

  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
          <TextField
            label="Search for Crypto Currency.."
            variant="outlined"
            style={{ marginBottom: 20, width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TableContainer>
            {/* //if loading then LinearProgress bar else create table*/}
            {loading ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table>
                {/* Table Head */}
                <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                  <TableRow>
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat"
                          }}
                          key={head}
                          align={head === "Coin" ? " " : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                    ;
                  </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody>
                  {/* {handleSearch().map((row) => {
                    return <div>{row.name}</div>;
                  })} */}
                  {/* <div>{handleSearch().name}</div> */}

                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24th > 0;

                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          className={classes.row}
                          key={row.name}
                        >
                          {/* The detail cell */}
                          <TableCell
                            component="th"
                            scope="row"
                            // style={{
                            //   display: "flex",
                            //   gap: 15
                            // }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "block",
                                flexpirection: "column"
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                  display: "block"
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span
                                style={{ color: "darkgrey", display: "block" }}
                              >
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          {/* The price cell */}
                          <TableCell align="right">
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          {/* The 24h Change */}
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          {/* The market cap */}
                          <TableCell align="right">
                            {symbol}
                            {""}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
            classes={{ ul: classes.pagination }}
            count={(handleSearch()?.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
}
