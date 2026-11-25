const $=s=>document.querySelector(s);
const PN={tete:"Tête",main:"Main",bras:"Bras",pied:"Pied",jambe:"Jambe",corps:"Corps entier"};
const AN={face:"Face",profil:"Profil droit",profilG:"Profil gauche",dos:"Dos",haut:"Dessus",bas:"Dessous"};
const SN=["Formes de base","Proportions et repères","Contours"];
const SH=["Pose les volumes simples, sans appuyer.","Ajoute les axes et les repères de proportion.","Dessine les contours en suivant les repères."];

/* Guides : 3 étapes par vue, en SVG (viewBox 400×500). Ajoute une vue = ajoute une entrée ici. */
const m=(a,b,o)=>Object.fromEntries(Object.entries(o).map(([k,c])=>[k,[a,b,c]]));
const hd1='<rect x="125" y="250" width="150" height="140" rx="30"/><rect x="125" y="130" width="28" height="130" rx="14"/><rect x="161" y="95" width="28" height="165" rx="14"/><rect x="197" y="85" width="28" height="175" rx="14"/><rect x="233" y="105" width="28" height="155" rx="14"/><ellipse cx="95" cy="300" rx="22" ry="62" transform="rotate(-35 95 300)"/>',
hd2='<path d="M125 215h28M161 185h28M197 175h28M233 195h28M125 170h28M161 140h28M197 130h28M233 150h28M125 290H275"/>',
ar1='<ellipse cx="200" cy="150" rx="42" ry="95"/><ellipse cx="200" cy="350" rx="32" ry="95"/><circle cx="200" cy="250" r="30"/>',
ar2='<path d="M200 40V460M150 250H250M165 440h70"/>',
lg1='<ellipse cx="200" cy="130" rx="55" ry="105"/><ellipse cx="200" cy="350" rx="38" ry="100"/><circle cx="200" cy="245" r="32"/>',
lg2='<path d="M200 25V470M150 245H250M150 470h100"/>',
bd1='<circle cx="200" cy="60" r="35"/><rect x="145" y="105" width="110" height="160" rx="30"/><path d="M145 120 80 260M255 120l65 140M170 265l-10 195M230 265l10 195"/>',
bd2='<path d="M60 83H340M60 141H340M60 199H340M60 257H340M60 315H340M60 373H340M60 431H340"/>',
ft1='<ellipse cx="200" cy="370" rx="52" ry="75"/><ellipse cx="205" cy="190" rx="68" ry="90"/>',
ft2='<path d="M200 70V470M130 100h140M120 270h160"/>';
const G={
tete:{
 face:['<ellipse cx="200" cy="230" rx="105" ry="135"/><path d="M200 95V365M95 230H305"/>','<path d="M105 160H295M120 300H280M150 335H250"/><ellipse cx="92" cy="265" rx="13" ry="35"/><ellipse cx="308" cy="265" rx="13" ry="35"/>','<path d="M140 225q22-18 44 0q-22 14-44 0M216 225q22-18 44 0q-22 14-44 0M200 235v62m-22 8q22 12 44 0M165 335q35 18 70 0M100 250q10 110 100 120q90-10 100-120"/>'],
 profil:['<circle cx="180" cy="200" r="100"/><path d="M110 270 185 365 275 300"/>','<path d="M80 200H290M180 90V370M80 300H290"/><ellipse cx="165" cy="235" rx="14" ry="32"/>','<path d="M270 215q16 40 18 56q-14 4-20 8q6 18-4 28q-22 14-52 14q-60-5-90-70"/>'],
 dos:['<ellipse cx="200" cy="210" rx="100" ry="125"/><path d="M200 85V335M100 210H300"/>','<path d="M165 330v70M235 330v70M105 230H295"/><ellipse cx="97" cy="235" rx="13" ry="32"/><ellipse cx="303" cy="235" rx="13" ry="32"/>','<path d="M110 150q90-90 180 0M165 335q35 15 70 0M110 230q8 90 55 105M290 230q-8 90-55 105"/>'],
 haut:['<ellipse cx="200" cy="260" rx="100" ry="120"/><path d="M200 140V380M100 260H300"/>','<path d="M185 150 200 105 215 150"/><ellipse cx="97" cy="270" rx="12" ry="30"/><ellipse cx="303" cy="270" rx="12" ry="30"/>','<path d="M110 190q90-60 180 0M140 330q60 40 120 0"/>'],
 bas:['<ellipse cx="200" cy="240" rx="100" ry="115"/><path d="M200 125V355M100 240H300"/>','<path d="M175 300q25 25 50 0M185 170l15 40 15-40"/>','<path d="M110 200q90 40 180 0M130 290q70 50 140 0"/>']},
main:{...m(hd1,hd2,{face:'<path d="M135 330q40 30 130 0M170 300q30 15 60 0"/>',dos:'<path d="M150 270v60M200 270v60M250 270v60"/>'}),
 profil:['<rect x="160" y="250" width="70" height="140" rx="30"/><rect x="160" y="100" width="40" height="160" rx="20"/><ellipse cx="240" cy="310" rx="18" ry="50" transform="rotate(25 240 310)"/>','<path d="M160 200h40M160 150h40M160 290H230"/>','<path d="M160 390q35 25 70 0M200 100q-5 100 0 150"/>']},
bras:m(ar1,ar2,{face:'<path d="M158 70Q150 160 168 250Q168 350 170 440M242 70Q250 160 232 250Q232 350 230 440"/>',profil:'<path d="M165 70Q150 170 185 250Q175 350 175 440M235 70Q255 160 225 235Q215 350 225 440"/>',dos:'<path d="M158 70Q150 160 168 250Q168 350 170 440M242 70Q250 160 232 250Q232 350 230 440M200 235v20"/>'}),
pied:{profil:['<rect x="120" y="70" width="75" height="190" rx="30"/><ellipse cx="230" cy="350" rx="140" ry="45"/>','<path d="M120 260H195M90 395H370M330 330V395"/>','<path d="M120 260Q150 300 200 290Q300 300 345 350Q350 385 320 395H110Q100 330 120 260"/>'],
 ...m(ft1,ft2,{haut:'<circle cx="150" cy="105" r="16"/><circle cx="185" cy="90" r="14"/><circle cx="217" cy="88" r="13"/><circle cx="247" cy="96" r="12"/><circle cx="270" cy="115" r="10"/>',bas:'<path d="M150 300q50 30 100 0M150 190q50-20 100 0"/>'})},
jambe:m(lg1,lg2,{face:'<path d="M148 40Q140 140 160 245Q165 360 165 470M252 40Q260 140 240 245Q235 360 235 470"/>',profil:'<path d="M150 40Q135 140 170 245Q160 360 165 470M250 40Q270 140 235 245Q240 360 235 470"/>',dos:'<path d="M148 40Q140 140 160 245Q165 360 165 470M252 40Q260 140 240 245Q235 360 235 470M165 255q35 20 70 0"/>'}),
corps:m(bd1,bd2,{face:'<path d="M165 100q-35 10-50 30l-45 130M235 100q35 10 50 30l45 130M170 265q-15 100-10 195M230 265q15 100 10 195"/>',profil:'<path d="M175 100q-20 60 0 165M225 100q20 60 0 165M175 265q-10 100-5 195M225 265q10 100 5 195"/>',dos:'<path d="M165 100q-35 10-50 30l-45 130M235 100q35 10 50 30l45 130M200 100V265M170 265q-15 100-10 195M230 265q15 100 10 195"/>'})
};

