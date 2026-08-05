/*
  Tech stack: JavaScript
  Purpose: Loader, scroll progress, mobile menu, reveal animation, resume download, charts initialization, and contact form validation.
*/

function hideLoader() {
  const ldr = document.getElementById('ldr');
  if (ldr && !ldr.classList.contains('gone')) {
    ldr.classList.add('gone');
  }
}
window.addEventListener('load', () => setTimeout(hideLoader, 800));
setTimeout(hideLoader, 2500); // Fallback in case window load event is delayed by external scripts

window.addEventListener('scroll',()=>{
  const s=document.documentElement.scrollTop,h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  document.getElementById('prog').style.width=(s/h*100)+'%';
  document.getElementById('bt').classList.toggle('vis',s>400);
});

document.getElementById('ham').addEventListener('click',()=>document.getElementById('mob').classList.toggle('open'));
function closeMob(){document.getElementById('mob').classList.remove('open')}

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:0.05});
document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(el=>obs.observe(el));

document.getElementById('dlResume').addEventListener('click',()=>{
  const a=document.createElement('a');
  a.href='Ansh_Arora_Resume.docx';
  a.download='Ansh_Arora_Resume.docx';
  a.click();
});

function submitForm(){
  const n=document.getElementById('fn').value.trim();
  const e=document.getElementById('fe2').value.trim();
  const s=document.getElementById('fs').value.trim();
  const m=document.getElementById('fm').value.trim();
  const show=(id,v)=>document.getElementById(id).classList.toggle('show',v);
  show('fn-e',!n);show('fe2-e',!e||!/\S+@\S+\.\S+/.test(e));show('fs-e',!s);show('fm-e',!m);
  if(n&&e&&/\S+@\S+\.\S+/.test(e)&&s&&m){
    document.getElementById('fsuc').classList.add('show');
    ['fn','fe2','fs','fm'].forEach(id=>document.getElementById(id).value='');
    setTimeout(()=>document.getElementById('fsuc').classList.remove('show'),5000);
  }
}

// Typing animation for hero code
const lines=['likhai.py','gridguard.py','ragforge.ts','copilot.py','sensei.py','airpredict.py'];
let li=0;
const el=document.querySelector('.hc-file');
setInterval(()=>{li=(li+1)%lines.length;el.style.opacity='0';setTimeout(()=>{el.textContent=lines[li];el.style.opacity='1';},300)},3000);
el.style.transition='opacity 0.3s';

// GSAP Animations & UI/UX Pro Max Enhancements
window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Timeline
    const heroTl = gsap.timeline();
    heroTl.from('.hero-label', { opacity: 0, y: -20, duration: 0.6, ease: 'power3.out' })
          .from('.hero-name', { opacity: 0, y: 30, duration: 0.8, ease: 'power4.out' }, '-=0.3')
          .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
          .from('.hero-tags .tag', { opacity: 0, scale: 0.8, stagger: 0.1, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.3')
          .from('.hero-btns', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.2')
          .from('.hero-card', { opacity: 0, x: 40, duration: 0.8, ease: 'power3.out' }, '-=0.6');

    // ScrollTrigger for Section Headers
    gsap.utils.toArray('.sec-title').forEach(title => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // ScrollTrigger for Project Cards Stagger
    gsap.from('.proj-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });

    // ScrollTrigger for Skill Cards
    gsap.from('.skill-block', {
      scrollTrigger: {
        trigger: '.skills-left-col',
        start: 'top 80%',
      },
      opacity: 0,
      x: -40,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out'
    });

    // Experience Items Entrance
    gsap.from('.exp-item', {
      scrollTrigger: {
        trigger: '.exp-timeline',
        start: 'top 80%',
      },
      opacity: 0,
      x: 40,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
});

// Chart.js Data Visualizations
let radarChart;
let stackChart;

function initCharts() {
  const radarCtx = document.getElementById('radarChart').getContext('2d');
  radarChart = new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: ['AI & Machine Learning', 'Data Science & Analytics', 'Front-End Development', 'Back-End Development', 'Database Management', 'C++ Data Structures'],
      datasets: [{
        label: 'Domain Competency (%)',
        data: [85, 90, 80, 84, 85, 88],
        backgroundColor: 'rgba(245, 166, 35, 0.15)',
        borderColor: '#F5A623',
        pointBackgroundColor: '#F5A623',
        pointBorderColor: '#12151f',
        pointHoverBackgroundColor: '#12151f',
        pointHoverBorderColor: '#F5A623',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#d1d5db',
            font: { family: 'Outfit', size: 12 }
          }
        }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: {
            color: '#9ca3af',
            font: { family: 'Fira Code', size: 10 }
          },
          ticks: {
            backdropColor: 'transparent',
            color: '#9ca3af',
            font: { family: 'Fira Code', size: 8 },
            stepSize: 20
          },
          min: 0,
          max: 100
        }
      }
    }
  });

  const stackCtx = document.getElementById('stackChart').getContext('2d');
  stackChart = new Chart(stackCtx, {
    type: 'bar',
    data: {
      labels: ['RCA Copilot', 'StackSensei', 'LikhAI', 'GridGuard AI', 'AirPredict NYC'],
      datasets: [
        {
          label: 'AI & Machine Learning',
          data: [40, 30, 50, 40, 50],
          backgroundColor: '#7C3AED', // Violet
        },
        {
          label: 'Backend & APIs',
          data: [35, 30, 25, 35, 20],
          backgroundColor: '#F5A623', // Amber
        },
        {
          label: 'Frontend & UI',
          data: [25, 40, 25, 25, 15],
          backgroundColor: '#10B981', // Green
        },
        {
          label: 'Data Processing & Analytics',
          data: [0, 0, 0, 0, 15],
          backgroundColor: '#3B82F6', // Blue
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#d1d5db',
            font: { family: 'Outfit', size: 11 }
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#9ca3af',
            font: { family: 'Outfit', size: 11 }
          }
        },
        y: {
          stacked: true,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: {
            color: '#9ca3af',
            font: { family: 'Outfit', size: 11 }
          },
          title: {
            display: true,
            text: 'Complexity Contribution (%)',
            color: '#9ca3af',
            font: { family: 'Outfit', size: 11 }
          },
          max: 100
        }
      }
    }
  });
}

function switchChart(chartType) {
  const radar = document.getElementById('radarChart');
  const stack = document.getElementById('stackChart');
  const btnRadar = document.getElementById('btn-radar');
  const btnStack = document.getElementById('btn-stack');

  if (chartType === 'radar') {
    radar.style.display = 'block';
    stack.style.display = 'none';
    btnRadar.classList.add('active');
    btnStack.classList.remove('active');
  } else {
    radar.style.display = 'none';
    stack.style.display = 'block';
    btnRadar.classList.remove('active');
    btnStack.classList.add('active');
    stackChart.update();
  }
}

// Initialize charts after window loads
window.addEventListener('DOMContentLoaded', () => {
  initCharts();
});
