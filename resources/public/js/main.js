var $ = function(id){ return document.getElementById(id); }
var iosDetected = navigator.userAgent.match("(iPad|iPod|iPhone)");
var timer = null;
var timerDelay = iosDetected ? 800 : 400;
var show = function(elem) { elem.style.display = "block" }
var $note, $action, $preview, $plain_password, $input_elems, $dashed_line, updatePreview;

var md5 = function (input) {
  return hex_md5(input.replace(/[\n\r]/g, ""));
}

function md2html(input){
  return marked(input);
}

function onLoad() {
  $note = $("note");
  $action = $("action");
  $preview = $("preview");
  $plain_password = $("plain-password");
  $input_elems = $("input-elems");
  $dashed_line = $("dashed-line");
  updatePreview = function(){
    clearTimeout(timer);
    var content = $note.value;
    var delay = Math.min(timerDelay, timerDelay * (content.length / 400));
    timer = setTimeout(function(){
      show($dashed_line);
      show($input_elems);
      $preview.innerHTML = md2html(content);
    }, delay);
  };
  if($action){
    if($action.value == "update") updatePreview(); else $note.value = "";
    $note.onkeyup = updatePreview;
    $("publish-button").onclick = function(e) {
      if($plain_password.value != "") $("password").value = md5($plain_password.value);
      $plain_password.value = null;
      $("signature").value = md5($("session").value + $note.value);
    }
    if(iosDetected) $note.className += " ui-border"; else $note.focus();
  }

  var mdDocs = document.getElementsByClassName("markdown");
  for(var i = 0; i < mdDocs.length; i++){
    var elem = mdDocs[i];
    var child = elem.childNodes[0];
    elem.innerHTML = md2html(child.value);
    show(elem);
  }

  if(window.innerHeight >= document.body.clientHeight) {
    var links = $("links");
    links.style.position = "fixed";
    links.style.bottom = 0;
  }

}
