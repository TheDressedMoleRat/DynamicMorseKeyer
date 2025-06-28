const morse_dict = {".-":"A","-...":"B","-.-.":"C","-..":"D",".":"E","..-.":"F","--.":"G","....":"H","..":"I",".---":"J","-.-":"K",".-..":"L","--":"M","-.":"N","---":"O",".--.":"P","--.-":"Q",".-.":"R","...":"S","-":"T","..-":"U","...-":"V",".--":"W","-..-":"X","-.--":"Y","--..":"Z",".--.-":"Å",".-.-":"Ä","---.":"Ö",".----":"1","..---":"2","...--":"3","....-":"4",".....":"5","-....":"6","--...":"7","---..":"8","----.":"9","-----":"0","--..--":",",".-.-.-":".","..--..":"?","-.-.--":"!","-..-.":"/","-.--.":"(","-.--.-":")",".-...":"&","---...":":","-.-.-.":";","-...-":"=",".-.-.":"+","-....-":"-","..--.-":"_",".-..-.":"\"","...-..-":"$",".--.-.":"@"};

let anyKeyPressed = false;
let durations = [];
let last_toggle = 0

let out_paragraph = document.getElementById("out_paragraph");

setInterval(update_output, 60);

function add_duration() {
    console.log("adeded");
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
	out_paragraph.textContent = durations;
}

function clearOutput() {
    navigator.clipboard.writeText(out_paragraph.textContent);
    durations = [];
    update_output();
}

let tests = [
    [180,268,80,241,76,59,93,48,100,244,187],
    [4599,84,52,108,46,188,82,86,303,73,54,224,247,76,64,94,70,94,75,254,237,83,49,102,277,204,82,89,35,223,51,80,290,208,57,195,57,210,289,214,64,87],
    [96,283,94,283,111,251,89,752,74,674,95,284,336,297,97,255,80,724,109,276,275,158,302,164,80,1720,268,178,294,581,75],
    [100,37,300,343,109,56,239,89,86,72,99,354,91,68,103,67,109,68,269,255,103,52,252,97,89,1171,310,120,293,123,87,437,312,116,314,130,330,118,90,437,144,118,358,129,88,407,136,124,370,327,315,121,87,1188,170,77,86,40,86,253,69,1842,73,48,224,52,183,71,79,207,77,44,227,149,64,65,81,57,235,205,69,55,222,67,79,44,89,245,72,55,87,196,77,56,93,53,97],
    [211,88,111,64,231,75,102,379,115,71,234,106,100,385,89,341,103,79,255,248,122,62,224,97,92]
]