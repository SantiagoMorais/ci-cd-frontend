# CI/CD Frontend

This project aims to create a CI/CD pipeline step by step and document it:

## Summary
- [Workflow File](#workflow-file)

## Workflow File
Github actions is configured entirely through YAML files living in a specific folder: `.github/workflow/`

Any `.yml` file in there is a *workflow*. Github watches for events (like push) and, if a workflow says "I care about this event", it triggers.

A workflow needs three things a minimum:
1. name - just a label
2. on - the event that triggers it (e.g. push)
3. jobs - what to actually run, and where (which runner)

Ex:

```yml
name: CI

on: push

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: Say hello
        run: echo "Hello from the runner!"
```