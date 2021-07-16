$("#go-button").on("click", generateBrackets);

function generateBrackets() {
  let teamNames = $("#teams-list").val().split("\n").map(s => s.trim()).filter(s => s);
  let teams = [];
  let count = 1;
  do {
    let round = $("<ul>").addClass("round");
    for (let i = 0; i < count; i++) {
      round.append(createSpacer());
      let winnerPlace = teams.shift();
      let top = createTeam().addClass("game-top");
      let bottom = createTeam().addClass("game-bottom");
      addEventHandling(top, bottom, winnerPlace);
      addEventHandling(bottom, top, winnerPlace);

      round.append(top);
      round.append(createGameSpacer());
      round.append(bottom);
      teams.push(top);
      teams.push(bottom);
    }
    round.append(createSpacer());
    $("#tournament-brackets").prepend(round);
    count *= 2;
  } while (teams.length < teamNames.length);

  for (let i = 0; i < teams.length; i++) {
    teams[i].find("span").text(teamNames[i]);
  }

  $("#teams-list").hide();
  $(this).hide();
}

function createSpacer() {
  return $("<li>").addClass("spacer").html("&nbsp;");
}

function createGameSpacer() {
  return $("<li>").addClass("game game-spacer").html("&nbsp;");
}

function createTeam(name) {
  let team = $("<li>").addClass("game");
  team.append($("<span>").text(name || "?"));
  return team;
}

function addEventHandling(self, other, winnerPlace) {
  self.on("click", function () {
    if (self.hasClass("winner")) {
      self.removeClass("winner");
      other.removeClass("winner");
      if (winnerPlace) {
        winnerPlace.find("span").text("?");
      }
    } else {
      self.addClass("winner");
      other.removeClass("winner");
      if (winnerPlace) {
        winnerPlace.find("span").text(self.find("span").text());
      }
    }
  });
}

// HACK(Richo): trim polyfill
if (!String.prototype.trim) {
  (function() {
    // Make sure we trim BOM and NBSP
    let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function() {
      return this.replace(rtrim, '');
    };
  })();
}
