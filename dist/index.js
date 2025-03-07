#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
// Promisify execFile for convenience
const execFileAsync = (0, node_util_1.promisify)(node_child_process_1.execFile);
// Create the MCP server with a name and version
const server = new mcp_js_1.McpServer({ name: 'idb', version: '1.0.0' });
// Minimal debug logger
function debugLog(message) {
    // Toggle debug logging as needed
    console.debug(`[MCP-IDB] ${message}`);
}
const idbCommandDescription = `The IDB command to execute (e.g., list-apps, screenshot, etc.).
- For a full list of commands, run 'idb help'.
- For help with a specific command, run 'idb <command> --help'.

To interact with the device (simulator):
IMPORTANT: Always try using the 'idb ui describe-all' command to identify buttons before dispatching UI actions.
If that doesn't work, try using the following commands:
  
- **Tap**  
  - **Command:** 'idb ui tap X Y [--duration DURATION]'
  - **Description:** Simulates a tap at the given screen coordinates. Optionally, you can set the tap's duration.
  
- **Swipe**  
  - **Command:** 'idb ui swipe X_START Y_START X_END Y_END [--delta STEP_SIZE]'
  - **Description:** Simulates a swipe gesture from the start point to the end point. By default, the swipe moves in steps of 10 points; use '--delta' to change the step size.
  
- **Press a Button**  
  - **Command:** 'idb ui button {APPLE_PAY, HOME, LOCK, SIDE_BUTTON, SIRI} [--duration DURATION]'
  - **Description:** Simulates pressing a specified hardware button. The press duration can be adjusted with the '--duration' flag.
  
- **Inputting Text**  
  - **Command:** 'idb ui text "some text"'
  - **Description:** Types the provided text string into the target device.
  
- **Key Events**  
  - **Single Key:** 'idb ui key KEYCODE [--duration DURATION]'
  - **Key Sequence:** 'idb ui key-sequence KEYCODE1 KEYCODE2 ...'
  - **Description:** Simulates key press events. Use the single key command for one key press (with an optional duration) or the key sequence command for multiple sequential key events.

**Frame and Coordinates in idb ui describe-all:**
The output from 'idb ui describe-all' provides detailed layout information for each UI element. Each element includes a 'frame' object with:
- **x and y:** The coordinates of the element's top-left corner relative to the device screen.
- **width and height:** The dimensions of the element.
Additionally, an 'AXFrame' string presents this data in a human-readable format like '{{x, y}, {width, height}}'.
These values allow you to determine an element's position—commonly by calculating its center (x + width/2, y + height/2) for precise interactions. For instance, in the sample output, the "More, tab, 4 of 4" button has a frame starting at x=330, y=876.33 with a width of 110 and height of 45.67. A tap command such as 'idb ui tap 375 880' (which targets near the element's center) successfully triggers the button.
`;
// Generic tool to execute any IDB command with arguments
server.tool('idb', {
    command: zod_1.z.string().describe(idbCommandDescription),
    options: zod_1.z.array(zod_1.z.string()).optional().describe('Optional arguments for the IDB command'),
}, async ({ command, options }) => {
    const args = options ? [command, ...options] : [command];
    debugLog(`Executing: idb ${args.join(' ')}`);
    try {
        const { stdout, stderr } = await execFileAsync('idb', args);
        // Prefer STDOUT; if empty and STDERR has content, use that
        const output = stdout.trim() || stderr.trim();
        return { content: [{ type: 'text', text: output }] };
    }
    catch (err) {
        debugLog(`Error executing idb ${command}: ${err.message || err}`);
        return {
            content: [{ type: 'text', text: `Error: ${err.message || err}` }],
        };
    }
});
// Start the MCP server using STDIO transport
const transport = new stdio_js_1.StdioServerTransport();
server.connect(transport).catch(err => {
    console.error('Failed to start MCP server:', err);
});
