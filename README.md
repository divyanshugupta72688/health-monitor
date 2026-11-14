# Server Health Monitor

Small Node.js service that exposes a `/health` endpoint (uptime, CPU load, free memory), deployed on a Linux (Ubuntu, WSL2) environment with Docker and Nginx, with a CI/CD pipeline and a cron-based health check that auto-recovers the app.

## Architecture

```
git push -> GitHub Actions (build -> smoke test -> push to Docker Hub)

Client -> Nginx (:80) -> Docker container (:3000) -> Node/Express app
                              ^
                cron (every 5 min) -> health_check.sh -> restart on failure
```

## Tech stack
Node.js, Express, Docker, Nginx, Ubuntu (WSL2), GitHub Actions, Docker Hub, Shell scripting, cron

## What I implemented
- **App:** Express service with `/health` returning status, uptime, CPU load and free memory
- **Docker:** containerised the app with a Dockerfile (node:20-alpine)
- **Nginx:** reverse proxy from port 80 to the container on port 3000
- **CI/CD:** GitHub Actions workflow that builds the image, runs a smoke test on `/health`, and pushes the image to Docker Hub on every push to `main`
- **Monitoring:** `scripts/health_check.sh` checks the endpoint, restarts the container if it is down, and logs disk and memory usage; scheduled via cron every 5 minutes

## Run locally
```bash
docker build -t health-monitor .
docker run -d --name hm --restart always -p 3000:3000 health-monitor
curl localhost:3000/health
```

## Screenshots
**Health endpoint**
![health](screenshots/1-health.png)

**CI/CD pipeline passing**
![actions](screenshots/2-actions.png)

**Auto-recovery test** (container stopped, script restarted it)
![restart](screenshots/3-restart-test.png)

**Image on Docker Hub**
![dockerhub](screenshots/4-dockerhub.png)

## Docker image
`docker pull divyanshu72688/health-monitor:latest`