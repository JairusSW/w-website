const examples={sum:{file:'sum.w',note:'A small function. An explicit result.',code:`// A little function that adds up.
pub fn sum(limit: i32): i32 {
  mut total: i32 = 0
  mut index: i32 = 0

  while index < limit {
    total += index
    index += 1
  }

  rt total
}`},values:{file:'values.w',note:'Inline values. Clear, explicit types.',code:`struct Vec2 {
  x: f32
  y: f32

  fn lengthSquared(self: Vec2): f32 {
    rt self.x * self.x + self.y * self.y
  }
}

pub fn distanceSquared(x: f32, y: f32): f32 {
  let point = Vec2 { x = x, y = y }
  rt point.lengthSquared()
}`},arrays:{file:'double.w',note:'A familiar loop. A little more possibility.',code:`// Give every element a little lift.
fn double(values: u32[]): u32[] {
  let output = make<u32[]>(values.len)

  for i in 0..values.len {
    output[i] = values[i] * 2
  }

  rt output
}`}};
let selectedExample='sum';
const escapeHTML=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function highlight(line){if(line.trim().startsWith('//'))return '<span class="token-comment">'+escapeHTML(line)+'</span>';return escapeHTML(line).replace(/\b(pub|fn|mut|let|while|for|in|rt|struct)\b|\b(i32|u32|f32|Vec2)\b|\b(\d+)\b/g,(m,k,t,n)=>'<span class="token-'+(k?'keyword':t?'type':'number')+'">'+m+'</span>')}
function showExample(key){selectedExample=key;const ex=examples[key];document.getElementById('filename').textContent=ex.file;document.getElementById('code-note').textContent=ex.note;document.getElementById('example-code').innerHTML=ex.code.split('\n').map((line,i)=>'<span class="code-line"><span class="line-no" aria-hidden="true">'+String(i+1).padStart(2,' ')+'</span>'+highlight(line)+'</span>').join('');document.querySelectorAll('[data-example]').forEach(b=>{const selected=b.dataset.example===key;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1});document.getElementById('example-panel').setAttribute('aria-labelledby','tab-'+key)}
document.querySelectorAll('[data-example]').forEach(b=>b.addEventListener('click',()=>showExample(b.dataset.example)));showExample('sum');
document.querySelectorAll('[role=tablist]').forEach(list=>list.addEventListener('keydown',e=>{const tabs=[...list.querySelectorAll('[role=tab]')];const i=tabs.indexOf(document.activeElement);if(i<0)return;let next=i;if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();tabs[next].focus();tabs[next].click()}));
let toastTimer;function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2500)}
async function copy(text){try{await navigator.clipboard.writeText(text);toast('Copied. Go make something wonderful.')}catch{toast('Select the text and copy it with your keyboard.')}}document.getElementById('copy-code').addEventListener('click',()=>copy(examples[selectedExample].code));
