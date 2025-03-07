# mcp-idb

MCP server integration for Facebook's iOS Development Bridge (idb).

## Overview

This package provides integration between [MCP (Model Context Protocol)](https://modelcontextprotocol.io/introduction) and Facebook's [idb (iOS Development Bridge)](https://fbidb.io/docs/installation/), enabling automated iOS device management and test execution through MCP.

Start the server:
```sh
npx -y @noahlozevski/mcp-idb
```

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

## Development

### Code Formatting

This project uses Prettier for code formatting. To format your code:

```bash
npm run format        # Format all files
```

The formatting configuration can be found in `.prettierrc` at the root of the project.

## Troubleshooting

Common issues and solutions:

1. **idb companion not found**: Ensure idb-companion is installed via Homebrew
2. **Device not detected**: Make sure the iOS device is:
   - Connected via USB
   - Trusted on the computer
   - Has developer mode enabled

## Contributing

Please follow the standard MCP contribution guidelines when making changes to this package.

## License

This project is part of Mobile Control Plane (MCP) and follows Amazon's internal licensing policies.