const st={p:"tete",a:"face",t:0,col:"#1b2230",sz:4,er:false};
const S={},cur=()=>S[st.p+"|"+st.a]||(S[st.p+"|"+st.a]=[]);
const cv=$("#cv"),g=cv.getContext("2d");g.lineCap=g.lineJoin="round";

function chips(el,o,c,fn){el.innerHTML="";for(const k in o){const b=document.createElement("button");b.className="chip";b.textContent=o[k];b.setAttribute("aria-pressed",k==c);b.onclick=()=>fn(k);el.append(b)}}
function guide(){const mir=st.a=="profilG",s=G[st.p][mir?"profil":st.a];
 $("#svg").innerHTML=`<g${mir?' transform="translate(400 0) scale(-1 1)"':""} fill="none" stroke-linecap="round" stroke-linejoin="round">`+s.slice(0,st.t+1).map((x,i)=>`<g stroke="${i==st.t?"#2f5bff":"#8a94a6"}" stroke-width="${i==st.t?2.5:1.5}"${i<2?' stroke-dasharray="7 6"':""}>${x}</g>`).join("")+"</g>"}
function ui(){
 chips($("#parts"),PN,st.p,k=>{st.p=k;if(!G[k][st.a]&&!(st.a=="profilG"&&G[k].profil))st.a=Object.keys(G[k])[0];st.t=0;ui()});
 const av={};for(const k in G[st.p]){av[k]=AN[k];if(k=="profil")av.profilG=AN.profilG}
 chips($("#angles"),av,st.a,k=>{st.a=k;st.t=0;ui()});
 $("#sl").textContent=`Étape ${st.t+1}/3 · ${SN[st.t]}`;$("#sh").textContent=SH[st.t];
 $("#pv").disabled=!st.t;$("#nx").disabled=st.t==2;guide();redraw()}

/* Dessin au stylet, au doigt ou à la souris (pression prise en charge) */
function paint(s,from){g.globalCompositeOperation=s.e?"destination-out":"source-over";g.strokeStyle=g.fillStyle=s.c;const p=s.p;
 if(p.length==1){g.beginPath();g.arc(p[0][0],p[0][1],p[0][2]/2,0,7);g.fill();return}
 for(let i=Math.max(1,from);i<p.length;i++){g.lineWidth=p[i][2];g.beginPath();g.moveTo(p[i-1][0],p[i-1][1]);g.lineTo(p[i][0],p[i][1]);g.stroke()}}
