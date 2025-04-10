import { App } from "./src/servers/index.js";

// setup port no
const PORT = process.env.PORT || 8100;

// start server and listen on port
App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}`);
});
