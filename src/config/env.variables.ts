import { config } from "dotenv";

config();

export default {
  port: process.env.PORT,
  couchbaseUsername: process.env.COUCHBASE_USRNAME || "admin",
  couchbasePassword: process.env.COUCHBASE_PASSWORD || "monpetitgazon",
  couchbaseBucket: process.env.COUCHBASE_BUCKET || "default",
  couchbaseURL: process.env.COUCHBASE_URL || "localhost:8091",
};
