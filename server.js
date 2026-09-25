const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>LDF GAME — Country Challenge</title>
<script src="/socket.io/socket.io.js"></script>
<style>
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#f8fafc;background:#050816}
*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at 15% 0,#1e2a58 0,#0a1024 38%,#050816 78%);overflow-x:hidden}
body:before{content:"";position:fixed;inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(45,212,191,.07),transparent 32%,rgba(129,140,248,.07) 72%,transparent)}
.wrap{width:min(920px,100%);margin:0 auto;padding:20px 14px 34px}.brand{display:flex;align-items:center;justify-content:space-between;margin-bottom:15px}.brand h1{margin:0;font-size:31px;letter-spacing:.08em}.brand small{display:block;color:#94a3b8;font-weight:700;margin-top:2px}.brandMark{font-size:28px}
.card{background:rgba(12,20,42,.86);border:1px solid rgba(148,163,184,.16);border-radius:26px;padding:22px;box-shadow:0 22px 70px rgba(0,0,0,.3);backdrop-filter:blur(16px)}
.row{display:flex;gap:10px;flex-wrap:wrap}.row>*{flex:1;min-width:180px}label{display:block;font-size:13px;font-weight:850;color:#94a3b8;margin:0 0 7px}
input{width:100%;padding:14px 15px;border:1px solid #334155;background:#080f20;color:#f8fafc;border-radius:14px;font-size:16px;outline:none}input:focus{border-color:#5eead4}
button{border:0;border-radius:14px;padding:13px 16px;font-weight:900;font-size:15px;cursor:pointer;transition:.15s transform,.15s opacity,.15s background}.primary{background:linear-gradient(135deg,#14b8a6,#6366f1);color:white}.primary:hover{transform:translateY(-1px)}.secondary{background:#17223b;color:#e2e8f0}.secondary:hover{background:#223250}
.hidden{display:none!important}.center{text-align:center}.code{font-size:42px;font-weight:950;letter-spacing:9px;margin:10px 0;color:#5eead4}.muted{color:#94a3b8}.notice{min-height:28px;font-weight:850;margin-top:14px}.error{color:#fda4af}
.kicker{display:inline-flex;align-items:center;gap:7px;padding:7px 11px;border-radius:999px;background:#0b1730;color:#99f6e4;border:1px solid rgba(94,234,212,.16);font-size:11px;font-weight:950;letter-spacing:.09em;text-transform:uppercase}.heroTitle{font-size:25px;font-weight:950;margin:12px 0 5px}.heroText{color:#aab6ca;line-height:1.5}.players{margin-top:12px}.player{display:flex;justify-content:space-between;gap:10px;padding:11px 12px;border-bottom:1px solid rgba(148,163,184,.11)}
.gameTop{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px}.stat{background:#080f20;border:1px solid rgba(148,163,184,.12);border-radius:15px;padding:10px 12px;text-align:center}.stat span{display:block;color:#94a3b8;font-size:10px;font-weight:850;text-transform:uppercase;letter-spacing:.09em}.stat b{display:block;font-size:20px;margin-top:2px}.timer b{color:#5eead4}
.clueHeader{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:5px 0 12px}.question{font-size:23px;font-weight:950;line-height:1.2}.subquestion{color:#94a3b8;font-size:13px;margin-top:5px}.clues{display:grid;gap:10px;margin:18px 0}.clue{position:relative;padding:16px 16px 16px 47px;border-radius:17px;background:linear-gradient(135deg,#101a35,#0a1225);border:1px solid rgba(148,163,184,.14);font-size:16px;line-height:1.38;color:#e7edf7}.clueNo{position:absolute;left:14px;top:14px;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#162744;color:#5eead4;font-size:12px;font-weight:950}
.options{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:16px}.option{background:#0b1429;color:#f8fafc;border:1px solid #263754;min-height:61px}.option:hover:not(:disabled){background:#122340;border-color:#5eead4;transform:translateY(-1px)}.option:disabled{cursor:default;opacity:.96}.option.correct{background:#0b332c;border-color:#34d399}.option.wrong{background:#391a25;border-color:#fb7185}.scorePop{font-size:15px;color:#5eead4;margin-top:6px;font-weight:950}.scorePop.neutral{color:#fbbf24}
.rankLine{display:flex;justify-content:space-between;align-items:center;padding:12px 4px;border-bottom:1px solid rgba(148,163,184,.12)}.rankLine:first-child{color:#99f6e4}.rankNum{width:32px;font-weight:950}.rankName{flex:1;font-weight:800}.rankScore{font-weight:950}
.avatarPicker{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}.avatarBtn{flex:0 0 48px;min-width:48px;width:48px;height:48px;padding:0;border-radius:14px;background:#080f20;border:1px solid #263754;font-size:25px;display:grid;place-items:center}.avatarBtn.selected{border-color:#5eead4;background:#123044;box-shadow:0 0 0 2px rgba(94,234,212,.14)}.avatar{width:32px;height:32px;border-radius:10px;display:inline-grid;place-items:center;background:#162744;font-size:20px;flex:0 0 32px}.playerMain{display:flex;align-items:center;gap:9px}.rankLine{display:flex;justify-content:space-between;align-items:center;padding:12px 4px;border-bottom:1px solid rgba(148,163,184,.12)}.rankLeft{display:flex;align-items:center;gap:8px;min-width:0}.footer{text-align:center;color:#64748b;font-size:12px;margin-top:12px}
@media(max-width:560px){.wrap{padding:14px 11px 26px}.brand h1{font-size:25px}.card{padding:17px;border-radius:21px}.gameTop{grid-template-columns:repeat(3,1fr)}.stat b{font-size:18px}.question{font-size:21px}.clue{font-size:15px}.options{grid-template-columns:1fr}.code{font-size:35px}}
</style>
</head>
<body>
<div class="wrap">
  <div class="brand"><div><h1>⚡ LDF GAME</h1><small>Think fast. Know the world.</small></div><div class="brandMark">🌍</div></div>

  <section id="home" class="card">
    <div class="kicker">🌍 Country Challenge</div>
    <div class="heroTitle">Can you identify the country?</div>
    <div class="heroText">You'll get three clues about a mystery country. Choose the answer before the clock runs out.</div>
    <div class="row" style="margin-top:18px"><div><label>Your name</label><input id="name" maxlength="24" placeholder="e.g. Alex"></div></div>
    <div style="margin-top:14px"><label>Choose your avatar</label><div id="avatarPicker" class="avatarPicker"></div></div>
    <div class="row" style="margin-top:12px"><button class="primary" id="create">Create host game</button><div style="display:flex;gap:8px;flex:1;min-width:260px"><input id="room" maxlength="4" placeholder="4-letter code"><button class="secondary" id="join">Join</button></div></div>
    <div id="msg" class="notice error" aria-live="polite"></div>
  </section>

  <section id="lobby" class="card hidden">
    <div class="center kicker">🎯 Waiting room</div>
    <div class="center heroTitle">Join the LDF GAME</div><div class="center muted">Share this code in the Teams chat.</div>
    <div id="roomCode" class="code center">----</div><div class="center muted">Everyone plays on their own phone.</div>
    <h3>Players</h3><div id="players" class="players"></div>
    <div class="center" style="margin-top:18px"><button class="primary hidden" id="start">Start 20 rounds</button></div>
  </section>

  <section id="game" class="card hidden">
    <div class="gameTop"><div class="stat"><span>Round</span><b id="round">1/20</b></div><div class="stat"><span>Score</span><b id="score">0</b></div><div class="stat timer"><span>Time</span><b>⏱ <span id="timer">25</span></b></div></div>
    <div class="clueHeader"><div><div class="kicker">🔎 Mystery country</div><div class="question" style="margin-top:8px">Which country is this?</div><div class="subquestion">Correct + fast = more points.</div></div></div>
    <div class="clues" id="clues"></div>
    <div class="options" id="options"></div><div id="notice" class="notice center" aria-live="polite"></div><div id="scorePop" class="scorePop center"></div>
  </section>

  <section id="results" class="card hidden"><div class="center"><div class="kicker">🏆 Game complete</div><h2>Final leaderboard</h2><div class="muted">Every correct answer was worth more when you were faster.</div></div><div id="board"></div><div class="center" style="margin-top:18px"><button class="secondary" onclick="location.reload()">Back to start</button></div></section>
  <div class="footer">LDF GAME • 20 rounds • 25 seconds each • max 200 points per round</div>
</div>
<script>
const socket=io();
let timerInt=null,answered=false,selectedAvatar="🦊";
const AVATARS=["🦊","🐼","🐸","🐯","🦁","🐨","🐵","🐙","🦄","🐝","🐧","🐢","🐲","🐳","🦉","🐺","🐰","🐱","🐶","🦋"];
const $=id=>document.getElementById(id);function show(id){$(id).classList.remove("hidden")}function hide(id){$(id).classList.add("hidden")}
function playerName(){return $("name").value.trim()||"Player"}
function renderAvatarPicker(){ $("avatarPicker").innerHTML=AVATARS.map((a,i)=>\`<button type="button" class="avatarBtn \${i===0?"selected":""}" data-avatar="\${a}" aria-label="Avatar \${i+1}">\${a}</button>\`).join("");document.querySelectorAll(".avatarBtn").forEach(b=>b.onclick=()=>{selectedAvatar=b.dataset.avatar;document.querySelectorAll(".avatarBtn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")})}
renderAvatarPicker();function msg(t){$("msg").textContent=t}function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderPlayers(players){$("players").innerHTML=players.map(p=>\`<div class="player"><span class="playerMain"><span class="avatar">\${escapeHtml(p.avatar||"🌍")}</span><span>\${escapeHtml(p.name)}</span></span><span class="muted">Ready</span></div>\`).join("")}
$("create").onclick=()=>socket.emit("createRoom",{name:playerName(),avatar:selectedAvatar});$("join").onclick=()=>socket.emit("joinRoom",{name:playerName(),avatar:selectedAvatar,code:$("room").value});$("start").onclick=()=>socket.emit("startGame");
socket.on("created",d=>{hide("home");show("lobby");$("roomCode").textContent=d.code;show("start")});socket.on("joined",d=>{hide("home");show("lobby");$("roomCode").textContent=d.code});
socket.on("lobby",d=>{if(!$("lobby").classList.contains("hidden"))renderPlayers(d.players);if(d.started){hide("lobby");show("game")}});socket.on("errorMsg",msg);
socket.on("question",q=>{hide("lobby");hide("results");show("game");answered=false;$("round").textContent=\`\${q.round}/\${q.total}\`;$("score").textContent=q.score??$("score").textContent;$("notice").textContent="";$("scorePop").textContent="";$("scorePop").className="scorePop center";$("clues").innerHTML=q.clues.map((c,i)=>\`<div class="clue"><span class="clueNo">\${i+1}</span>\${escapeHtml(c)}</div>\`).join("");$("options").innerHTML=q.options.map(o=>\`<button class="option" data-answer="\${escapeHtml(o)}">\${escapeHtml(o)}</button>\`).join("");document.querySelectorAll(".option").forEach(b=>b.onclick=()=>answer(b,b.dataset.answer));let t=q.seconds;$("timer").textContent=t;clearInterval(timerInt);timerInt=setInterval(()=>{t--;$("timer").textContent=Math.max(0,t);if(t<=0){clearInterval(timerInt);disableOptions()}},1000)});
function answer(btn,ans){if(answered)return;answered=true;clearInterval(timerInt);disableOptions();socket.emit("answer",{answer:ans})}function disableOptions(){document.querySelectorAll(".option").forEach(b=>b.disabled=true)}
socket.on("answerResult",r=>{$("score").textContent=r.score;document.querySelectorAll(".option").forEach(b=>{if(b.textContent===r.correctAnswer)b.classList.add("correct");if(b.textContent===r.answer&&!r.correct)b.classList.add("wrong")});$("notice").textContent=r.correct?"✅ Correct!":"❌ Not quite — the answer was "+r.correctAnswer;$("scorePop").textContent=r.correct?\`+\${r.points} points • \${r.elapsed.toFixed(1)}s\`:"+0 points";$("scorePop").className="scorePop center"});
socket.on("roundEnded",r=>{if(!answered){$("notice").textContent="⏰ Time! The answer was "+r.correctAnswer;$("scorePop").textContent="+0 points";$("scorePop").className="scorePop neutral center"}renderBoard(r.leaderboard)});socket.on("leaderboard",renderBoard);
function renderBoard(list){$("board").innerHTML=list.map(p=>\`<div class="rankLine"><span class="rankLeft"><span class="rankNum">#\${p.rank}</span><span class="avatar">\${escapeHtml(p.avatar||"🌍")}</span><span class="rankName">\${escapeHtml(p.name)}</span></span><span class="rankScore">\${p.score}</span></div>\`).join("")}
socket.on("gameOver",d=>{clearInterval(timerInt);hide("game");show("results");renderBoard(d.leaderboard)});socket.on("closed",()=>{clearInterval(timerInt);hide("game");hide("lobby");show("home");msg("The host ended the game.")});
</script>
</body></html>`;

app.get("/", (req,res) => res.type("html").send(PAGE));

const AVATARS_SERVER = ["🦊","🐼","🐸","🐯","🦁","🐨","🐵","🐙","🦄","🐝","🐧","🐢","🐲","🐳","🦉","🐺","🐰","🐱","🐶","🦋"];

const countries = [
  ["Japan", ["It is made up of thousands of islands.","Its capital is Tokyo.","Mount Fuji is its highest mountain.","The Shinkansen is its famous high-speed rail network.","Cherry blossom season is celebrated across the country."]],
  ["Brazil", ["It is the largest country in South America.","Portuguese is its official language.","The Amazon rainforest covers a large part of its territory.","Rio de Janeiro is home to the Christ the Redeemer statue.","It is famous for Carnival celebrations."]],
  ["Canada", ["It has the world's longest coastline.","Its capital is Ottawa.","It has two official languages: English and French.","Niagara Falls lies on its border with the United States.","It is the second-largest country by total area."]],
  ["France", ["Its capital is Paris.","The Eiffel Tower is one of its best-known landmarks.","It has territory in both Europe and overseas regions.","It is famous for cuisine, fashion and art.","The Tour de France is an annual cycling race associated with the country."]],
  ["United Kingdom", ["It is made up of four constituent countries.","Its capital is London.","The River Thames flows through its capital.","It is the birthplace of the modern game of football as codified in the 19th century.","Stonehenge is one of its prehistoric landmarks."]],
  ["Germany", ["Its capital is Berlin.","The Rhine is one of its major rivers.","It is one of Europe's largest economies.","The Brandenburg Gate is a famous Berlin landmark.","It is known for the autobahn network."]],
  ["Italy", ["Its capital is Rome.","The Colosseum is in Rome.","Vatican City is surrounded by its capital city.","It has a distinctive boot-shaped peninsula.","It is famous for foods such as pasta and pizza."]],
  ["Spain", ["Its capital is Madrid.","It occupies most of the Iberian Peninsula.","Barcelona is famous for Gaudi's architecture.","Spanish is spoken across the country.","The Canary Islands are part of the country."]],
  ["United States", ["It has 50 states.","Its capital is Washington, D.C.","The Grand Canyon is in this country.","It stretches across North America from the Atlantic to the Pacific.","Alaska is its largest state by area."]],
  ["Australia", ["It is both a country and a continent.","Its capital is Canberra.","The Great Barrier Reef lies off its northeastern coast.","The kangaroo is one of its iconic animals.","Most of its population lives near the coast."]],
  ["New Zealand", ["It is made up mainly of two large islands.","Its capital is Wellington.","The indigenous Maori language is one of its official languages.","It is known for landscapes used in The Lord of the Rings films.","The kiwi is a national symbol."]],
  ["India", ["It is the world's most populous country.","Its capital is New Delhi.","The Taj Mahal is in Agra.","The Himalayas form part of its northern border.","It is the birthplace of cricket legends and a major cricket-playing nation."]],
  ["South Africa", ["It has three capital cities for different branches of government.","It has coastlines on the Atlantic and Indian Oceans.","Table Mountain overlooks Cape Town.","It is home to Kruger National Park.","It has 11 official languages."]],
  ["Mexico", ["Its capital is Mexico City.","It is the largest Spanish-speaking country by population.","Chichen Itza is a famous archaeological site there.","It borders the United States to the north.","Day of the Dead is widely celebrated there."]],
  ["Norway", ["Its capital is Oslo.","It is famous for dramatic fjords.","The country extends far into the Arctic Circle.","It is associated with the Northern Lights.","It has a very long coastline relative to its population."]],
  ["Sweden", ["Its capital is Stockholm.","It is one of the largest countries in Europe by area.","The Nobel Prizes are presented in Stockholm, except the Peace Prize.","It is known for its extensive forests and lakes.","The Swedish company IKEA was founded there."]],
  ["Greece", ["Its capital is Athens.","The Acropolis overlooks Athens.","It has thousands of islands and islets.","The ancient Olympic Games originated there.","Greek is one of Europe's oldest written languages with a continuous tradition."]],
  ["South Korea", ["Its capital is Seoul.","The Korean alphabet is called Hangul.","It occupies the southern part of the Korean Peninsula.","K-pop and Korean dramas have become global cultural exports.","Jeju is a volcanic island and popular destination."]],
  ["Turkey", ["Its largest city, Istanbul, spans Europe and Asia.","Its capital is Ankara.","It controls the Bosporus Strait.","Cappadocia is known for its distinctive rock formations.","It has coastlines on several seas."]],
  ["Argentina", ["Its capital is Buenos Aires.","It is one of the largest countries in South America.","The Andes form much of its western border.","It is famous for tango and beef.","Aconcagua is the highest mountain outside Asia."]],
  ["Portugal", ["Its capital is Lisbon.","It occupies the western side of the Iberian Peninsula.","Portuguese is its official language.","Madeira and the Azores are Portuguese island groups.","It is one of Europe's oldest nation-states."]],
  ["Switzerland", ["It is a landlocked country in central Europe.","Its federal city is Bern.","It has four national languages.","The Alps cover much of its landscape.","It is famous for watches and chocolate."]],
  ["Ireland", ["Its capital is Dublin.","It occupies most of the island of Ireland.","Irish and English are official languages.","The River Shannon is its longest river.","The Cliffs of Moher are a famous coastal landmark."]],
  ["Netherlands", ["Its capital is Amsterdam.","Much of the country is very low-lying.","It is famous for canals and cycling.","Tulips are strongly associated with the country.","Rotterdam has one of Europe's major ports."]],
  ["Denmark", ["Its capital is Copenhagen.","It is made up of the Jutland Peninsula and many islands.","Greenland is an autonomous territory within its kingdom.","The country is associated with LEGO.","It is one of the Nordic countries."]],
  ["Finland", ["Its capital is Helsinki.","It is known as the Land of a Thousand Lakes, though it has far more than a thousand.","It shares a long border with Russia.","Sauna culture is an important part of everyday life.","Lapland in the north is associated with Santa Claus tourism."]],
  ["Poland", ["Its capital is Warsaw.","It lies on the Baltic Sea.","Krakow is one of its best-known historic cities.","The Bialowieza Forest is home to European bison.","It was the birthplace of scientist Marie Curie."]],
  ["Ukraine", ["Its capital is Kyiv.","It is the largest country entirely within Europe by area.","It has a long coastline on the Black Sea.","The Carpathian Mountains reach into its western regions.","Kyiv is one of Europe's older capitals."]],
  ["Singapore", ["It is a city-state in Southeast Asia.","English is one of its four official languages.","It is known for its highly developed port.","The Merlion is a famous national symbol.","It lies near the southern tip of the Malay Peninsula."]],
  ["Thailand", ["Its capital is Bangkok.","It is the only Southeast Asian country never formally colonised by a European power.","Thai is its official language.","It is famous for temples, beaches and cuisine.","Its former capital Ayutthaya is a UNESCO World Heritage Site."]]
];

const ROUND_SECONDS = 25;
const TOTAL_ROUNDS = 20;
const rooms = new Map();
function roomCode(){let c;do c=Math.random().toString(36).slice(2,6).toUpperCase();while(rooms.has(c));return c;}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a;}
function board(room){return [...room.players.values()].sort((a,b)=>b.score-a.score).map((p,i)=>({rank:i+1,name:p.name,score:p.score,avatar:p.avatar||"🌍"}));}
function lobby(rc){const r=rooms.get(rc);if(r)io.to(rc).emit("lobby",{code:rc,started:r.started,players:[...r.players.values()].map(p=>({name:p.name,score:p.score,avatar:p.avatar||"🌍"}))});}
function cluesFor(country){return shuffle(country[1]).slice(0,3);}

io.on("connection",socket=>{
  socket.on("createRoom",({name,avatar})=>{const rc=roomCode();const r={host:socket.id,players:new Map(),started:false,round:0,order:[],current:null,answered:new Set(),timer:null,startedAt:0,roundActive:false};r.players.set(socket.id,{name:(name||"Host").trim().slice(0,24)||"Host",score:0,avatar:AVATARS_SERVER.includes(avatar)?avatar:"🌍"});rooms.set(rc,r);socket.join(rc);socket.roomCode=rc;socket.emit("created",{code:rc});lobby(rc);});
  socket.on("joinRoom",({code:rc,name,avatar})=>{rc=(rc||"").trim().toUpperCase();const r=rooms.get(rc);if(!r)return socket.emit("errorMsg","Room not found.");if(r.started)return socket.emit("errorMsg","That game has already started.");const clean=(name||"Player").trim().slice(0,24);if(!clean)return socket.emit("errorMsg","Please enter your name.");if([...r.players.values()].some(p=>p.name.toLowerCase()===clean.toLowerCase()))return socket.emit("errorMsg","That name is already in use.");r.players.set(socket.id,{name:clean,score:0,avatar:AVATARS_SERVER.includes(avatar)?avatar:"🌍"});socket.join(rc);socket.roomCode=rc;socket.emit("joined",{code:rc});lobby(rc);});
  socket.on("startGame",()=>{const rc=socket.roomCode,r=rooms.get(rc);if(!r||r.host!==socket.id)return;r.started=true;r.round=0;r.order=shuffle(countries).slice(0,TOTAL_ROUNDS);next(rc);});
  socket.on("answer",({answer})=>{const rc=socket.roomCode,r=rooms.get(rc);if(!r||!r.started||!r.roundActive||r.answered.has(socket.id))return;const p=r.players.get(socket.id);if(!p)return;const elapsed=Math.min(ROUND_SECONDS,Math.max(0,(Date.now()-r.startedAt)/1000));r.answered.add(socket.id);const ok=answer===r.current[0];const points=ok?100+Math.round(((ROUND_SECONDS-elapsed)/ROUND_SECONDS)*100):0;if(ok)p.score+=points;socket.emit("answerResult",{correct:ok,correctAnswer:r.current[0],score:p.score,points,elapsed,answer});io.to(rc).emit("leaderboard",board(r));if(r.answered.size>=r.players.size)endRound(rc);});
  socket.on("disconnect",()=>{const rc=socket.roomCode,r=rooms.get(rc);if(!r)return;r.players.delete(socket.id);r.answered.delete(socket.id);if(r.host===socket.id){if(r.timer)clearTimeout(r.timer);io.to(rc).emit("closed");rooms.delete(rc);return;}lobby(rc);io.to(rc).emit("leaderboard",board(r));if(r.started&&r.answered.size>=r.players.size)endRound(rc);});
});

function next(rc){const r=rooms.get(rc);if(!r)return;if(r.round>=TOTAL_ROUNDS){r.roundActive=false;io.to(rc).emit("gameOver",{leaderboard:board(r)});r.started=false;lobby(rc);return;}r.current=r.order[r.round];r.answered=new Set();r.roundActive=true;r.startedAt=Date.now();const options=shuffle([r.current[0],...shuffle(countries.filter(c=>c[0]!==r.current[0])).slice(0,3).map(c=>c[0])]);io.to(rc).emit("question",{round:r.round+1,total:TOTAL_ROUNDS,clues:cluesFor(r.current),options,seconds:ROUND_SECONDS});if(r.timer)clearTimeout(r.timer);r.timer=setTimeout(()=>endRound(rc),ROUND_SECONDS*1000);}
function endRound(rc){const r=rooms.get(rc);if(!r||!r.started||!r.roundActive)return;r.roundActive=false;if(r.timer){clearTimeout(r.timer);r.timer=null;}io.to(rc).emit("roundEnded",{correctAnswer:r.current[0],leaderboard:board(r)});r.round++;setTimeout(()=>next(rc),1800);}

server.listen(PORT,"0.0.0.0",()=>console.log("LDF GAME running on port "+PORT));
