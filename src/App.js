import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CoinPage from "./Pages/CoinPage";
import Homepage from "./Pages/Homepage";
import { makeStyles } from "@material-ui/core";
import { CryptoContext } from "./CryptoContext";
import { ErrorBoundary } from "react-error-boundary";

function ErrorHandler({ error }) {
  return console.log(`Error Handler: ${error}`);
}

export default function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: " white",
      minHeight: "100vh"
    }
  }));
  const classes = useStyles();
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <CryptoContext>
        <BrowserRouter>
          <div className={classes.App}>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CryptoContext>
    </ErrorBoundary>
  );
}
