// import connectDB from "./config/db.js";
// import app from "./app.js";
// try {
//     await connectDB();
//     const PORT = process.env.PORT;
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// } catch (error) {
//     console.log("Error occured !");
//     process.exit(1);
// }

import dns from "dns";
import connectDB from "./config/db.js";
import app from "./app.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

try {
    await connectDB();
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.log("Error occurred!");
    process.exit(1);
}
