import express from "express";
import TeamService from "../services/team.services";

const router = express.Router();
const teamService = new TeamService();

/**
 * @swagger
 * /lfp/teams/{teamID}:
 *  patch:
 *    description: Update the name of a team by ID
 *    parameters:
 *      - in: path
 *        name: teamID
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the team to update
 *    requestBody:
 *      description: Team data to update
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *            required:
 *              - name
 *    responses:
 *      '200':
 *        description: OK
 *      '400':
 *        description: Bad Request
 *      '404':
 *        description: Team not found
 *      '500':
 *        description: Internal Server Error
 */
router.patch("/:teamId", async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Name is required" });
    }

    const teamExists = await teamService.getTeamById(teamId);

    if (!teamExists) return res.status(404).send({ error: "Team not found" });

    const result = teamService.modifyTeam(teamId, name);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;
