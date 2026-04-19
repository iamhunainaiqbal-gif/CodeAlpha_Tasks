const stepsInput = document.getElementById('stepsInput');
const workoutInput = document.getElementById('workoutInput');
const saveBtn = document.getElementById('saveEntryBtn');
const historyBody = document.getElementById('historyBody');
const clearBtn = document.getElementById('clearData');

let fitnessRecords = JSON.parse(localStorage.getItem('fitnessLogs')) || [];

const ctx = document.getElementById('progressChart').getContext('2d');
let myChart;

function updateApp() {
    renderTable();
    updateChart();
    localStorage.setItem('fitnessLogs', JSON.stringify(fitnessRecords));
}

saveBtn.addEventListener('click', () => {
    const steps = parseInt(stepsInput.value);
    const workout = parseInt(workoutInput.value);
    
    if (steps && workout) {
        const newEntry = {
            date: new Date().toLocaleDateString(),
            steps: steps,
            workout: workout,
            calories: Math.round((steps * 0.04) + (workout * 5)) 
        };
        fitnessRecords.unshift(newEntry);
        stepsInput.value = ''; workoutInput.value = '';
        updateApp();
    } else { alert("Please fill the data!"); }
});

function renderTable() {
    historyBody.innerHTML = '';
    fitnessRecords.forEach(record => {
        historyBody.innerHTML += `<tr>
            <td>${record.date}</td>
            <td>${record.steps}</td>
            <td>${record.workout} mins</td>
            <td>${record.calories} kcal</td>
        </tr>`;
    });
}

function updateChart() {
    const last7 = fitnessRecords.slice(0, 7).reverse();
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7.map(r => r.date),
            datasets: [{
                label: 'Steps Trend',
                data: last7.map(r => r.steps),
                borderColor: '#00cec9',
                backgroundColor: 'rgba(0, 206, 201, 0.1)',
                fill: true
            }]
        }
    });
}

clearBtn.addEventListener('click', () => {
    if(confirm("Reset all data?")) { fitnessRecords = []; updateApp(); }
});

updateApp();