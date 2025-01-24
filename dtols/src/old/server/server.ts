import { serve, file } from "bun";

const TEMPLATES_PATH = "./src/server/templates/";

serve({
	port: 8888,
	fetch(req) {
		// something like this:
		if (req.url.endsWith(".png")) {
			const url = new URL(req.url);
			console.log("PNG", url.pathname);
			return new Response(file("." + url.pathname));
		}
		if (req.url.endsWith(".js")) {
			const url = new URL(req.url);
			console.log("PNG", url.pathname);
			return new Response(file(TEMPLATES_PATH+url.pathname));
		}

        if (req.url.endsWith(".json")) {
			const url = new URL(req.url);
			console.log("PNG", url.pathname);
			return new Response(file("." +  url.pathname));
		}
        
		return new Response(file(TEMPLATES_PATH + "index.html"));
	},
});
