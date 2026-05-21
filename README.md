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
git checkout -b release/pske-1.86.0 1.86.0

# 3. Cherry-pick PSKE commits
git cherry-pick 06b15c4b  # Cleanup upstream + PSKE release workflow
git cherry-pick 717533c8  # pluscloudopen OpenStack provider + logo
git cherry-pick 564e8876  # PDB + podAntiAffinity
git cherry-pick a897ba05  # Remove unused UI components
git cherry-pick b1498eae  # Remove Add-ons section from cluster details
git cherry-pick f895ceb4  # Update README
git cherry-pick 72dcee98  # Cilium as default network type
git cherry-pick 30211d6b  # Remove Credential Rotation from menu
git cherry-pick 0ba594c7  # Adding cherry-pick to readme.md
git cherry-pick 6463cec8  # Filter credentials by cloud profile label
git cherry-pick 53b58479  # Adding Cherry-Pick to README.md

# 4. Push and create PR
git push origin release/pske-1.86.0
# → Create PR to main

# 5. After merge: Create tag
git tag pske-1.86.0
git push origin pske-1.86.0
```

## Creating a Release

Pushing a tag triggers the GitHub Actions workflow:

```bash
git tag pske-1.86.0
git push origin pske-1.86.0
```

GitHub Actions builds and pushes:
- Image: `ghcr.io/pluscontainer/pske-dashboard:1.86.0`
- Chart: `oci://ghcr.io/pluscontainer/charts/pske-dashboard:1.86.0`
- Chart: `oci://ghcr.io/pluscontainer/charts/pske-dashboard-identity:1.86.0`

## Local Development

```bash
yarn install
yarn dev
```

## PSKE Customizations

| Commit | Description |
|--------|-------------|
| `06b15c4b` | Cleanup upstream files + PSKE release workflow |
| `717533c8` | Provider "pluscloudopen" for OpenStack + logo |
| `564e8876` | PDB + podAntiAffinity in Helm chart |
| `a897ba05` | Remove unused UI components (CredentialRotation, Quota, HA Control Plane, Addons) |
| `b1498eae` | Remove Add-ons section from cluster details |
| `72dcee98` | Cilium as default network type |
| `30211d6b` | Remove Credential Rotation from menu |
| `6463cec8` | Filter credentials by cloud profile label |
