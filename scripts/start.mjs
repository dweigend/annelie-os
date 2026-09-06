process.env.HOST ||= "127.0.0.1";
process.env.PORT ||= "3000";
process.env.ORIGIN ||= `http://127.0.0.1:${process.env.PORT}`;
process.env.BODY_SIZE_LIMIT ||= "1M";
await import("../build/index.js");
