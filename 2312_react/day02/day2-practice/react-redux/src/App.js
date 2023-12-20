import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, addToNum } from "./store/modules/counterStore";
import { useEffect } from "react";
import { fetchChannelList } from "./store/modules/channelStore";

function App() {
  const { count } = useSelector((state) => state.counter);
  const { channelList } = useSelector((state) => state.channel);
  const dispatch = useDispatch();
  //使用useEffect触发异步请求执行
  useEffect(() => {
    dispatch(fetchChannelList());
  }, [dispatch]);
  return (
    <div className="App">
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(addToNum(10))}>addTo10</button>
      <button onClick={() => dispatch(addToNum(20))}>addTo20</button>
      <ul>
        {channelList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
