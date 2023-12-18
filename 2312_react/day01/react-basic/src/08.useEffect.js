import { useEffect, useState } from "react";
const URL = "http://geek.itheima.net/v1_0/channels";

function App() {
  const [alist, setAlist] = useState([]);
  useEffect(() => {
    //额外的操作，获取频道列表
    async function getList() {
      const res = await fetch(URL);
      const jsonRes = await res.json();
      console.log(jsonRes);
      setAlist(jsonRes.data.channels);
    }
    getList();
  }, []);
  return (
    <div className="App">
      this is app
      <ul>
        {alist.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
