import { BunPlugin } from "bun";
import { transform } from "lightningcss";

export default {
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
    } as BunPlugin,
  ],
};