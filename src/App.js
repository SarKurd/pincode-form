import "./App.css";
import { useRef, useReducer } from "react";

function App() {
  const buttonRef = useRef();
  const [state, setState] = useReducer(
    (prev, updates) => ({ ...prev, ...updates }),
    {
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
    }
  );

  function handleSubmit(e) {
    e.preventDefault();

    let data = Object.values(state).join("");

    console.log(data);
  }

  function focusNextSibiling(element) {
    const nextElementSibling = element.nextElementSibling;

    if (nextElementSibling) {
      nextElementSibling.focus();
      nextElementSibling.select();
    } else {
      buttonRef.current.focus();
    }
  }

  function handleInputChange(event) {
    const element = event.target;

    if (Number(element.value) || element.value === "") {
      setState({
        [element.name]: element.value,
      });

      element.value && focusNextSibiling(element);
    }
  }

  function pasteHandler(event) {
    event.preventDefault();

    const pasteDataString = event.clipboardData
      .getData("text")
      .trim()
      .slice(0, 4);

    if (isNaN(parseInt(pasteDataString, 10))) {
      return;
    }

    const inputs = document.querySelectorAll(".form-inputs input");

    setState({
      pin1: pasteDataString[0] || "",
      pin2: pasteDataString[1] || "",
      pin3: pasteDataString[2] || "",
      pin4: pasteDataString[3] || "",
    });

    focusNextSibiling(inputs[pasteDataString.length - 1]);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <p>Enter the pincode or paste in</p>
        <div className="form-inputs">
          <input
            autoFocus
            autoComplete="off"
            type="password"
            name="pin1"
            maxLength="1"
            onPaste={pasteHandler}
            value={state.pin1}
            onInput={handleInputChange}
          />
          <input
            autoComplete="off"
            type="password"
            name="pin2"
            maxLength="1"
            value={state.pin2}
            onInput={handleInputChange}
          />
          <input
            autoComplete="off"
            type="password"
            name="pin3"
            maxLength="1"
            value={state.pin3}
            onInput={handleInputChange}
          />
          <input
            autoComplete="off"
            type="password"
            name="pin4"
            maxLength="1"
            value={state.pin4}
            onInput={handleInputChange}
          />
        </div>
        <button ref={buttonRef} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
