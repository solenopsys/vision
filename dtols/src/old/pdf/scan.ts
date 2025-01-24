const dir = "./generated/";

const files = ["converged", "combinatorics", "detonation"];

for (let file of files) {
	gen(dir + "pdf" + "/" + file + ".pdf", dir + "md" + "/" + file + ".md");
}
