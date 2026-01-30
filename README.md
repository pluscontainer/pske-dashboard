# PSKE Dashboard

Standalone copy of [gardener/dashboard](https://github.com/gardener/dashboard) with customizations for pluscloud open.

## Setup

```bash
# Upstream Remote hinzufügen
git remote add upstream https://github.com/gardener/dashboard.git
```

## Branching-Strategie

- `release/pske-x.y.z` - Release-Branches
- `feature/*` - Feature-Branches

Alle Änderungen gehen über Pull Requests.

## Neues Upstream-Release übernehmen

```bash
# 1. Upstream fetchen
git fetch upstream --tags

# 2. Release-Branch erstellen
git checkout -b release/pske-1.84.0 1.84.0

# 3. PSKE-Commits cherry-picken
git cherry-pick 55184764  # pluscloudopen OpenStack provider
git cherry-pick 452f9ae3  # PDB + podAntiAffinity
git cherry-pick 65c3de1e  # Remove unused UI components
git cherry-pick 4f11535d  # Logo

# 4. Cleanup (upstream CI/CD, templates, etc.)
git cherry-pick 74523bed  # CleanUp unnecessary things

# 5. Push und PR erstellen
git push origin release/pske-1.84.0
# → PR nach main erstellen

# 6. Nach Merge: Tag erstellen
git tag pske-1.84.0
git push origin pske-1.84.0
```

## Release erstellen

Ein Tag-Push triggert den GitHub Actions Workflow:

```bash
git tag pske-1.84.0
git push origin pske-1.84.0
```

Das Image wird gepusht nach: `ghcr.io/pluscontainer/pske-dashboard:1.84.0`

## Lokale Entwicklung

```bash
yarn install
yarn dev
```

## PSKE Customizations

| Commit | Description |
|--------|-------------|
| `55184764` | Provider "pluscloudopen" für OpenStack |
| `452f9ae3` | PDB + podAntiAffinity im Helm Chart |
| `65c3de1e` | UI-Komponenten entfernt (CrdRotation, GQuota, GShootHAPlane, GCredentialEditing) |
| `4f11535d` | PCO Logo |
| `74523bed` | Cleanup upstream files |
