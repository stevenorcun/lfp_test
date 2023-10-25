import { getBucket } from "../config/couchbase";
import { LeagueDTO } from "../dto/leagueDTO";
import { UsersLeagueDTO } from "../dto/userLeagueDTO";

interface LeagueServiceInterface {
  getUsersInLeague(leagueId: string): Promise<UsersLeagueDTO>;
  getUserById(userId: string): Promise<any>;
  createLeague(league: LeagueDTO): Promise<{ success: boolean }>;
  getLeagueById(leagueId: string): Promise<any>;
}

class LeagueService implements LeagueServiceInterface {
  async getLeagueById(leagueId: string) {
    const bucket = await getBucket();
    const leagueResults = await bucket.cluster.query(
      `SELECT * FROM \`mpg\` WHERE type = "mpg_league" AND id = "${leagueId}"`
    );
    return leagueResults.rows[0]?.mpg;
  }

  async getUsersInLeague(leagueId: string): Promise<UsersLeagueDTO> {
    const bucket = await getBucket();
    const leagueResults = await bucket.cluster.query(
      `SELECT * FROM \`mpg\` WHERE type = "mpg_league" AND id = "${leagueId}"`
    );
    const usersTeams = leagueResults.rows[0]?.mpg?.usersTeams || {};

    if (Object.keys(usersTeams).length > 0) {
      const usersInTeams = Object.keys(usersTeams);
      const promises = usersInTeams.map(async (user: string) => {
        return await this.getUserById(user);
      });

      const usersData = await Promise.all(promises);
      const result = usersData.map((user) => ({
        name: user?.name,
      })) as [{ name: string }];

      return { users: result };
    } else {
      return { users: [] };
    }
  }

  async getUserById(userId: string) {
    const bucket = await getBucket();
    const userResults = await bucket.cluster.query(
      `SELECT * FROM \`mpg\` WHERE type = "user" AND id = "${userId}"`
    );
    return userResults.rows[0]?.mpg;
  }

  async createLeague(league: LeagueDTO): Promise<{ success: boolean }> {
    const bucket = await getBucket();
    const collection = bucket.defaultCollection();

    const newLeague = {
      type: "mpg_league",
      ...league,
    };

    const result = await collection.insert(league.id, { newLeague });
    console.log(result);

    if (!result.cas && !result.token) return { success: false };

    return { success: true };
  }
}

export default LeagueService;
