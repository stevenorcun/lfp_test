import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import envVariables from "./config/env.variables";
import { initializeCluster } from "./config/couchbase";
import leagueRoutes from "./routes/league.routes";
import teamRoutes from "./routes/team.routes";
import { swaggerSpec } from "./swagger/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeCluster();

app.use("/lfp/leagues", leagueRoutes);
app.use("/lfp/teams", teamRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// not found route
app.use((req: Request, res: Response) => {
  res.status(404).send("Route Not found");
});

app.listen(envVariables.port, () => {
  console.log(`Server is listening on port ${envVariables.port}`);
});
