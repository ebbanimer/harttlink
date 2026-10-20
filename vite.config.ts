import { defineConfig } from 'vite';

export default defineConfig({
  // Keep paths stable in Windows workspaces that restrict native realpath calls.
  resolve: { preserveSymlinks: true },
});
