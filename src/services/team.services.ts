import { getBucket } from "../config/couchbase";

interface TeamServiceInterface {
  modifyTeam(teamId: string, name: string): Promise<{ success: boolean }>;
  getTeamById(teamId: string): Promise<any>;
}

class TeamService implements TeamServiceInterface {
  async getTeamById(teamId: string): Promise<boolean> {
    const bucket = await getBucket();
    const teamResult = await bucket.cluster.query(
      `SELECT * FROM \`mpg\` WHERE type = "mpg_team" AND id = "${teamId}"`
    );

    return !!teamResult.rows[0]?.mpg;
  }

  async modifyTeam(
    teamId: string,
    name: string
  ): Promise<{ success: boolean }> {
    const bucket = await getBucket();
    const collection = bucket.defaultCollection();

    const newTeam = {
      type: "mpg_team",
      name,
      id: teamId,
    };

    const result = await collection.upsert(teamId, newTeam);

    if (!result.cas && result.token) return { success: false };

    return { success: true };
  }
}

export default TeamService;
