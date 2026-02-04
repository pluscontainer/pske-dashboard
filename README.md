# PSKE Dashboard

Standalone copy of [gardener/dashboard](https://github.com/gardener/dashboard) with customizations for pluscloud open.

## Setup

```bash
# Add upstream remote
git remote add upstream https://github.com/gardener/dashboard.git
```

## Branching Strategy

- `release/pske-x.y.z` - Release branches
- `feature/*` - Feature branches

All changes go through pull requests.

## Adopting a New Upstream Release

```bash
# 1. Fetch upstream
git fetch upstream --tags

# 2. Create release branch
git checkout -b release/pske-1.85.0 1.85.0

# 3. Cherry-pick PSKE commits
git cherry-pick 6e331d5d  # Release workflow (Image + Charts)
git cherry-pick 55184764  # pluscloudopen OpenStack provider
git cherry-pick 452f9ae3  # PDB + podAntiAffinity
git cherry-pick 65c3de1e  # Remove unused UI components
git cherry-pick 4f11535d  # Logo

# 4. Cleanup (upstream CI/CD, templates, etc.)
git cherry-pick 74523bed  # Cleanup unnecessary things

# 5. Push and create PR
git push origin release/pske-1.85.0
# → Create PR to main

# 6. After merge: Create tag
git tag pske-1.85.0
git push origin pske-1.85.0
```

## Creating a Release

Pushing a tag triggers the GitHub Actions workflow:

```bash
git tag pske-1.85.0
git push origin pske-1.85.0
```

GitHub Actions builds and pushes:
- Image: `ghcr.io/pluscontainer/pske-dashboard:1.85.0`
- Chart: `oci://ghcr.io/pluscontainer/charts/pske-dashboard:1.85.0`
- Chart: `oci://ghcr.io/pluscontainer/charts/pske-dashboard-identity:1.85.0`

## Using the Helm Charts

### Direct Installation

```bash
helm install pske-dashboard oci://ghcr.io/pluscontainer/charts/pske-dashboard --version 1.85.0
helm install pske-identity oci://ghcr.io/pluscontainer/charts/pske-dashboard-identity --version 1.85.0
```

### Wrapper Chart (recommended for ArgoCD)

Create a wrapper chart that references the PSKE charts as dependencies:

**Chart.yaml:**
```yaml
apiVersion: v2
name: pske-dashboard
description: PSKE Dashboard deployment
type: application
version: "1.85.0"
appVersion: "1.85.0"

dependencies:
  - name: pske-dashboard
    version: "1.85.0"
    repository: "oci://ghcr.io/pluscontainer/charts"
    alias: gardener-dashboard  # Maps values from gardener-dashboard: to pske-dashboard
```

The `alias: gardener-dashboard` allows you to keep existing values under the `gardener-dashboard:` key.

## Local Development

```bash
yarn install
yarn dev
```

The dashboard loads config from `~/.gardener/config.yaml`. Set `GARDENER_CONFIG` environment variable to use a custom config file.

## PSKE Customizations

| Commit | Description |
|--------|-------------|
| `6e331d5d` | Release workflow: Image + Helm Charts to GHCR |
| `55184764` | Provider "pluscloudopen" for OpenStack |
| `452f9ae3` | PDB + podAntiAffinity in Helm chart |
| `65c3de1e` | Removed UI components (CrdRotation, GQuota, GShootHAPlane, GCredentialEditing) |
| `4f11535d` | PCO Logo |
| `74523bed` | Cleanup upstream files |
