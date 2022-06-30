import { useRef } from "react";
import useFetch from "../hooks/useFetch";
import "./styles.css";

export default function App() {
  const {
    sendFetch: sendFetch1,
    isLoading: isLoading1,
    data: data1,
    errorMessage: errorMessage1
  } = useFetch("https://catfact.ninja/fact", "GET");
  const {
    sendFetch: sendFetch2,
    isLoading: isLoading2,
    data: data2,
    errorMessage: errorMessage2
  } = useFetch("https://catfact.ninja/facttttttttttttttttttttt", "GET");
  const {
    sendFetch: sendFetch3,
    isLoading: isLoading3,
    data: data3,
    errorMessage: errorMessage3
  } = useFetch("https://jsonplaceholder.typicode.com/posts", "POST");

  // useRef for inputs
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const idRef = useRef(null);

  const onClick = async () => {
    try {
      await sendFetch1();
    } catch (err) {
      // handle error here
    }
  };

  const onClick2 = async () => {
    try {
      await sendFetch2();
    } catch (err) {
      // handle error here
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendFetch3({
        title: titleRef.current.value || "",
        body: bodyRef.current.value || "",
        userId: idRef.current.value || ""
      });
    } catch (err) {
      // handle error here
    }
  };

  return (
    <div className="App">
      <hr />

      {/* SUCCESS FETCH */}
      <button onClick={onClick}>Fetch data (SUCCESS)</button>
      {isLoading1 && <p>fetching...</p>}
      {data1 && <p>{JSON.stringify(data1)}</p>}
      {errorMessage1 && <p>{errorMessage1}</p>}
      <hr />

      {/* FAILED FETCH */}
      <button onClick={onClick2}>Fetch data (FAIL)</button>
      {isLoading2 && <p>fetching...</p>}
      {data2 && <p>{JSON.stringify(data2)}</p>}
      {errorMessage2 && <p>{errorMessage2}</p>}
      <hr />

      {/* POST METHOD */}
      <form onSubmit={onSubmit}>
        <label>title</label>
        <input ref={titleRef} type="text" />
        <br />
        <label>body</label>
        <input ref={bodyRef} type="text" />
        <br />
        <label>user id</label>
        <input ref={idRef} type="text" />
        <br />
        <button type="submit">POST DATA</button>
        {isLoading3 && <p>fetching...</p>}
        {data3 && <p>{JSON.stringify(data3)}</p>}
        {errorMessage3 && <p>{errorMessage3}</p>}
      </form>
      <hr />
    </div>
  );
}