function redraw(){g.globalCompositeOperation="source-over";g.clearRect(0,0,cv.width,cv.height);cur().forEach(s=>paint(s,1))}
let live=null,lw=0;
const pt=e=>{const r=cv.getBoundingClientRect(),k=cv.width/r.width;return[(e.clientX-r.left)*k,(e.clientY-r.top)*k]};
const tw=e=>(st.er?3:1)*st.sz*2*(e.pointerType=="pen"?.4+e.pressure*1.2:1);
cv.onpointerdown=e=>{e.preventDefault();cv.setPointerCapture(e.pointerId);const[x,y]=pt(e);lw=tw(e);live={c:st.col,e:st.er,p:[[x,y,lw]]};cur().push(live);paint(live,0)};
cv.onpointermove=e=>{if(!live)return;const[x,y]=pt(e);lw=lw*.6+tw(e)*.4;live.p.push([x,y,lw]);paint(live,live.p.length-1)};
cv.onpointerup=cv.onpointercancel=()=>{live=null};

/* Commandes */
const COL=["#1b2230","#d6336c","#2f5bff","#2b9348"];
$("#cols").innerHTML=COL.map((c,i)=>`<button class="sw" data-c="${c}" style="background:${c}" aria-label="Couleur ${i+1}" aria-pressed="${!i}"></button>`).join("");
$("#cols").onclick=e=>{const c=e.target.dataset.c;if(!c)return;st.col=c;st.er=false;mode();document.querySelectorAll(".sw").forEach(b=>b.setAttribute("aria-pressed",b.dataset.c==c))};
function mode(){$("#pen").setAttribute("aria-pressed",!st.er);$("#era").setAttribute("aria-pressed",st.er)}
$("#pen").onclick=()=>{st.er=false;mode()};$("#era").onclick=()=>{st.er=true;mode()};
$("#sz").oninput=e=>st.sz=+e.target.value;
$("#op").oninput=e=>$("#svg").style.opacity=e.target.value/100;$("#svg").style.opacity=.7;
$("#pv").onclick=()=>{st.t--;ui()};$("#nx").onclick=()=>{st.t++;ui()};
$("#un").onclick=()=>{cur().pop();redraw()};
$("#cl").onclick=()=>{if(cur().length&&confirm("Effacer ce dessin ?")){cur().length=0;redraw()}};
function snap(type,w,h){const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,w,h);x.drawImage(cv,0,0,w,h);return c.toDataURL(type,.8)}
function toast(t){const e=$("#ts");e.textContent=t;e.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(()=>e.classList.remove("on"),2200)}
$("#png").onclick=()=>{if(!cur().length)return toast("Dessine d’abord quelque chose.");const a=document.createElement("a");a.href=snap("image/png",800,1000);a.download=`croquis-${st.p}-${st.a}.png`;a.click()};

/* Galerie (enregistrée dans l’appareil) */
const K="croquis.v1",load=()=>{try{return JSON.parse(localStorage.getItem(K))||[]}catch(e){return[]}},
store=a=>{try{localStorage.setItem(K,JSON.stringify(a));return 1}catch(e){return 0}};
$("#pub").onclick=()=>{if(!cur().length)return toast("Dessine d’abord quelque chose.");
 const a=load();a.unshift({id:Date.now(),p:st.p,a:st.a,d:new Date().toLocaleDateString("fr-FR"),i:snap("image/jpeg",480,600)});
 toast(store(a)?"Dessin publié dans ta galerie.":"Stockage plein : supprime d’anciens dessins.")};
let fl="";
function gal(){const all=load(),L=all.filter(x=>!fl||x.p==fl);
 $("#cnt").textContent=`${all.length} dessin${all.length>1?"s":""} publié${all.length>1?"s":""}`;
 chips($("#fl"),{"":"Tous",...PN},fl,k=>{fl=k;gal()});
 $("#grid").innerHTML=L.length?L.map(x=>`<figure><img src="${x.i}" alt="Dessin : ${PN[x.p]}, ${AN[x.a]}"><figcaption><b>${PN[x.p]}</b> · ${AN[x.a]}<small>${x.d}</small><span><a href="${x.i}" download="croquis-${x.id}.jpg">Télécharger</a><button data-d="${x.id}">Supprimer</button></span></figcaption></figure>`).join(""):'<p class="empty">Rien ici pour l’instant. Termine un dessin, puis touche « Publier ».</p>'}
$("#grid").onclick=e=>{const id=e.target.dataset.d;if(id&&confirm("Supprimer ce dessin ?")){store(load().filter(x=>x.id!=id));gal()}};
const nm=$("#nm");try{nm.value=localStorage.getItem("croquis.nom")||""}catch(e){}
const av=()=>$("#av").textContent=(nm.value.trim()[0]||"?").toUpperCase();av();
nm.oninput=()=>{av();try{localStorage.setItem("croquis.nom",nm.value)}catch(e){}};
function tab(n){$("#v1").hidden=n!=1;$("#v2").hidden=n!=2;$("#t1").setAttribute("aria-pressed",n==1);$("#t2").setAttribute("aria-pressed",n==2);if(n==2)gal()}
$("#t1").onclick=()=>tab(1);$("#t2").onclick=()=>tab(2);
ui();
