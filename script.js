
  const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds" : "wi wi-day-cloudy",
    "Clear" : "wi wi-day-sunny",
    "Snow" : "wi wi-day-snow",
    "mist" : "wi wi-day-fog",
    "Drizzel": "wi wi-day-sleet",
  }

  function capitalize(str) {
    return str[0].toUpperCase()+str.slice(1);
  }

  async function main(withIp = true) {
    let ville;
  //   if(withIp) {
  //   //choper l'adresse  IP du pc qui ouvre la page : https://api.ipify.org?format=json
  //  const ip = await fetch('https://api.ipify.org?format=json')
  //  .then(resultat => resultat.json())
  //  .then(json => json.ip);

  //   ville = await fetch(`http://api.ipstack.com/${ip}?access_key=zqqH9MmNJBKYvf4q0hztthRZUdV8MUI5`)
  //      .then(resultat => resultat.json())
  //      .then(json => json.city);

  //   }
  //   else {
      ville=document.querySelector('#ville').textContent;
    // }

    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=42b4262fd1469697ccdbb1fbc6cfed13&lang=fr&units=metric`)
    .then(resultat =>resultat.json())
    .then(json => json)
    console.log(meteo);

    displayWeatherInfos(meteo);
   }

   function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const humidite = data.main.humidity;
    const vent=data.wind.speed;
    const pays=data.sys.country;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    const d = new Date();
    let month = d.toLocaleDateString();
    let time = d.toLocaleTimeString()

    /*function heure(id) {
    h = date.getHours();
    if(h<10)
    {
      h = "0"+h;
    }
      m = date.getMinutes();
    if(m<10)
    {
      m = "0"+m;
    }
    resultat = 'il est '+h+':'+m;
    document.getElementById(id).innerHTML = resultat;
    setTimeout(`heure("id")');
    return true;
  }*/

    document.querySelector('#ville').textContent=name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#condition').textContent = capitalize(description);
    document.querySelector('#humidite').textContent = humidite;
    document.querySelector('#wind').textContent = vent;
    document.querySelector('#country').textContent = pays;
    document.querySelector("#month").innerHTML = month;
    document.querySelector("#time").innerHTML = time;


    document.querySelector('i.wi').className = weatherIcons[conditions];
    document.body.className=conditions.toLowerCase();
  }
  

   const ville = document.querySelector('#ville');
      ville.addEventListener('click', () => {
      ville.contentEditable=true;
    });

      ville.addEventListener('keydown',(e) => {
        if(e.keyCode === 13) {
          e.preventDefault();
          ville.contentEditable=false;
          main(false);
        }
      })
main()

