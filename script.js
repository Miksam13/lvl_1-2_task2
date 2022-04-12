let btn = document.getElementById("btn");

function csvprocessing() {
	let text = document.getElementById("div_csv").value;
	let text_array = text.split('\n');
	let text_filter = text_array.filter(i => !/^#/.exec(i)).filter(Boolean);
	let i = 0;
	let text_map = text_filter.map(function () {
		let text_maps_split = text_filter[i].split(",");
		i++;
		let text_maps_object = {
			x: text_maps_split[0],
			y: text_maps_split[1],
			name: text_maps_split[2],
			population: text_maps_split[3],
		};
		return text_maps_object;
	});
	let text_sort = text_map.sort((a, b) => (b.population || 0) - (a.population || 0));
	let text_slice = text_sort.slice(0, 10);
	i = 0;
	let text_reduce = text_slice.reduce(function(acc, n){
		acc[n.name] = {
			population: n.population,
			raiting: i + 1
		}
		i++;
		return acc;
	},{})
	return text_reduce;
}

btn.addEventListener('click', function() {
	let user_text = document.getElementById('text_user').value;
	let parse_csv = csvprocessing();
	let prog_user = document.getElementById('prog_txt');
	prog_user.innerHTML = user_text + " - такого города нету в топе";
	prog_user.innerHTML = `${user_text} - это ${parse_csv[user_text].raiting} место в ТОП 10 городов Украины с населением ${parse_csv[user_text].population} человек `
})