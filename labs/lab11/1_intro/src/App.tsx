import { useEffect, useState } from "react";
import "./main.scss";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;

    //  implementați un efect care se rulează doar la prima desenare a componentei.
    if (count == 1) {
      console.log("counter is 1");
    }
  }, [count]);

  return (
    <div className="container">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
