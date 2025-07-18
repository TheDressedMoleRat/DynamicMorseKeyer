const morse_dict = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G", 
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    ".--.-": "Å",
    ".-.-": "Ä",
    "---.": "Ö",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
    "--..--": ",",
    ".-.-.-": ".",
    "..--..": "?",
    "-.-.--": "!",
    "-..-.": "/",
    "-.--.": "(",
    "-.--.-": ")",
    ".-...": "&",
    "---...": ":",
    "-.-.-.": ";",
    "-...-": "=",
    ".-.-.": "+",
    "-....-": "-",
    "..--.-": "_",
    ".-..-.": "\"",
    "...-..-": "$",
    ".--.-.": "@",
};

let anyKeyPressed = false;
let durations = [];
let last_toggle = 0

let out_paragraph = document.getElementById("out_paragraph");
let durations_p = document.getElementById("durations");

setInterval(update_output, 60);

function get_threshold(unsorted_list) {
	let sorted_list = [...unsorted_list].sort((a,b) => a-b);
	let log_list = sorted_list.map(Math.log);
	
	let biggest_gap = 0;
	let threshold = 0;
	
	for (let i = 0; i < log_list.length-1; i++) {
		if (log_list[i+1]-log_list[i] > biggest_gap) {
			biggest_gap = log_list[i+1]-log_list[i];
			threshold = (sorted_list[i+1]+sorted_list[i]) / 2;
		}
	}   
	
	return threshold;
}

function add_duration() {
	if (last_toggle == 0) {
		last_toggle = Date.now();
		return;
	}

	durations.push(Date.now() - last_toggle);

	last_toggle = Date.now();
}

window.addEventListener('keydown', function(event) {
	if (anyKeyPressed) {
		return;
	}

	anyKeyPressed = true;

	add_duration();
});

window.addEventListener('keyup', function(event) {
	if (!anyKeyPressed) {
		return;
	}

	anyKeyPressed = false;

	add_duration();
});

function letter(morse) {
	return (morse in morse_dict) ? morse_dict[morse] : morse;
}

function update_output() {
    let dash_ms = get_threshold(durations.filter((_, i) => i%2 == 0))
    let unit = dash_ms / 3;
	let gap_ms = 3 * unit;
	let space_ms = 7 * unit;

	let out_string = "";
	let buffer = "";

	durations.forEach((duration, i) => {
		let is_down_duration = (i % 2 == 0);

		if (is_down_duration) {
			if (duration > dash_ms) {buffer += "-";}
			else {buffer += ".";}
		}
		else {
			if (duration > gap_ms) {
				out_string += letter(buffer);
				buffer = "";
			}
			if (duration > space_ms) {out_string += "  ";}
		}
	});
	
	out_string += letter(buffer);

	out_paragraph.textContent = out_string;
    durations_p.textContent = 1200/unit + " : " + durations;
}

function clear_text() {
    durations = [];
    update_output();
    last_toggle = 0;
}