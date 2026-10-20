'use strict';
const demos={
libero:{kind:'MANIPULATION · FAILURE RECOVERY',task:'Turn on the stove and place the moka pot.',steps:[
['Ground the task','Localize the moka pot and the stove, then approach the pot.','The pot and stove are visible; the pot has not been grasped.','observe_state() → localize_pixels() → move_arm()'],
['Attempt the grasp','Use the manipulation skill to grasp the moka pot.','The gripper is positioned above the pot.','vla_skill(…)'],
['Detect the failure','Recognize that the grasp failed before continuing the task.','The pot remains behind after the arm moves toward the stove.','move_arm(…)'],
['Revise the action order','Activate the stove before returning to the pot.','The stove is still off and the pot is not held.','localize_pixels(…) → move_arm(…) → vla_skill(…)'],
['Refine the target','Update the grasp cue from the current observation.','The stove is now on; the moka pot still needs to be grasped.','localize_pixels(…) → move_arm(…)'],
['Recover the grasp','Retry the grasp with the arm above the pot.','The new approach re-establishes a grasping opportunity.','vla_skill(…)'],
['Complete the placement','Transport the pot to the burner and release it.','The moka pot moves with the arm, providing evidence of a grasp.','move_arm(…) → release()'],
['Verify and finish','Check the final pot position and terminate the task.','The pot is on the stove and the completion condition is checked.','finish("success")']]},
robotwin:{kind:'BIMANUAL MANIPULATION · TASK PROGRESS',task:'Arrange the red, green, and blue blocks in a row.',steps:[
['Identify the targets','Find the three colored blocks and plan their row.','The red, green, and blue blocks are visible.','observe_state() → vla_skill(…)'],
['Place the first object','Move the grasped red block to the first slot.','The red block is held by the gripper.','move_arm(…) → release(left)'],
['Track partial completion','Keep the red placement and select green next.','The red block has been placed; the other two remain.','move_arm(…)'],
['Secure the second object','Grasp the green block and lift it clear.','The green block is selected as the next sub-goal.','vla_skill(…)'],
['Maintain grasp state','Keep green held while aligning it beside red.','The green block remains in the gripper.','move_arm(…) → vla_skill(…)'],
['Advance the sequence','Inspect the red–green alignment and select blue.','The first two blocks are aligned.','vla_skill(…)'],
['Transport the last object','Lift the blue block for the final placement.','The blue block is grasped.','move_arm(…) → release(right)'],
['Check the final row','Place blue last, check alignment, and finish.','The three blocks form the requested row.','finish("success")']]},
robocasa:{kind:'HOUSEHOLD MANIPULATION · RECOVERY',task:'Place the vegetables in the pot and stir them.',steps:[
['Ground the cooking task','Locate the pot and approach the vegetables.','The pot and target vegetables are visible.','observe_state() → vla_skill(…)'],
['Re-localize after deviation','Recheck the pepper position before another grasp.','The pepper is off target after the initial attempt.','localize_pixels(…) → move_arm(…)'],
['Retry the grasp','Position the gripper above the pepper and grasp again.','Renewed localization provides an updated target.','vla_skill(…)'],
['Preserve the completed sub-goal','Place the pepper in the pot and continue.','The pepper has reached the pot.','move_base(…) → vla_skill(…)'],
['Select the next vegetable','Find and reach the remaining vegetable.','The first placement is complete; another vegetable remains.','vla_skill(…)'],
['Change the manipulation context','Bring in the utensil after preparing the vegetables.','The sequence advances from vegetable handling to stirring.','vla_skill(…)'],
['Control the held utensil','Lower the utensil toward the pot.','The utensil is held by the gripper.','vla_skill(…)'],
['Verify and finish','Inspect the utensil in the pot and check the goal.','The final cooking-task state is visible.','finish("success")']]},
navigation:{kind:'INDOOR NAVIGATION · ORDERED LANDMARKS',task:'Navigate upstairs to the bathroom mirror.',steps:[
['Find the first landmark','Ascend the stairs to the landing.','The route leads toward the upstairs bedroom.','observe_state() → look_around() → follow_instruction(…)'],
['Ground the next destination','Target the bedroom from the landing.','The landing has been reached.','vln_ground(…) → nav_act(…)'],
['Follow the instruction order','Enter the bedroom and turn right by the bed.','The bedroom is entered and the bed is visible.','look_around() → vln_ground(…) → nav_act(…)'],
['Use the bed as a landmark','Continue past the bed toward the next sub-goal.','The bed provides a grounded intermediate landmark.','follow_instruction(…) → observe_state()'],
['Ground the closet','Turn right toward the closet entrance.','The closet is the next instructed sub-goal.','look_around() → vln_ground(…) → nav_act(…)'],
['Reach the bathroom','Cross the closet toward the bathroom.','The bathroom lies ahead.','follow_instruction(…) → observe_state()'],
['Approach the endpoint','Use the mirror as the final navigation target.','The bathroom mirror is visible.','vln_ground(…) → nav_act(…) → observe_state()'],
['Verify the stopping condition','Confirm arrival at the mirror and stop.','The agent has reached the requested endpoint.','observe_state() → finish("success")']]}
};
let activeDemo='libero',step=0,playTimer=null;
const $=id=>document.getElementById(id),dots=$('step-dots');
for(let i=0;i<8;i++){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Go to execution step ${i+1}`);b.addEventListener('click',()=>{stopPlayback();step=i;renderStep();});dots.appendChild(b);}
function renderStep(){const d=demos[activeDemo],s=d.steps[step];$('execution-image').src=`assets/${activeDemo}-${step+1}.webp?v=overleaf-20261020`;$('execution-image').alt=`${d.task} Step ${step+1}: ${s[2]}`;$('image-step').textContent=`${String(step+1).padStart(2,'0')} / 08`;$('demo-kind').textContent=d.kind;$('demo-task').textContent=d.task;$('step-label').textContent=`STEP ${String(step+1).padStart(2,'0')} — ${s[0].toUpperCase()}`;$('decision').textContent=s[1];$('evidence').textContent=s[2];$('tool-call').textContent=s[3];$('full-trace').href=`assets/trace-${activeDemo}.webp?v=overleaf-20261020`;[...dots.children].forEach((b,i)=>b.setAttribute('aria-current',String(i===step)));}
function stopPlayback(){if(playTimer)clearInterval(playTimer);playTimer=null;$('play-steps').innerHTML='Play keyframes <span aria-hidden="true">▶</span>';$('play-steps').setAttribute('aria-label','Play execution keyframes');}
$('play-steps').addEventListener('click',()=>{if(playTimer){stopPlayback();return;}if(step===7){step=0;renderStep();}$('play-steps').innerHTML='Pause keyframes <span aria-hidden="true">Ⅱ</span>';$('play-steps').setAttribute('aria-label','Pause execution keyframes');playTimer=setInterval(()=>{if(step===7){stopPlayback();return;}step++;renderStep();},1800);});
$('previous-step').addEventListener('click',()=>{stopPlayback();step=(step+7)%8;renderStep();});$('next-step').addEventListener('click',()=>{stopPlayback();step=(step+1)%8;renderStep();});
const tabs=[...document.querySelectorAll('[data-demo]')];
function selectDemo(t){stopPlayback();activeDemo=t.dataset.demo;step=0;tabs.forEach(b=>{const active=b===t;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});$('execution-panel').setAttribute('aria-labelledby',t.id);renderStep();}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectDemo(t));t.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;selectDemo(tabs[j]);tabs[j].focus();}});});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(other=>{other.classList.toggle('active',other===b);other.setAttribute('aria-pressed',String(other===b));});document.querySelectorAll('[data-domain]').forEach(row=>row.hidden=filter!=='all'&&row.dataset.domain!==filter);}));
$('copy-citation').addEventListener('click',async()=>{const text=$('bibtex').textContent;try{await navigator.clipboard.writeText(text);$('copy-status').textContent='Citation copied.';}catch{const range=document.createRange();range.selectNodeContents($('bibtex'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);$('copy-status').textContent='Citation selected. Use your browser’s copy command.';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlayback();});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.site-header nav a').forEach(a=>{if(a.getAttribute('href')===`#${e.target.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('section[id]').forEach(s=>observer.observe(s));}
renderStep();
