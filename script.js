/*
  Tech stack: JavaScript
  Purpose: Loader, scroll progress, mobile menu, reveal animation, resume download, charts initialization, and contact form validation.
*/

window.addEventListener('load',()=>{setTimeout(()=>document.getElementById('ldr').classList.add('gone'),1500)});

window.addEventListener('scroll',()=>{
  const s=document.documentElement.scrollTop,h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  document.getElementById('prog').style.width=(s/h*100)+'%';
  document.getElementById('bt').classList.toggle('vis',s>400);
});

document.getElementById('ham').addEventListener('click',()=>document.getElementById('mob').classList.toggle('open'));
function closeMob(){document.getElementById('mob').classList.remove('open')}

const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:0.1});
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
const lines=['airpredict.py','copilot.py','sensei.py','consolidator.py'];
let li=0;
const el=document.querySelector('.hc-file');
setInterval(()=>{li=(li+1)%lines.length;el.style.opacity='0';setTimeout(()=>{el.textContent=lines[li];el.style.opacity='1';},300)},3000);
el.style.transition='opacity 0.3s';

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
      labels: ['RCA Copilot', 'StackSensei', 'AirPredict NYC', 'Data Consolidator'],
      datasets: [
        {
          label: 'AI & Machine Learning',
          data: [40, 30, 50, 10],
          backgroundColor: '#7C3AED', // Violet
        },
        {
          label: 'Backend & APIs',
          data: [35, 30, 20, 45],
          backgroundColor: '#F5A623', // Amber
        },
        {
          label: 'Frontend & UI',
          data: [25, 40, 15, 35],
          backgroundColor: '#10B981', // Green
        },
        {
          label: 'Data Processing & Analytics',
          data: [0, 0, 15, 10],
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
