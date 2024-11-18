
import { Context } from "@netlify/functions";

export default async (req, context) => {
    console.log("Starting background task...");
    await new Promise(resolve => setTimeout(resolve, 10000));  // Mock long task
    console.log("Background Task Complete");
};
