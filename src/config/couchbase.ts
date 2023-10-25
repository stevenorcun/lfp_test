import { Cluster, connect, Bucket } from "couchbase";
import envVar from "./env.variables";

let clusterInstance: Cluster;

export async function initializeCluster() {
  if (!clusterInstance) {
    try {
      clusterInstance = await connect("couchbase://localhost", {
        username: envVar.couchbaseUsername,
        password: envVar.couchbasePassword,
      });

      console.log("Couchbase connected");
    } catch (error) {
      console.error("Error connection couchbase ", error);
    }
  }
  return clusterInstance;
}

export async function getBucket(): Promise<Bucket> {
  const cluster = await initializeCluster();
  const bucket = await cluster.bucket("mpg");

  return bucket;
}
