import { HashRouter, Route } from "@solidjs/router";
import Home from "./pages/Home";
import Post from "./pages/Post";
import WordlePage from "./pages/WordlePage";

function App() {
  return (
    <HashRouter>
      <Route path="/" component={Home} />
      <Route path="/:slug" component={Post} />
      <Route path="/wordle" component={WordlePage} />
    </HashRouter>
  );
}

export default App;
