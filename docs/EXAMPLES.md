# Example: Using SurfSense Packages in Your Project

This directory contains examples of how to use SurfSense packages published to GitHub Packages.

## Example 1: Using Docker Images

### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    image: ghcr.io/hhongli1979-coder/surfsense_backend:latest
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://user:pass@postgres:5432/db
      REDIS_URL: redis://redis:6379/0

  frontend:
    image: ghcr.io/hhongli1979-coder/surfsense_web:latest
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8000
```

### Commands

```bash
# Authenticate
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Pull and start
docker-compose pull
docker-compose up -d
```

## Example 2: Using NPM Packages

### package.json

```json
{
  "name": "my-surfsense-app",
  "version": "1.0.0",
  "dependencies": {
    "@hhongli1979-coder/surfsense-web": "^0.0.8",
    "react": "^19.0.0",
    "next": "^15.0.0"
  }
}
```

### .npmrc

```
@hhongli1979-coder:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### Usage in Code

```typescript
// Import SurfSense components
import { SearchComponent } from '@hhongli1979-coder/surfsense-web';

function MyApp() {
  return (
    <div>
      <SearchComponent />
    </div>
  );
}

export default MyApp;
```

### Commands

```bash
# Install dependencies
npm install

# Or with pnpm
pnpm install
```

## Example 3: Using in CI/CD

### GitHub Actions

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Login to GitHub Packages
        run: |
          echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin
      
      - name: Pull SurfSense images
        run: |
          docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest
          docker pull ghcr.io/hhongli1979-coder/surfsense_web:latest
      
      - name: Run tests
        run: |
          docker-compose up -d
          npm test
```

## Example 4: Pinning to Specific Version

### Using Specific Docker Tag

```yaml
services:
  backend:
    # Use specific version
    image: ghcr.io/hhongli1979-coder/surfsense_backend:v0.0.8
    
    # Or use minor version (auto-updates patches)
    # image: ghcr.io/hhongli1979-coder/surfsense_backend:v0.0
```

### Using Specific NPM Version

```json
{
  "dependencies": {
    "@hhongli1979-coder/surfsense-web": "0.0.8"
  }
}
```

## Example 5: Development Workflow

### Local Development with Published Packages

```bash
# Create project directory
mkdir my-surfsense-project
cd my-surfsense-project

# Authenticate
./path/to/surfsense/scripts/setup-github-packages.sh

# Create docker-compose.yml (see Example 1)
# Download the example file from the repository
wget -O docker-compose.yml https://raw.githubusercontent.com/MODSetter/SurfSense/main/docs/docker-compose.github-packages.yml
# Or copy from local docs/docker-compose.github-packages.yml if you have the repo cloned

# Start services
docker-compose up -d

# Develop your application
# Services are now available at:
# - Backend: http://localhost:8000
# - Frontend: http://localhost:3000
```

## Example 6: Production Deployment

### Using Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: surfsense-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: surfsense-backend
  template:
    metadata:
      labels:
        app: surfsense-backend
    spec:
      imagePullSecrets:
        - name: ghcr-secret
      containers:
      - name: backend
        image: ghcr.io/hhongli1979-coder/surfsense_backend:v0.0.8
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

### Create Image Pull Secret

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_USERNAME \
  --docker-password=$GITHUB_TOKEN \
  --docker-email=your-email@example.com
```

## Example 7: Monorepo Setup

### Using Packages in a Monorepo

```
my-monorepo/
├── apps/
│   ├── web/          (uses @hhongli1979-coder/surfsense-web)
│   └── mobile/
├── packages/
│   └── shared/
├── package.json
└── .npmrc
```

### Root .npmrc

```
@hhongli1979-coder:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### apps/web/package.json

```json
{
  "name": "@my-org/web",
  "dependencies": {
    "@hhongli1979-coder/surfsense-web": "^0.0.8",
    "@my-org/shared": "workspace:*"
  }
}
```

## Example 8: Testing Different Versions

### Testing Latest vs Stable

```bash
# Test with latest (main branch)
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:latest
docker run -p 8000:8000 ghcr.io/hhongli1979-coder/surfsense_backend:latest

# Test with stable version
docker pull ghcr.io/hhongli1979-coder/surfsense_backend:v0.0.8
docker run -p 8001:8000 ghcr.io/hhongli1979-coder/surfsense_backend:v0.0.8

# Compare results
```

## Troubleshooting Examples

### Authentication Issues

```bash
# Check if you're logged in
docker system info | grep Username

# Re-authenticate
docker logout ghcr.io
echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_USERNAME --password-stdin
```

### NPM Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Verify .npmrc
cat ~/.npmrc | grep github

# Test authentication
npm ping --registry=https://npm.pkg.github.com
```

### Version Conflicts

```bash
# List available versions
npm view @hhongli1979-coder/surfsense-web versions

# List Docker tags
docker pull ghcr.io/hhongli1979-coder/surfsense_backend --all-tags
```

## Additional Resources

- [GitHub Packages Documentation](../docs/GITHUB_PACKAGES.md)
- [CI/CD Documentation](../docs/CI_CD.md)
- [Quick Reference Guide](../docs/QUICK_REFERENCE.md)
- [Docker Compose Example](../docs/docker-compose.github-packages.yml)

## Need Help?

- Check the [Troubleshooting section](../docs/GITHUB_PACKAGES.md#troubleshooting) in the main guide
- Open an issue on GitHub
- Ask in the Discord channel

---

**Note**: Replace `YOUR_USERNAME` and `YOUR_GITHUB_TOKEN` with your actual GitHub credentials.
