const items=[
["Seer","Knife","Godly","🔪"],["Luger","Gun","Godly","🔫"],["Harvester","Knife","Ancient","🪓"],["Batwing","Knife","Ancient","🦇"],["Elderwood Scythe","Knife","Ancient","🌲"],["Boneblade","Knife","Ancient","🦴"],["Vampire Edge","Knife","Godly","🧛"],["Ginger Luger","Gun","Godly","🔫"],["Chroma Seer","Knife","Chroma","🌈"],["Chroma Luger","Gun","Chroma","🌈"],["Icewing","Knife","Godly","❄️"],["Gemstone","Knife","Godly","💎"],["Fang","Knife","Godly","🦷"],["Nightblade","Knife","Godly","🌙"],["Deathshard","Knife","Godly","☠️"],["Prismatic","Knife","Godly","✨"],["Tides","Knife","Godly","🌊"],["Shark","Gun","Godly","🦈"],["Laser","Gun","Godly","🔴"],["Heat","Knife","Godly","🔥"],["Ghostblade","Knife","Godly","👻"],["Frostsaber","Knife","Godly","🧊"],["Common Knife","Knife","Common","🔪"],["Classic Gun","Gun","Common","🔫"]
];
const maps=["Hotel","Mansion","Workplace","Research Facility","Bank","Office","Police Station","House 2","Hospital 3","nStudio"];
const qs=[
["Что получает Innocent после подбора пистолета Sheriff?","Hero",["Hero","Murderer","Detective","Hunter"]],
["Какая способность позволяет Murderer стать невидимым?","Ghost",["Sprint","Ghost","Throw","Haste"]],
["Что может сделать Sheriff с Murderer?","Остановить убийцу",["Остановить убийцу","Поднять нож","Стать Innocent","Телепортироваться"]]
];
let qi=0,score=0;

function renderItems(){
 const q=document.querySelector("#search").value.toLowerCase(),t=document.querySelector("#type").value,r=document.querySelector("#rarity").value;
 const data=items.filter(x=>(x[0].toLowerCase().includes(q))&&(t==="all"||x[1]===t)&&(r==="all"||x[2]===r));
 document.querySelector("#itemsGrid").innerHTML=data.map(x=>`<article class="item"><div class="emoji">${x[3]}</div><h3>${x[0]}</h3><span class="tag">${x[2]}</span><p class="muted">${x[1]}</p></article>`).join("")||"<p>Ничего не найдено 😭</p>";
}
function toast(s){const e=document.querySelector("#toast");e.textContent=s;e.classList.add("toast-show");setTimeout(()=>e.classList.remove("toast-show"),2200)}
function randomItem(){const x=items[Math.floor(Math.random()*items.length)];toast(`🎲 Выпало: ${x[0]} • ${x[2]}`)}
function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));document.querySelector("#"+id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"})}
function quiz(){const box=document.querySelector("#quizContent");if(qi>=qs.length){box.innerHTML=`<div class="score">🏆 ${score}/${qs.length}</div><p>Квиз закончен!</p><button class="primary" onclick="qi=0;score=0;quiz()">Пройти ещё раз</button>`;return}const q=qs[qi];box.innerHTML=`<div class="muted">Вопрос ${qi+1} из ${qs.length}</div><div class="question">${q[0]}</div><div class="answers">${q[2].map(a=>`<button class="answer" onclick="answer(${JSON.stringify(a)})">${a}</button>`).join("")}</div>`}
function answer(a){if(a===qs[qi][1]){score++;toast("✅ Правильно!")}else toast("❌ Не угадал!");qi++;setTimeout(quiz,450)}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
["search","type","rarity"].forEach(id=>document.querySelector("#"+id).addEventListener("input",renderItems));
document.querySelector("#random").onclick=randomItem;document.querySelector("#randomHero").onclick=randomItem;
document.querySelector("#theme").onclick=()=>{document.body.classList.toggle("light");document.querySelector("#theme").textContent=document.body.classList.contains("light")?"☀️":"🌙"};
document.querySelector("#mapsGrid").innerHTML=maps.map(m=>`<article class="map"><h2>🗺️ ${m}</h2><p>MM2 карта</p></article>`).join("");
document.querySelector("#itemCount").textContent=items.length;renderItems();quiz();
