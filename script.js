// Write your JavaScript code here!

window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         const destination = document.getElementById("missionTarget");
         let i = Math.round(Math.random()*6);
         destination.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[i].name}</li>
               <li>Diameter: ${json[i].diameter}</li>
               <li>Star: ${json[i].star}</li>
               <li>Distance from Earth: ${json[i].distance}</li>
               <li>Number of Moons: ${json[i].moons}</li>
            </ol>
            <img src="${json[i].image}">
         `;
      });
   })

   let pilotNameInput = document.querySelector("input[name=pilotName]");
   let copilotNameInput = document.querySelector("input[name=copilotName]");
   let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
   let cargoMassInput = document.querySelector("input[name=cargoMass]");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchForm = document.getElementById("launchForm");
   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");

   launchForm.addEventListener("submit", function(event) {
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!")
         event.preventDefault();
      } else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value) || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Make sure to enter valid information for each field!");
         event.preventDefault();
      } else if (fuelLevelInput.value > 10000 && cargoMassInput.value < 10000) {
         launchStatus.innerHTML = "Shuttle is ready for launch";
         launchStatus.style.color = "green";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Copilot ${copilotNameInput.value} is ready for launch`;
         faultyItems.style.visibility = "visible";
         event.preventDefault();
      } else if (fuelLevelInput.value < 10000 && cargoMassInput.value < 10000) {
         fuelStatus.innerHTML = "Fuel too low for launch";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Copilot ${copilotNameInput.value} is ready for launch`;
         faultyItems.style.visibility = "visible";
         event.preventDefault();
      } else if (fuelLevelInput.value > 10000 && cargoMassInput.value > 10000) {
         cargoStatus.innerHTML = "Cargo too large for launch";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Copilot ${copilotNameInput.value} is ready for launch`;
         faultyItems.style.visibility = "visible";
         event.preventDefault();
      } else {
         fuelStatus.innerHTML = "Fuel too low for launch";
         cargoStatus.innerHTML = "Cargo too large for launch";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatus.innerHTML = `Copilot ${copilotNameInput.value} is ready for launch`;
         faultyItems.style.visibility = "visible";
         event.preventDefault();
      }
   });
});