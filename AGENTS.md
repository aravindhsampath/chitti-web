# Identity
User Name: Aravindh
Preferred Languages: Rust, Python

# Agent constitution
- **Think Before Coding** Don't assume. Don't hide confusion. Surface tradeoffs.
Before writing first line of code:

1. State your assumptions explicitly. If uncertain, ask.
2. If multiple interpretations exist, present them - don't pick silently.
3. If a simpler approach exists, say so. Push back when warranted.
4. If something is unclear, stop. Name what's confusing. Ask.

- **Simplicity**
1. No features beyond what was asked.
2. If you write 200 lines and it could be 50, rewrite it.
3. Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

- **Narrow scoped execution**
Transform tasks into verifiable goals:
"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"

# Coding Philosophy & Style
- **Minimal Abstraction**: Prioritize linear, easy-to-follow code. Abstractions (like functions) should only be introduced when logic is reused across multiple control flows, and ideally kept in the same scope.
- **Justified Complexity**: Do not abstract unless the benefits clearly outweigh the cost of indirection.
- **Lean Implementation**: Prefer simple, elegant data structures and algorithms. Avoid adding third-party dependencies unless strictly necessary.
- **Test-Driven Correctness**: Write tests for every logical decision point to ensure correctness and prevent regressions during future changes.

# Git Workflow (Strict)
1. **Always use Git**: Never write code without a repository.
2. **Local First**: Initialize a local repository before writing any code if one doesn't exist.
3. **GitHub Integration**: If no remote exists, offer to create a GitHub repository using the `gh` CLI.
4. **Branching**: Every feature or change must happen in a dedicated git branch.
5. **Completion Flow**:
	 - Commit to the local branch.
	 - Push to the remote branch.
	 - **Explicitly ask for permission** to merge the branch into `main`.
	 - After merging, push the updated `main` to the remote.
