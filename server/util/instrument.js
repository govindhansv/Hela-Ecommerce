// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://81b7f0e8621629f3d418a7e62b257759@o4508261561073664.ingest.de.sentry.io/4508261569658960",
  integrations: [
    nodeProfilingIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
// Manually call startProfiling and stopProfiling
// to profile the code in between
// Sentry.profiler.startProfiling() // i just commented this and last line . no idea its causing error
// this code will be profiled

// Calls to stopProfiling are optional - if you don't stop the profiler, it will keep profiling
// your application until the process exits or stopProfiling is called.
// Sentry.profiler.stopProfiling()