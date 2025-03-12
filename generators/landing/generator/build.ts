
import { transform } from 'lightningcss'

const outdir = './dest'

await Bun.build({
  entrypoints: ['./src/tools/generator.ts'],
  outdir,
  plugins: [
    
      {
        name: "lightning-css",
        setup(build) {
          build.onLoad({ filter: /\.css$/ }, async ({ path }) => {
            const contents = await Bun.file(path).text();
  
            const { code } = transform({
              filename: path,
              code: Buffer.from(contents),
              minify: true, // Опционально
              sourceMap: true, // Опционально
            });
  
            return {
              loader: "css",
              contents: code.toString(),
            };
          });
        },
      } as BunPlugin
  ],
  external: [
    '@solenopsys/converged-renderer',
    'marked',
    'yaml',
    '@fileio'
  ],
  platform: 'bun',
});

console.log('Build completed!');