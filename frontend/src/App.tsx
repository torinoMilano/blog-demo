import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import styles from "./App.module.css";
import './App.css';
import {Blogs} from "./features/blogs/Blogs";
import {Blog} from "./features/blog/Blog";

function App() {
  return (
      <Router>
        <div className={styles.app}>
          <header className={styles.header}>
            <nav>
                <Link className={styles.navLink} to="/">
                    🏠 Home
                </Link>
              <Link className={styles.navLink} to="/blogs">
                  📢 List of blogs
              </Link>
            </nav>
          </header>
        </div>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/blogs">
                  <Blogs />
              </Route>
              <Route path="/blog/:id" component={Blog} />
          </Switch>
      </Router>
  );
}

export default App;

function Home() {
    return (
        <main className="page">
            <h1>Welcome to Simple blog</h1>
        </main>
    );
}
