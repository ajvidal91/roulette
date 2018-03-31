

var usernameList = [];
var number = 0;
var amount = 5;
var money = 10000;
// red green black
var bets = [0,0,0];
var cheating = false;
var time = 400;
var keys = [];
$(document).keydown(function (e) {
    keys[e.keyCode] = true;
    if (keys[67]){ // c
      cheating = true;
    }
    if (keys[78]){ // n
      cheating = false;
    }
});
$(document).keyup(function (e) {
    delete keys[e.keyCode];
});

for (var i = 0; i < 25; i++){
  var num = random(0,14);
  var color = "red";
  if (num % 2 == 0) color = "black";
  if (num == 0) color = "green";
  var element = `<div class="box ${color}" id="box${i}">${num}</div>`;
  $('#history').append(element);

}

function reset() {
  $("#roulette .box").remove();
  $('#result .box').remove();
  for (var i = 0; i < 500; i++) {
    number = random(0,14);
    var color = "red";
    if (i % 2 == 0) color = "black";
    if (number == 0) color = "green";
    var element = `<div class="box ${color}" id="box${i}">${number}</div>`;
    number++;
    if (number > 14) {
      number = 0;
    }

    $("#roulette").append(element);
  }
}

reset();
function spin() {

  reset();
  $("#result").html("");
  var rand = random(1000, (500 - 16) * 50);
  if (cheating){
    var childNumber = Math.floor(rand / 50) + 8;
    if (Math.random() < 1){
      $('#box' + childNumber).addClass("green").removeClass("red").removeClass("black").html("0");
    }
  }

  $("#roulette .box").first().animate({
    marginLeft: -rand
  }, 5000, "easeOutCubic", function() {
    var childNumber = Math.floor(rand / 50) + 8;
    var child = $("#box" + childNumber);
    checkBet(child);
    child.clone(function() {
      this.id = "won";
    }).appendTo("#result");
    child.clone(function() {
      this.id = "d"+Math.random();
    }).appendTo("#history");

    time = 200;
  });

}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

setInterval(function(){
  var cash = money;
  document.getElementById("money").innerHTML = "Coins: "+(money).toLocaleString();
  var perc = time/200 * 800;
  document.getElementById("time").style.width = perc+"px";
  if (time > 0){
    time--;
    Math.random() < 0.05 ? bots() : 2;
  }

if (time == 0){
    spin();
    time = -1;
  }

},1000/20);

function bet(color,btn){
  var betSize = parseFloat(document.getElementById("betInput").value);
  if (money < betSize || !betSize) return;

  if (color == "r"){
    money -= betSize;
    bets[0] += betSize;
    var element = `<div class="betText"><span class="name">YOU</span>${betSize.toLocaleString()}</div>`
    $(element).appendTo($(btn).parent()).slideUp(1).slideDown(1000);
  }
  if (color == "g"){
    money -= betSize;
    bets[1] += betSize;
    var element = `<div class="betText"><span class="name">YOU</span>${betSize.toLocaleString()}</div>`
    $(element).appendTo($(btn).parent()).slideUp(1).slideDown(1000);
  }

  if (color == "b"){
    money -= betSize;
    bets[2] += betSize;
    var element = `<div class="betText"><span class="name">YOU</span>${betSize.toLocaleString()}</div>`

    $(element).appendTo($(btn).parent()).slideUp(1).slideDown(1000);

  }

}



function checkBet(result){
  var color = $(result).attr('class').replace(/box /,"");
  if (color == "green"){
    money += bets[1] * 14;
    if (bets[1] < 5000) return;
    var rand = random(2,25);
    for (var i = 0; i < rand; i++){
      var timeout = random(0,5000);
      // var msgs = ["wtf","did you just hit that ?","I wish i did that","omfg","omg","WHAT ?","erm what ?","rigged","i never win even when betting 5 coins","i never hit green","nice","OMG im on youtube","youtube?","site owner?","new site that i just found","youre insane man!","...",":O","I never seen anyone win so much...","I will never be rich","???","!??","♥","▲ confirmed!"];
      var msg = msgs[random(0,msgs.length)];
      chatMsg(msg,timeout);

    }
  }

  if (color == "red"){
    money += bets[0] * 2;
  }

  if (color == "black"){
    money += bets[2] * 2;
  }

  $('.betText').slideDown(1000,function(){
    $(this).remove();
  })

  document.getElementById("betInput").value = "";
  bets = [0,0,0];
}
