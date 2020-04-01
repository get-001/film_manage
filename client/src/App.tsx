import React from "react";
import { MovieService } from "./services/MovieService";

function App() {
  MovieService.add({
    name: "xxx",
    types: ["动作"],
    timeLong: 80,
    isHot: true,
    isClassic: false,
    areas: ["中国大陆"]
  }).then(resp => console.log(resp));
  MovieService.edit("5e81993a756ebc261cec3916", {
    name: "xxx",
    timeLong: 233
  }).then(resp => console.log(resp));
  MovieService.delete("5e7f7201f4a8992804b8c824").then(resp =>
    console.log(resp)
  );
  MovieService.getById("5e81993a756ebc261cec3916").then(resp =>
    console.log(resp)
  );
  MovieService.get({
    page: 11
  }).then(resp => console.log(resp));

  return <div className="App">132</div>;
}

export default App;
