import { Router } from "express";
import { Request, Response } from "express";

const healthRoute = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: |
 *       Check the health status of the Edunovia API service.
 *       Returns current status, server timestamp, and uptime.
 *
 *       **Use Cases:**
 *       - Monitoring system health
 *       - Load balancer health checks
 *       - CI/CD pipeline health verification
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service is healthy and operational
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *             example:
 *               status: "OK"
 *               timestamp: "2024-01-15T10:30:00.000Z"
 *               uptime: 3600.5
 *       500:
 *         description: Service is unhealthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Service unavailable"
 *               error: "Database connection failed"
 */
healthRoute.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default healthRoute;
