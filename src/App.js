import { Router } from "@reach/router";
import styles from "./App.module.css";
import { Search, Character } from "./pages";

const App = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Search path="/" />
        <Character path="/character/:id" />
      </Router>
    </div>
  );
};

export default App;
