
import { Config, Context } from "@netlify/functions";

export default async (req, context) => {
    const { city, country } = context.params;
    console.log(`Requested city: ${city}, country: ${country}`);
    return new Response(`Location: ${city}, ${country}`);
};

export const config = {
    path: "/api/location/:city/:country",
};
