import { useRef, useState } from "react";

function IDE() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const codeRef = useRef(null);
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const handleSubmit = () => {
    setLoading(true);
    fetch(
      process.env.NODE_ENV === "development" ? "http://localhost:4040" : "/",
      {
        method: "POST",
        body: JSON.stringify({
          code: codeRef.current.value,
          input: inputRef.current.value,
          lang: selectRef.current.value,
        }),
      }
    )
      .then((res) => res.text())
      .then((text) => {
        setOutput(text);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const textAreaClassName = `
    resize-none
    font-mono
    text-2xl
    focus:outline-none 
    focus:ring-2
    focus:ring-gray-200 
    focus:border-transparent 
    shadow-md 
    rounded-md 
    p-4 
    w-full 
    flex
  `;

  const buttonClassName = `
    self-center
    bg-blue-100
    py-1
    px-4
    rounded-lg
    shadow-lg
    ring-2
    ring-blue-300
    focus:outline-none
    focus:shadow-none
  `;

  const selectionClassName = `
    self-center
    bg-red-100
    py-1
    px-4
    rounded-lg
    ring-2
    ring-green-300
    focus:outline-none
    focus:shadow-lg
  `;

  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="flex flex-col space-y-2 m-8 ">
        <p className="text-2xl font-bold text-green-400 p-2">Code:</p>
        <textarea
          className={textAreaClassName + "flex-grow"}
          ref={codeRef}
          placeholder="Code"
          defaultValue="print('Hello World!')"
        />
      </div>
      <div className="flex flex-col m-8 space-y-8">
        <div className="flex flex-col h-2/5 space-y-2">
          <p className="text-2xl font-bold text-green-400 p-2">Input:</p>
          <textarea
            className={textAreaClassName + "flex-grow"}
            ref={inputRef}
            placeholder="Input"
          />
        </div>
        <div className="flex space-x-4 self-center items-center">
          <select className={selectionClassName} ref={selectRef}>
            <option value="py">Python 3.6.8</option>
            <option value="cpp">C++ 14</option>
            <option value="c">C</option>
          </select>
          {loading ? (
            <p className="text-gray-300">Loading...</p>
          ) : (
            <button className={buttonClassName} onClick={handleSubmit}>
              Run
            </button>
          )}
        </div>
        <div className="flex flex-col flex-grow space-y-2">
          <p className="text-2xl font-bold text-green-400 p-2">Output:</p>
          <textarea
            className={textAreaClassName + "flex-grow"}
            value={output}
            readOnly={true}
            placeholder="Output"
          />
        </div>
      </div>
    </div>
  );
}

export default IDE;
