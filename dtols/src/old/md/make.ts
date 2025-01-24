const files = [
    "content/topics/solenopsys/01.ecosystem.md",


]


async function concatFiles(input: string[], path: string) {
    let promise = await Promise.all(input.map(async (f) => {
        const name =  '\n<span style=\"color:red;\">'+f+'</span>\n'

        return name + await Bun.file(f).text()
    }));
    const out = promise.join("\n")
    //  console.log("OUT",out)
    Bun.write(path, out.replaceAll("../images", "../content/images").replaceAll("../", "./"))
}



concatFiles(files, "./README.md")