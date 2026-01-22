import { useRef, useState } from "react";

function ControlledInput() {
  // This state can be either react useState
  // or redux useSelector state
  // or signal variable
  // or props passed to this component
  const [controlled_value, setInputValue] = useState("");

  const handleChange = (e) => {
    console.log("getting change value", e.target.value);
    setInputValue(e.target.value);
  }

  // How do I make sure this component is controllable?
  // Answer: Any change made to "controlled_value" state variable, 
  //         will change the display on this input box, and hence can
  //         be controlled from anywhere programatically.

  return <>
    <input
      placeholder="controlled one"
      type="text"
      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"

      // {/** This is needed for controlling an input */}
      onChange={handleChange}
      value={controlled_value}
    ></input>
    <button onClick={(e) => { e.preventDefault(); setInputValue(Math.random()) }}>Random</button>
  </>
}

function UncontrolledInput() {
  const inputRef = useRef(null);

  // why is this component not controlled?
  // Answer: I cannot set a value using pure javascript to this
  //         input box. I can still use ref.current.innerHtml to 
  //         set some value, but that is not something auto controlled

  const handleReadValue = (e) => {
    e.preventDefault();
    console.log("getting input value", inputRef.current.value);
  }

  return <div>
    <input
      placeholder="un controlled one"
      type="text"
      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"

      // {/** This is needed for and uncontrolled input */}
      ref={inputRef}
    ></input>
    <hr></hr>
    <button onClick={handleReadValue}>Read Value in JS</button>
  </div>
}

function PartialControlledInput() {
  // This state can be either react useState
  // or redux useSelector state
  // or signal variable
  // or props passed to this component
  const [controlled_value, setInputValue] = useState("");

  const handleChange = (e) => {
    console.log("getting change value", e.target.value);
    setInputValue(e.target.value);
  }

  // How do I make sure this component is controllable?
  // Answer: Any change made to "controlled_value" state variable, 
  //         will change the display on this input box, and hence can
  //         be controlled from anywhere programatically.

  return <>
    <input
      placeholder="partial valued input one"
      type="text"
      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"

      // {/** This is needed for controlling an input */}
      value={controlled_value}
    ></input>
    <input placeholder="controlling one"
      type="text"
      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"

      onChange={handleChange}
    ></input>
  </>
}

function PartialControlledDisplayInput() {
  // This state can be either react useState
  // or redux useSelector state
  // or signal variable
  // or props passed to this component
  const [controlled_value, setInputValue] = useState("");

  const handleChange = (e) => {
    console.log("getting change value", e.target.value);
    setInputValue(e.target.value);
  }

  // How do I make sure this component is controllable?
  // Answer: Any change made to "controlled_value" state variable, 
  //         will change the display on this input box, and hence can
  //         be controlled from anywhere programatically.

  return <>
    <input
      placeholder="partial capture only"
      type="text"
      className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"

      // {/** This is needed for controlling an input */}
      onChange={handleChange}
    ></input>
    <br></br>
    <p>Selected Input Value is : {controlled_value}</p>
  </>
}

export { ControlledInput, UncontrolledInput, PartialControlledInput, PartialControlledDisplayInput };