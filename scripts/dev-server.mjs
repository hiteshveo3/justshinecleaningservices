import { spawn } from "node:child_process";
import net from "node:net";

const DEFAULT_PORT = Number(process.env.PORT) || 3003;
const MAX_TRIES = 20;

function canListen(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.on("error", () => resolve(false));
    server.listen(port, "0.0.0.0", () => {
      server.close(() => resolve(true));
    });
  });
}

async function pickPort(start) {
  for (let i = 0; i < MAX_TRIES; i += 1) {
    const port = start + i;
    if (await canListen(port)) return port;
    console.log(`Port ${port} is busy, trying ${port + 1}...`);
  }
  throw new Error(`No free port found from ${start} to ${start + MAX_TRIES - 1}`);
}

const port = await pickPort(DEFAULT_PORT);
console.log(`Starting Next.js on http://localhost:${port}`);

const child = spawn("npx", ["next", "dev", "-p", String(port), "-H", "0.0.0.0"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PORT: String(port) },
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 0);
});
