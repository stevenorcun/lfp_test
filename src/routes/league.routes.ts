import express, { Request, Response, Router } from "express";
import LeagueService from "../services/league.services";
import { leagueSchema } from "../schemas/leagueSchema";

const router: Router = express.Router();
const leagueService = new LeagueService();

/**
 * @swagger
 * /lfp/leagues/{leagueId}:
 *  get:
 *    description: Get users in a league by ID
 *    parameters:
 *      - in: path
 *        name: leagueId
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the league to retrieve users from
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  userId:
 *                    type: string
 *                  username:
 *                    type: string
 *      '404':
 *        description: League not found
 *      '500':
 *        description: Internal Server Error
 */
router.get("/:leagueId", async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;
    const data = await leagueService.getUsersInLeague(leagueId);
    return res.status(200).send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

/**
 * @swagger
 * /lfp/leagues:
 *  post:
 *    description: Create a new league
 *    requestBody:
 *      description: League data to create
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              adminId:
 *                type: string
 *            required:
 *              - id
 *              - name
 *              - description
 *              - adminId
 *    responses:
 *      '201':
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                leagueId:
 *                  type: string
 *                message:
 *                  type: string
 *      '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      '409':
 *        description: Conflict
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *      '500':
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const league = req.body;

    const { error } = leagueSchema.validate(league);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const result = await leagueService.createLeague(league);

    res.status(201).send({ ...result, message: "League created" });
  } catch (error) {
    if (error?.name === "DocumentExistsError") {
      return res.status(409).send({ error: "Id League already exists" });
    }
    return res.status(500).send({ error });
  }
});

export default router;
