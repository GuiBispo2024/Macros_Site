const startTemplates = [
  "{greeting}, com quem eu falo, por gentileza?\n\nComo posso ajudar?",
  "Olá, {greeting}! Por gentileza, poderia me informar seu nome?\n\nEm que posso ajudar hoje?",
  "{greeting}! Tudo bem? Com quem tenho o prazer de falar?\n\nComo posso te auxiliar?",
  "Olá! {greeting}. Poderia me dizer com quem estou falando?\n\nFico à disposição para ajudar.",
  "{greeting}! Seja bem-vindo(a). Com quem eu falo, por gentileza?\n\nComo posso ajudar você?",
  "Olá, {greeting}! Meu nome é Guilherme. Com quem eu falo?\n\nConte comigo para o que precisar.",
  "{greeting}! Por favor, poderia se identificar?\n\nQual é a melhor forma de eu te ajudar?",
  "Olá! Espero que esteja bem. {greeting}, com quem eu falo?\n\nEstou aqui para ajudar no que for preciso.",
  "{greeting}! É um prazer falar com você. Poderia me informar seu nome?\n\nComo posso auxiliar?",
  "Olá, {greeting}! Para começar, poderia me dizer seu nome?\n\nEm que posso ser útil?"
];
const endTemplates = [
  "Disponha! Após o encerramento do chat, poderia, por gentileza, avaliar meu atendimento?\n\nDesde já agradeço. Caso surja mais alguma dúvida, entre em contato; ficaremos felizes em ajudar :) ",
  "Foi um prazer ajudar! Ao finalizar este chat, sua avaliação sobre meu atendimento será muito bem-vinda.\n\nAgradeço desde já e permaneço à disposição sempre que precisar :) ",
  "Por nada! Se puder avaliar este atendimento ao encerrar a conversa, ficarei muito agradecido(a).\n\nQualquer nova dúvida, é só nos chamar. Será um prazer ajudar!",
  "Fico feliz em ter ajudado! Poderia deixar sua avaliação após o encerramento do chat?\n\nMuito obrigado(a)! Conte conosco sempre que precisar.",
  "Disponha! Sua opinião é muito importante para nós. Ao encerrar, por gentileza, avalie meu atendimento.\n\nAgradeço e sigo à disposição para novas dúvidas :) ",
  "Espero ter esclarecido tudo! Quando o chat for encerrado, poderia avaliar meu atendimento?\n\nDesde já, muito obrigado(a). Estamos sempre prontos para ajudar!",
  "Agradeço o contato! Se possível, deixe uma avaliação sobre este atendimento ao finalizar a conversa.\n\nSerá um prazer falar com você novamente caso precise de algo.",
  "Foi ótimo poder ajudar. Ao encerrar o chat, sua avaliação fará toda a diferença para mim.\n\nObrigado(a) e conte conosco para o que precisar!",
  "Disponha! Peço a gentileza de avaliar meu atendimento quando esta conversa for encerrada.\n\nMuito obrigado(a)! Se surgir qualquer dúvida, estamos por aqui :) ",
  "Obrigada(o) pela conversa! Gostaria de pedir sua avaliação após o encerramento deste chat.\n\nAgradeço desde já e espero poder ajudar novamente em breve!"
];
startTemplates[5] = "Ol\u00e1, {greeting}! Meu nome \u00e9 {agentName}. Com quem eu falo?\n\nConte comigo para o que precisar.";
let agentName = "";
const greeting = () => new Date().getHours() >= 12 ? "Boa tarde" : "Bom dia";
const format = text => text.replaceAll("{greeting}", greeting()).replaceAll("{agentName}", agentName);
const escapeHTML = text => text.replace(/[&<>'"]/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#039;", '"':"&quot;" })[char]);
function render(type) {
  const templates = type === "start" ? startTemplates : endTemplates;
  document.querySelector(`#${type}-macros`).innerHTML = templates.map((text, i) => `<button class="macro" type="button" data-text="${encodeURIComponent(format(text))}"><span class="macro-number">MENSAGEM ${String(i + 1).padStart(2, "0")}</span>${escapeHTML(format(text))}</button>`).join("");
}
function copyMessage(text) { navigator.clipboard.writeText(text).then(() => { const toast = document.querySelector("#toast"); toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 1800); }); }
document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  const start = tab.id === "start-tab";
  document.querySelector("#start-panel").classList.toggle("hidden", !start); document.querySelector("#end-panel").classList.toggle("hidden", start);
  document.querySelectorAll(".tab").forEach(item => { item.classList.toggle("active", item === tab); item.setAttribute("aria-selected", item === tab); });
}));
document.addEventListener("click", event => { const card = event.target.closest(".macro"); if (card) copyMessage(decodeURIComponent(card.dataset.text)); });
document.querySelectorAll(".random-button").forEach(button => button.addEventListener("click", () => {
  const cards = [...document.querySelectorAll(`#${button.dataset.type}-macros .macro`)];
  const selected = cards[Math.floor(Math.random() * cards.length)];
  copyMessage(decodeURIComponent(selected.dataset.text));
}));
document.querySelector("#welcome-form").addEventListener("submit", event => {
  event.preventDefault();
  agentName = document.querySelector("#agent-name").value.trim();
  if (!agentName) return;
  document.querySelector("#welcome-screen").classList.add("hidden");
  document.querySelector("#agent-welcome").textContent = `${greeting()}, ${agentName}! Que bom ter você por aqui.`;
  render("start");
});
document.querySelector("#greeting").textContent = greeting(); render("start"); render("end");
