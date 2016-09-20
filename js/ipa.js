function get_ipa(input, lang) {
  transcription = ipa[input];
  if (transcription == undefined) {
    url = "https://github.com/open-dict-data/ipa-dict/issues/new?title=" + lang + ":%20" + input + "&labels=missing_pronunciation";
    issue = "<a href='" + url + "'>Add it to the dictionary</a>!";
    output.innerHTML = "Pronunciation not found... " + issue;
  } else {
    transcription_out = "/" + transcription.replace(/, /g, "/, /") + "/"
    format = "<strong>" + input + "</strong><br>" + transcription_out;
    output.innerHTML = format;
  }
}

function show_ipa() {
  input = document.getElementById("input").value;
  output = document.getElementById("output");
  get_ipa(input, lang);
  play_audio(input, lang);
  return false;
}

function play_audio(w, l) {
  base_url = audio_loc(w, l);
  if (base_url) {
    player = document.getElementById("player");
    player.innerHTML = "<audio id='reading' src='" + base_url + "'></audio>";
    window.reading.play();
  }
}

function suggest_entry() {
  var demo1 = new autoComplete({
    selector: '#input',
    minChars: 2,
    source: function(term, suggest){
      term = term.toLowerCase();
      var choices = keys;
      var suggestions = [];
      for (i=0;i<choices.length;i++)
	if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
      suggest(suggestions);
    }
  });
}

function audio_loc(w, l) {
  url = { "nb":"https://raw.githubusercontent.com/open-dict-data/norsk-uttale/master/mp3/" + w + ".mp3" };
  if (url[l]) {
    return url[l];
  } else {
    return false;
  }
}
