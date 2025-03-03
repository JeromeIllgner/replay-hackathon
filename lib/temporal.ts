import { Client, Connection } from "@temporalio/client";

export async function connectToTemporal() {
  return new Client({
    connection: await Connection.connect({
      address: process.env.TEMPORAL_SERVER,
      tls: {
        clientCertPair: {
          crt: Buffer.from(process.env.TEMPORAL_CLOUD_CERT ?? ""),
          key: Buffer.from(process.env.TEMPORAL_CLOUD_KEY ?? ""),
        },
      },
    }).catch((err) => {
      return undefined;
    }),
    namespace,
  });
}

export const namespace = process.env.TEMPORAL_NAMESPACE || "default";
