# Git push instructions (copy & paste)

# 1. Create repo on GitHub named `workflow-designer`
git init
git add .
git commit -m "chore: initial scaffold — Vite + React + Tailwind + React Flow + Zustand"
git branch -M main
git remote add origin https://github.com/<your-username>/workflow-designer.git
git push -u origin main

# 2. After iterative changes (recommended commits)
git add -A
git commit -m "feat: add drag-drop canvas, custom nodes, node forms"
git commit -m "feat(api): express simulation engine, automations endpoint"
git commit -m "chore: add FastAPI alternative and Rust validator"
git push origin main

# 3. Recommended branch workflow
# - create feature branches for major additions:
git checkout -b feat/dynamic-node-params
# implement and commit
git push -u origin feat/dynamic-node-params
# open PR -> merge -> delete branch
