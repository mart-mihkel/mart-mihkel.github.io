import { HashRouter, Route } from "@solidjs/router";
import Home from "./pages/Home";
import Post from "./pages/Post";

function App() {
  return (
    <HashRouter>
      <Route path="/" component={Home} />
      <Route path="/:slug" component={Post} />
    </HashRouter>
  );
}

export default App;
