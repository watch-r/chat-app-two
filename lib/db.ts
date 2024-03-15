import { Redis } from "@upstash/redis";

export const database = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN!,
});
