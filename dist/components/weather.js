var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// OpenWeather API 키
const apiKey = "ef9a3fd7529b1bab7269f2b2e156973c";
// // 브라우저에서 현재 위치를 가져오는 함수
export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        // Geolocation API가 지원되는지 확인
        navigator.geolocation
            ? navigator.geolocation.getCurrentPosition(
            // 위치 정보를 성공적으로 가져왔을 때 resolve 호출
            position => resolve(position.coords), 
            // 위치 정보를 가져오는 데 실패했을 때 reject 호출
            error => reject(error))
            // Geolocation API가 지원되지 않는 경우 reject 호출
            : reject(new Error('Geolocation is not supported by this browser.'));
    });
};
// 위도와 경도를 이용해 OpenWeather API에서 날씨 정보를 가져오는 함수
export const getWeather = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    // API 요청 URL 생성
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    try {
        console.log(`Fetching weather data from URL: ${url}`); // URL 확인
        // API 요청 보내기
        const response = yield fetch(url);
        // 응답이 성공적이지 않은 경우 에러 던지기
        if (!response.ok)
            throw new Error('Weather data could not be fetched');
        // 응답 데이터를 JSON 형태로 파싱
        const data = yield response.json();
        console.log('Weather data:', data); // 날씨 데이터를 콘솔에 출력
        return data;
    }
    catch (error) {
        console.error('Fetch error:', error); // 에러를 콘솔에 출력
        return null;
    }
});
const WeatherPhotoUrls = {
    default: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cloudy: "https://images.unsplash.com/photo-1532178910-7815d6919875?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    sunny: "https://images.unsplash.com/photo-1590372648787-fa5a935c2c40?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rainy: "https://images.unsplash.com/photo-1509635022432-0220ac12960b?q=80&w=1708&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    snow: "https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
// 날씨 설명에 따라 웹사이트의 배경색을 변경하는 함수
export const setWeatherTheme = (description) => {
    const body = document.body;
    console.log("제발여기에와주세요");
    // 날씨 설명에 따라 배경색 변경
    switch (description) {
        case 'clear sky':
            body.style.backgroundColor = '#87CEEB'; // 하늘색
            // body.style.backgroundImage= `url('${URL}')`;
            body.style.backgroundImage = `url('${WeatherPhotoUrls.sunny}')`;
            console.log("여기옴?");
            break;
        case 'few clouds':
        case 'scattered clouds':
        case 'broken clouds':
            body.style.backgroundImage = `url('${WeatherPhotoUrls.cloudy}')`;
            break;
        case 'overcast clouds':
            body.style.backgroundImage = `url('${WeatherPhotoUrls.cloudy}')`;
            break;
        case 'light rain':
        case 'moderate rain':
        case 'heavy intensity rain':
        case 'very heavy rain':
        case 'extreme rain':
            body.style.backgroundImage = `url('${WeatherPhotoUrls.rainy}')`;
            break;
        case 'thunderstorm with light rain':
        case 'thunderstorm with rain':
        case 'thunderstorm with heavy rain':
        case 'light thunderstorm':
        case 'thunderstorm':
        case 'heavy thunderstorm':
        case 'ragged thunderstorm':
            body.style.backgroundImage = `url('${WeatherPhotoUrls.rainy}')`;
            break;
        case 'snow':
        case 'light snow':
        case 'heavy snow':
            body.style.backgroundImage = `url('${WeatherPhotoUrls.snow}')`;
            break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'fog':
            body.style.backgroundImage = `url('${WeatherPhotoUrls.cloudy}')`;
            break;
        default:
            body.style.backgroundImage = `url('${WeatherPhotoUrls.default}')`;
    }
};
// 위치 정보를 가져오고, 날씨 정보를 가져와 UI를 업데이트하는 함수
export const fetchWeatherAndUpdateUI = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coords = yield getCurrentPosition();
        console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
        //이부분 로케이션아웃풋 엘리먼트 값을 가져오고있네
        // document.getElementById('locationOutput')!.textContent = `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`;
        const weather = yield getWeather(coords.latitude, coords.longitude);
        if (weather) {
            console.log('Weather response:', weather); // 날씨 응답 데이터 출력
            //이부분 웨더아웃풋 엘리먼트 값을 가져오고  있네
            console.log(`${weather.main.temp}°C ${weather.name}`);
            document.getElementById('currentLocation').textContent = `${weather.name}`;
            document.getElementById('currentTemperature').textContent = `${weather.main.temp}°C`;
            setWeatherTheme(weather.weather[0].description); // 웹사이트 색상 변경
        }
        else {
            console.log('Weather data could not be fetched.');
        }
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});
////////////////////////////
//# sourceMappingURL=weather.js.map