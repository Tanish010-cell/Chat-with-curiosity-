const chat = document.getElementById("chat");
const welcome = document.getElementById("welcome");
const form = document.getElementById("composer");
const input = document.getElementById("input");
const history = document.getElementById("history");
const sidebar = document.getElementById("sidebar");

let chats = JSON.parse(localStorage.getItem("myAIChats") || "[]");

function save(){ localStorage.setItem("myAIChats", JSON.stringify(chats)); }

function addMessage(text, who){
  if(welcome) welcome.remove();
  const row=document.createElement("div");
  row.className=`message ${who}`;
  row.innerHTML=`<div class="avatar">${who==="user"?"You":"✦"}</div><div class="bubble"></div>`;
  row.querySelector(".bubble").textContent=text;
  chat.appendChild(row);
  row.scrollIntoView({behavior:"smooth",block:"end"});
}

function fakeReply(text){
  const lower=text.toLowerCase();
  if(lower.includes("hello")||lower.includes("hi")) return "Hello! 👋 How can I help you today?";
  if(lower.includes("website")) return "Sure! I can help you build and improve a website. This demo currently uses a local reply system; connect an AI API in a backend to get real AI responses.";
  if(lower.includes("who are you")) return "I’m My AI, a demo chat assistant built with HTML, CSS and JavaScript.";
  return "I received your message: “"+text+"”\n\nThis is the frontend demo. To make it answer like a real AI, connect this chat to an AI API through a secure server.";
}

function addHistory(title){
  const b=document.createElement("button");
  b.textContent=title;
  b.onclick=()=>{};
  history.prepend(b);
}

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const text=input.value.trim();
  if(!text) return;
  addMessage(text,"user");
  addHistory(text);
  chats.push({text, time:Date.now()});
  save();
  input.value="";
  input.style.height="auto";
  setTimeout(()=>addMessage(fakeReply(text),"assistant"),500);
});

input.addEventListener("input",()=>{
  input.style.height="auto";
  input.style.height=Math.min(input.scrollHeight,160)+"px";
});
input.addEventListener("keydown",(e)=>{
  if(e.key==="Enter" && !e.shiftKey){e.preventDefault();form.requestSubmit();}
});

document.querySelectorAll(".suggestions button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    input.value=btn.textContent;
    input.focus();
  });
});

document.getElementById("newChat").addEventListener("click",()=>{
  location.reload();
});
document.getElementById("menu").addEventListener("click",()=>{
  sidebar.classList.toggle("open");
});

chats.slice(-20).forEach(c=>addHistory(c.text));
