let energyLevel = 0;
const maxEnergy = 100;

function increaseEnergy() {
    if (energyLevel < maxEnergy) {
        energyLevel += 10;
        updateEnergyMeter();
    } else {
        alert("Energy Full!");
    }
}

function updateEnergyMeter() {
    const energyFill = document.querySelector(".energy-fill");
    energyFill.style.width = `${energyLevel}%`;
}
