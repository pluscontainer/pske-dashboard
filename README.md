# PSKE Dashboard

Standalone copy of [gardener/dashboard](https://github.com/gardener/dashboard) with customizations for PSKE.

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
git cherry-pick 41641336  # Cleanup upstream + PSKE release workflow
git cherry-pick 1e194fca  # pluscloudopen OpenStack provider + logo
git cherry-pick 58794f50  # PDB + podAntiAffinity
git cherry-pick 1b2ae8b7  # Remove unused UI components
git cherry-pick 69601441  # Cilium as default network type
git cherry-pick f7f81ebd  # Remove Credential Rotation from menu

# 4. Push and create PR
git push origin release/pske-1.85.0
# → Create PR to main

# 5. After merge: Create tag
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

## Local Development

```bash
yarn install
yarn dev
```

## PSKE Customizations

| Commit | Description |
|--------|-------------|
| `41641336` | Cleanup upstream files + PSKE release workflow |
| `1e194fca` | Provider "pluscloudopen" for OpenStack + logo |
| `58794f50` | PDB + podAntiAffinity in Helm chart |
| `1b2ae8b7` | Remove unused UI components (CredentialRotation, Quota, HA Control Plane, Addons) |
| `69601441` | Cilium as default network type |
| `f7f81ebd` | Remove Credential Rotation from menu |
| `cebf8fa8` | Remove Add-ons section from cluster details |
