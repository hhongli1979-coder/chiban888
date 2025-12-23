# Claude Code Guide for SurfSense Development

This guide introduces [Claude Code](https://github.com/anthropics/claude-code), an agentic coding tool from Anthropic that can accelerate your development workflow on the SurfSense project.

## What is Claude Code?

Claude Code is an AI-powered coding assistant that lives in your terminal. It understands your codebase and helps you code faster by:

- ✨ **Executing routine tasks** through natural language commands
- 🔍 **Explaining complex code** in the SurfSense codebase
- 🔧 **Handling git workflows** automatically
- 🤖 **Acting as an intelligent coding agent** that understands context

Claude Code works seamlessly in your terminal, IDE, and can even be invoked by tagging `@claude` on GitHub.

## Why Use Claude Code with SurfSense?

SurfSense is a complex project with multiple components (backend, frontend, browser extension). Claude Code can help you:

- **Navigate the codebase** - Quickly understand different parts of the SurfSense architecture
- **Debug issues** - Get intelligent suggestions for fixing bugs
- **Write tests** - Generate test cases for new features
- **Refactor code** - Safely improve code quality across the project
- **Handle git operations** - Simplify branch management, commits, and PRs

## Installation

### MacOS/Linux

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Homebrew (MacOS)

```bash
brew install --cask claude-code
```

### Windows

```powershell
irm https://claude.ai/install.ps1 | iex
```

### NPM

```bash
npm install -g @anthropic-ai/claude-code
```

**Note**: If installing with NPM, you also need [Node.js 18+](https://nodejs.org/en/download/)

## Getting Started with SurfSense

1. **Navigate to your SurfSense directory**:
   ```bash
   cd /path/to/SurfSense
   ```

2. **Launch Claude Code**:
   ```bash
   claude
   ```

3. **Start coding with natural language**:
   - "Explain how the document processing works in the backend"
   - "Help me add a new external source connector"
   - "Write unit tests for the search functionality"
   - "Review my changes and suggest improvements"

## Common Use Cases

### Understanding the Codebase

```
> Explain how the RAG pipeline works in surfsense_backend
```

Claude Code will analyze the relevant files and provide a clear explanation of the implementation.

### Implementing Features

```
> Add a new connector for Google Drive integration
```

Claude Code can help scaffold the connector based on existing patterns in the codebase.

### Debugging

```
> Why is the document upload failing with a 500 error?
```

Claude Code will examine logs, code, and suggest potential fixes.

### Git Workflows

```
> Create a feature branch for the new podcast generation feature
> Review my changes and create a PR
```

Claude Code handles git operations intelligently.

## Plugins

Claude Code supports plugins that extend its functionality. Check the [plugins directory](https://github.com/anthropics/claude-code/tree/main/plugins) for available extensions.

## Best Practices

1. **Be specific** - The more context you provide, the better Claude Code can help
2. **Review suggestions** - Always review code changes before committing
3. **Use for learning** - Ask Claude Code to explain unfamiliar patterns in the codebase
4. **Iterate** - If the first suggestion isn't perfect, refine your prompt

## Privacy and Data Usage

When using Claude Code:

- Usage data (code acceptance/rejections) is collected
- Conversation data is retained for a limited time
- User feedback submitted via `/bug` command is stored

See [Claude Code's data usage policies](https://docs.anthropic.com/en/docs/claude-code/data-usage) for full details.

## Reporting Issues

If you encounter issues with Claude Code:

- Use the `/bug` command within Claude Code
- File an issue at [Claude Code GitHub](https://github.com/anthropics/claude-code/issues)

## Additional Resources

- 📖 [Official Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/overview)
- 💬 [Claude Developers Discord](https://anthropic.com/discord)
- 🐙 [Claude Code GitHub Repository](https://github.com/anthropics/claude-code)
- 🚀 [SurfSense Contributing Guide](../CONTRIBUTING.md)

## Community

Join the [Claude Developers Discord](https://anthropic.com/discord) to connect with other developers using Claude Code and share your experiences with the SurfSense project.

---

**Ready to boost your SurfSense development workflow?** Install Claude Code and start coding smarter! 🚀
