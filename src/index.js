import React from "react";
import { render } from "react-dom";

import axios from "axios";
import { Search } from "./components/Search";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  renderImageList(list) {
    const imageList = list.map((url) => {
      return (
        <li className="item">
          <img className="image" src={url} />
        </li>
      );
    });
    return <ul className="list">{imageList}</ul>;
  }

  render() {
    return (
      <div>
        <Search giphyApi={this.giphyApi} />
        {this.renderImageList(this.state.gifUrlList)}
      </div>
    );
  }

  giphyApi = (title) => {
    //　　リクエスト先のURLを作る
    const search = title;
    const key = "HPTQwI1TLOFAVnGY3tY6gJu45sAJXRw1";
    const limit = 40;

    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    // axiosでリクエストをする
    axios.get(url).then((res) => {
      const data = res.data.data;
      const imageUrlList = data.map((item) => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  };
}

render(<App />, document.getElementById("root"));
