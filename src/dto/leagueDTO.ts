export interface LeagueDTO {
  id: string;
  name: string;
  description: string;
  adminId: string;
  usersTeams?: {
    [userId: string]: string;
  };
}
