const hitLogger = () => {
  const logWindow = document.querySelector(".battle-log");
  if (logWindow.classList.contains("hidden"))
    logWindow.classList.remove("hidden");
  const {
    name: name1,
    maxHealth: maxHp1,
    health: hp1,
    lastTakenDamage: dmgTaken1,
  } = fighters[0];
  const {
    name: name2,
    maxHealth: maxHp2,
    health: hp2,
    lastTakenDamage: dmgTaken2,
  } = fighters[1];

  const firstFighterLog = `<div class="text-sm leading-3">
    <span class="font-bold text-green-700">${name1} (${hp1}/${maxHp1}):</span>
    <span>-${dmgTaken1}</span>
   </div>
  `;
  const secondFighterLog = `<div class="text-sm leading-3">
  <span class="font-bold text-red-700">${name2} (${hp2}/${maxHp2}):</span>
  <span>-${dmgTaken2}</span>
  </div>
  `;

  const oneRoundMsg = `<div class="p-1 pb-0">${secondFighterLog}${firstFighterLog}</div>`;
  logWindow.insertAdjacentHTML("beforeend", oneRoundMsg);
  logWindow.scrollTop = logWindow.scrollHeight - logWindow.clientHeight;
};
