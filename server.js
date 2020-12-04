const { execSync } = require("child_process");
const fs = require("fs");
const http = require("http");

const hostname = "0.0.0.0";
const port = process.env.PORT || 4040;

const compileSync = (options) => {
  let command = "ls";
  switch (options.lang) {
    case "c":
      command = `gcc -O2 -lm -fomit-frame-pointer -pthread  ${options.codeFile} -o ${options.compiledFile}`;
      break;
    case "cpp":
      command = `g++ -O3 -std=c++1y -fomit-frame-pointer -pthread ${options.codeFile} -o ${options.compiledFile}`;
      break;
  }

  // compile
  execSync(command, { timeout: 5000 });
};

const runSync = (options) => {
  let command = "";
  switch (options.lang) {
    case "c":
    case "cpp":
      command = `${options.compiledFile} < ${options.inputFile}`;
      break;
    case "py":
      command = `python3 ${options.codeFile} < ${options.inputFile}`;
      break;
  }

  // compile
  const output = execSync(command, { timeout: 5000 });
  fs.writeFileSync(options.outputFile, output);

  return output;
};

const cleanupSync = (options) => {
  try {
    //cleanup
    fs.unlinkSync(options.codeFile);
    fs.unlinkSync(options.inputFile);
    fs.unlinkSync(options.outputFile);
    fs.unlinkSync(options.compiledFile);
  } catch (err) {}
};

const runCode = (id, code, lang, input, callback) => {
  const date = Date.now();
  const options = {
    lang,
    codeFile: `./submissions/${id}_${date}.${lang}`,
    inputFile: `./submissions/${id}_${date}.txt`,
    outputFile: `./submissions/${id}_${date}_output.txt`,
    compiledFile: `./submissions/${id}_${date}`,
  };

  try {
    fs.writeFileSync(options.codeFile, code);
    fs.writeFileSync(options.inputFile, input);

    compileSync(options);
    const output = runSync(options);
    callback(null, output);
  } catch (err) {
    callback(err);
  } finally {
    cleanupSync();
  }
};

const codeHandler = (req, res) => {
  let data = "";

  const handleError = (err) => {
    // console.error(err);
    res.end(err.message || "Something went wrong!");
  };

  req
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      try {
        if (!data) throw { message: "No body found" };
        const body = JSON.parse(data);
        const { code, input = "", lang = "cpp" } = body;
        // const { userId } = req.user ?? {};
        // if (!userId) throw { message: "Unauthorized" };

        if (code) {
          runCode("randomabc", code, lang, input, (err, output) => {
            if (err) return handleError(err);
            res.end(output);
          });
        } else throw { message: "No code found" };
      } catch (err) {
        handleError(err);
      }
    });
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url === "/" && req.method === "POST") return codeHandler(req, res);

  const filePath = "./public" + (req.url == "/" ? "/index.html" : req.url);

  // Check if file specified by the filePath exists
  fs.access(filePath, function (err) {
    if (!err) {
      if (filePath.endsWith(".css"))
        res.writeHead(200, { "Content-Type": "text/css" });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("404!");
    }
  });
});

server.listen(port, hostname);
