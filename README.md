# mcp-idb

MCP server integration for Facebook's iOS Development Bridge (idb).

## Overview

This package provides integration between [MCP (Model Context Protocol)](https://modelcontextprotocol.io/introduction) and Facebook's [idb (iOS Development Bridge)](https://fbidb.io/docs/installation/), enabling automated iOS device management and test execution through MCP.

## Prerequisites

- [idb (iOS Development Bridge)](https://fbidb.io/docs/installation/)

### Installing idb

To install idb:

```bash
brew tap facebook/fb
brew install idb-companion

# verify installation
idb
```

For more details, visit the [official idb GitHub repository](https://github.com/facebook/idb).

## Configuration

### mcp-config.json Setup

To use idb in your MCP configuration, add the following to your `mcp-config.json`:

```json
{
  "mcpServers": {
    "idb": {
      "command": "npx",
      "args": ["-y", "@noahlozevski/idb"]
    }
  }
}
```

Example use cases include:

- Automated test development
- Screenshot testing
- Automated interactions ("tap the home button on the screen")
- Installing / removing applications
