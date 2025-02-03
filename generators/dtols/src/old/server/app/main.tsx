import {
	render,
	For,
	If,
	Component,
	useFetch,
} from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";

const Contents: Component = (params: { pages: {key:string,title:string}[] }) => {
	return (
		<div style="position:absolute;top:0;right:0;width:250px;height:100%;color:white;">
			<For values={params.pages}>{(value) => <div>{value.title}</div>}</For>
		</div>
	);
};

const WP_ROOT = "/content/topics/EN/whitepapers/";
const WP = "solenopsys";
const WP_CONF_NAME = "whitepaper.json";

const Cover: Component = (params: { image: string; pages: any[] }) => {
	const resource = useFetch(WP_ROOT + WP + "/" + WP_CONF_NAME);

	const image = $(params.image);
    const pages = $(params.pages);

	$.effect(() => {
		const state = resource();
        console.log("LOADED",state)
		if (!state.pending) {
            state.value.json().then((json:any) => {

				image(json.cover.image);
                pages(json.pages);
			});
		}
	});

	return (
		<div>
			<img src={image} alt="robotics" style="width:100%;"></img>
			<Contents pages={pages}></Contents>
		</div>
	);
};

render(() => {
	const pages = [{ name: "page1" }, { name: "page2" }];
	return Cover({
		image: "solenopsys/images/robotics.png",
		pages,
	});
}, document.getElementById("main"));
