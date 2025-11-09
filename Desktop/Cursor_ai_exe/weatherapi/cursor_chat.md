# 날씨 정보 웹앱 만들기
_Exported on 2025. 11. 9. at 14시 42분 23초 GMT+9 from Cursor (2.0.69)_

---

**User**

오늘과 내일, 모래까지의 날씨를 표시해주는 웹앱을 만들거야. https://www.weatherapi.com/ 에서 api를 활용해서 날씨정보를 제공하는 웹앱 코드 html, css, js 를 각각 만들어줘. 날씨정보는 지역별, 시간대별로 검색이 가능하도록 해주고. 날씨는 '섭씨(°C)'를 기준으로 작성해주고, 국내 공프장 주변 날씨도 검색이 가능하도록 만들수 있으면 해줘. 그리고 weatherapi 키값은 '55acefb25526411897050950250911'이야

---

**Cursor**

네, WeatherAPI를 활용한 날씨 웹앱을 만들어드리겠습니다. 오늘, 내일, 모레까지의 날씨를 지역별로 검색할 수 있고, 국내 주요 골프장 주변 날씨도 확인할 수 있는 앱을 제작하겠습니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>날씨 정보 - 3일 예보</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🌤️ 날씨 정보</h1>
            <p class="subtitle">오늘, 내일, 모레 날씨를 확인하세요</p>
        </header>

        <div class="search-section">
            <div class="search-box">
                <input type="text" id="locationInput" placeholder="지역명을 입력하세요 (예: Seoul, Busan)">
                <button id="searchBtn">검색</button>
            </div>
            
            <div class="quick-search">
                <h3>빠른 검색</h3>
                <div class="quick-buttons">
                    <button class="quick-btn" data-location="Seoul">서울</button>
                    <button class="quick-btn" data-location="Busan">부산</button>
                    <button class="quick-btn" data-location="Incheon">인천</button>
                    <button class="quick-btn" data-location="Jeju">제주</button>
                </div>
            </div>

            <div class="golf-section">
                <h3>⛳ 골프장 주변 날씨</h3>
                <div class="golf-buttons">
                    <button class="golf-btn" data-location="Yongin">용인 (용인CC 주변)</button>
                    <button class="golf-btn" data-location="Icheon">이천 (이천CC 주변)</button>
                    <button class="golf-btn" data-location="Yangju">양주 (양주CC 주변)</button>
                    <button class="golf-btn" data-location="Pocheon">포천 (포천CC 주변)</button>
                    <button class="golf-btn" data-location="Anseong">안성 (안성CC 주변)</button>
                    <button class="golf-btn" data-location="Yeoju">여주 (여주CC 주변)</button>
                    <button class="golf-btn" data-location="Gapyeong">가평 (가평CC 주변)</button>
                    <button class="golf-btn" data-location="Cheonan">천안 (천안CC 주변)</button>
                </div>
            </div>
        </div>

        <div id="loadingSpinner" class="loading hidden">
            <div class="spinner"></div>
            <p>날씨 정보를 불러오는 중...</p>
        </div>

        <div id="errorMessage" class="error-message hidden"></div>

        <div id="weatherContainer" class="weather-container hidden">
            <div class="location-info">
                <h2 id="locationName"></h2>
                <p id="locationDetails"></p>
                <p id="localTime"></p>
            </div>

            <div class="forecast-cards" id="forecastCards">
                <!-- 날씨 카드들이 여기에 동적으로 추가됩니다 -->
            </div>

            <div class="hourly-forecast-section">
                <h3>시간대별 날씨</h3>
                <div class="day-selector" id="daySelector">
                    <!-- 날짜 선택 버튼이 동적으로 추가됩니다 -->
                </div>
                <div class="hourly-scroll" id="hourlyForecast">
                    <!-- 시간대별 날씨가 여기에 동적으로 추가됩니다 -->
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p>Powered by <a href="https://www.weatherapi.com/" target="_blank">WeatherAPI.com</a></p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

header {
    text-align: center;
    color: white;
    margin-bottom: 30px;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

.search-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.search-box {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

#locationInput {
    flex: 1;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

#locationInput:focus {
    outline: none;
    border-color: #667eea;
}

#searchBtn {
    padding: 15px 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

#searchBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 1.1rem;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.quick-btn,
.golf-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.95rem;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
}

.golf-section {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 2px solid #f0f0f0;
}

.loading {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #ff5252;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(255, 82, 82, 0.3);
}

.weather-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.location-info {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.location-info h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
}

.location-info p {
    color: #666;
    font-size: 1rem;
}

#localTime {
    font-weight: bold;
    color: #667eea;
    margin-top: 5px;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.forecast-card:hover {
    transform: translateY(-5px);
}

.forecast-card.today {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}
```

```javascript
const API_KEY = '55acefb25526411897050950250911';
const API_BASE_URL = 'https://api.weatherapi.com/v1';

let currentForecastData = null;

// DOM 요소들
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherContainer = document.getElementById('weatherContainer');
const forecastCards = document.getElementById('forecastCards');
const hourlyForecast = document.getElementById('hourlyForecast');
const daySelector = document.getElementById('daySelector');
const locationName = document.getElementById('locationName');
const locationDetails = document.getElementById('locationDetails');
const localTime = document.getElementById('localTime');

// 이벤트 리스너
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value.trim();
        if (location) {
            getWeatherData(location);
        }
    }
});

// 빠른 검색 버튼
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const location = btn.getAttribute('data-location');
        locationInput.value = location;
        getWeatherData(location);
    });
});

// 골프장 버튼
document.querySelectorAll('.golf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const location = btn.getAttribute('data-location');
        locationInput.value = location;
        getWeatherData(location);
    });
});

// 날씨 데이터 가져오기
async function getWeatherData(location) {
    showLoading();
    hideError();
    hideWeather();

    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes&lang=ko`
        );

        if (!response.ok) {
            throw new Error('지역을 찾을 수 없습니다. 다시 시도해주세요.');
        }

        const data = await response.json();
        currentForecastData = data;
        displayWeatherData(data);
        hideLoading();
        showWeather();
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

// 날씨 데이터 표시
function displayWeatherData(data) {
    // 위치 정보 표시
    locationName.textContent = `${data.location.name}, ${data.location.country}`;
    locationDetails.textContent = `${data.location.region}`;
    localTime.textContent = `현지 시간: ${data.location.localtime}`;

    // 3일 예보 카드 표시
    displayForecastCards(data);

    // 시간대별 날씨 표시 (첫 번째 날)
    displayDaySelector(data);
    displayHourlyForecast(data.forecast.forecastday[0], 0);
}

// 3일 예보 카드 표시
function displayForecastCards(data) {
    forecastCards.innerHTML = '';

    const dayLabels = ['오늘', '내일', '모레'];
    const cardClasses = ['today', 'tomorrow', ''];

    data.forecast.forecastday.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = `forecast-card ${cardClasses[index]}`;

        const date = new Date(day.date);
        const dateStr = `${date.getMonth() + 1}월 ${date.getDate()}일`;
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

        card.innerHTML = `
            <div class="card-header">
                <div class="day-label">${dayLabels[index]}</div>
                <div class="date">${dateStr} (${dayOfWeek})</div>
            </div>
            <div class="weather-icon">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="condition">${day.day.condition.text}</div>
            <div class="temperature">${Math.round(day.day.avgtemp_c)}°C</div>
            <div class="temp-range">
                최고 ${Math.round(day.day.maxtemp_c)}°C / 최저 ${Math.round(day.day.mintemp_c)}°C
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">💧 습도</div>
                    <div class="detail-value">${day.day.avghumidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">💨 풍속</div>
                    <div class="detail-value">${Math.round(day.day.maxwind_kph)} km/h</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🌧️ 강수량</div>
                    <div class="detail-value">${day.day.totalprecip_mm} mm</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">☀️ UV 지수</div>
                    <div class="detail-value">${day.day.uv}</div>
                </div>
            </div>
        `;

        forecastCards.appendChild(card);
    });
}

// 날짜 선택 버튼 표시
function displayDaySelector(data) {
    daySelector.innerHTML = '';

    const dayLabels = ['오늘', '내일', '모레'];

    data.forecast.forecastday.forEach((day, index) => {
        const btn = document.createElement('button');
        btn.className = `day-select-btn ${index === 0 ? 'active' : ''}`;
        
        const date = new Date(day.date);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        
        btn.textContent = `${dayLabels[index]} (${dateStr})`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-select-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayHourlyForecast(day, index);
        });

        daySelector.appendChild(btn);
    });
}

// 시간대별 날씨 표시
function displayHourlyForecast(dayData, dayIndex) {
    hourlyForecast.innerHTML = '';

    // 현재 시간 가져오기
    const now = new Date();
    const currentHour = now.getHours();

    dayData.hour.forEach((hour, index) => {
        // 오늘인 경우 현재 시간 이후만 표시
        if (dayIndex === 0 && index < currentHour) {
            return;
        }

        const card = document.createElement('div');
        card.className = 'hourly-card';

        const time = new Date(hour.time);
        const timeStr = `${time.getHours()}:00`;

        card.innerHTML = `
            <div class="hourly-time">${timeStr}</div>
            <div class="hourly-icon">
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}">
            </div>
            <div class="hourly-temp">${Math.round(hour.temp_c)}°C</div>
            <div class="hourly-condition">${hour.condition.text}</div>
            <div class="hourly-details">
                💧 ${hour.humidity}%<br>
                💨 ${Math.round(hour.wind_kph)} km/h<br>
                🌧️ ${hour.precip_mm} mm
            </div>
        `;

        hourlyForecast.appendChild(card);
    });
}

// UI 헬퍼 함수들
function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showWeather() {
    weatherContainer.classList.remove('hidden');
}

function hideWeather() {
    weatherContainer.classList.add('hidden');
}

// 페이지 로드 시 서울 날씨 자동 표시
window.addEventListener('load', () => {
    locationInput.value = 'Seoul';
    getWeatherData('Seoul');
});
```

먼저 기존 파일들을 확인하고 작성하겠습니다.

파일들이 비어있네요. 이제 각 파일을 작성하겠습니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>날씨 정보 - 3일 예보</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🌤️ 날씨 정보</h1>
            <p class="subtitle">오늘, 내일, 모레 날씨를 확인하세요</p>
        </header>

        <div class="search-section">
            <div class="search-box">
                <input type="text" id="locationInput" placeholder="지역명을 입력하세요 (예: Seoul, Busan)">
                <button id="searchBtn">검색</button>
            </div>
            
            <div class="quick-search">
                <h3>빠른 검색</h3>
                <div class="quick-buttons">
                    <button class="quick-btn" data-location="Seoul">서울</button>
                    <button class="quick-btn" data-location="Busan">부산</button>
                    <button class="quick-btn" data-location="Incheon">인천</button>
                    <button class="quick-btn" data-location="Jeju">제주</button>
                </div>
            </div>

            <div class="golf-section">
                <h3>⛳ 골프장 주변 날씨</h3>
                <div class="golf-buttons">
                    <button class="golf-btn" data-location="Yongin">용인 (용인CC 주변)</button>
                    <button class="golf-btn" data-location="Icheon">이천 (이천CC 주변)</button>
                    <button class="golf-btn" data-location="Yangju">양주 (양주CC 주변)</button>
                    <button class="golf-btn" data-location="Pocheon">포천 (포천CC 주변)</button>
                    <button class="golf-btn" data-location="Anseong">안성 (안성CC 주변)</button>
                    <button class="golf-btn" data-location="Yeoju">여주 (여주CC 주변)</button>
                    <button class="golf-btn" data-location="Gapyeong">가평 (가평CC 주변)</button>
                    <button class="golf-btn" data-location="Cheonan">천안 (천안CC 주변)</button>
                </div>
            </div>
        </div>

        <div id="loadingSpinner" class="loading hidden">
            <div class="spinner"></div>
            <p>날씨 정보를 불러오는 중...</p>
        </div>

        <div id="errorMessage" class="error-message hidden"></div>

        <div id="weatherContainer" class="weather-container hidden">
            <div class="location-info">
                <h2 id="locationName"></h2>
                <p id="locationDetails"></p>
                <p id="localTime"></p>
            </div>

            <div class="forecast-cards" id="forecastCards">
                <!-- 날씨 카드들이 여기에 동적으로 추가됩니다 -->
            </div>

            <div class="hourly-forecast-section">
                <h3>시간대별 날씨</h3>
                <div class="day-selector" id="daySelector">
                    <!-- 날짜 선택 버튼이 동적으로 추가됩니다 -->
                </div>
                <div class="hourly-scroll" id="hourlyForecast">
                    <!-- 시간대별 날씨가 여기에 동적으로 추가됩니다 -->
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p>Powered by <a href="https://www.weatherapi.com/" target="_blank">WeatherAPI.com</a></p>
    </footer>

    <script src="script.js"></script>
</body>
</html>

```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

header {
    text-align: center;
    color: white;
    margin-bottom: 30px;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

.search-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.search-box {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

#locationInput {
    flex: 1;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

#locationInput:focus {
    outline: none;
    border-color: #667eea;
}

#searchBtn {
    padding: 15px 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

#searchBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 1.1rem;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.quick-btn,
.golf-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.95rem;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
}

.golf-section {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 2px solid #f0f0f0;
}

.loading {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #ff5252;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(255, 82, 82, 0.3);
}

.weather-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.location-info {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.location-info h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
}

.location-info p {
    color: #666;
    font-size: 1rem;
}

#localTime {
    font-weight: bold;
    color: #667eea;
    margin-top: 5px;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.forecast-card:hover {
    transform: translateY(-5px);
}

.forecast-card.today {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}

```

```javascript
const API_KEY = '55acefb25526411897050950250911';
const API_BASE_URL = 'https://api.weatherapi.com/v1';

let currentForecastData = null;

// DOM 요소들
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherContainer = document.getElementById('weatherContainer');
const forecastCards = document.getElementById('forecastCards');
const hourlyForecast = document.getElementById('hourlyForecast');
const daySelector = document.getElementById('daySelector');
const locationName = document.getElementById('locationName');
const locationDetails = document.getElementById('locationDetails');
const localTime = document.getElementById('localTime');

// 이벤트 리스너
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value.trim();
        if (location) {
            getWeatherData(location);
        }
    }
});

// 빠른 검색 버튼
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const location = btn.getAttribute('data-location');
        locationInput.value = location;
        getWeatherData(location);
    });
});

// 골프장 버튼
document.querySelectorAll('.golf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const location = btn.getAttribute('data-location');
        locationInput.value = location;
        getWeatherData(location);
    });
});

// 날씨 데이터 가져오기
async function getWeatherData(location) {
    showLoading();
    hideError();
    hideWeather();

    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes&lang=ko`
        );

        if (!response.ok) {
            throw new Error('지역을 찾을 수 없습니다. 다시 시도해주세요.');
        }

        const data = await response.json();
        currentForecastData = data;
        displayWeatherData(data);
        hideLoading();
        showWeather();
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

// 날씨 데이터 표시
function displayWeatherData(data) {
    // 위치 정보 표시
    locationName.textContent = `${data.location.name}, ${data.location.country}`;
    locationDetails.textContent = `${data.location.region}`;
    localTime.textContent = `현지 시간: ${data.location.localtime}`;

    // 3일 예보 카드 표시
    displayForecastCards(data);

    // 시간대별 날씨 표시 (첫 번째 날)
    displayDaySelector(data);
    displayHourlyForecast(data.forecast.forecastday[0], 0);
}

// 3일 예보 카드 표시
function displayForecastCards(data) {
    forecastCards.innerHTML = '';

    const dayLabels = ['오늘', '내일', '모레'];
    const cardClasses = ['today', 'tomorrow', ''];

    data.forecast.forecastday.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = `forecast-card ${cardClasses[index]}`;

        const date = new Date(day.date);
        const dateStr = `${date.getMonth() + 1}월 ${date.getDate()}일`;
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

        card.innerHTML = `
            <div class="card-header">
                <div class="day-label">${dayLabels[index]}</div>
                <div class="date">${dateStr} (${dayOfWeek})</div>
            </div>
            <div class="weather-icon">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="condition">${day.day.condition.text}</div>
            <div class="temperature">${Math.round(day.day.avgtemp_c)}°C</div>
            <div class="temp-range">
                최고 ${Math.round(day.day.maxtemp_c)}°C / 최저 ${Math.round(day.day.mintemp_c)}°C
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">💧 습도</div>
                    <div class="detail-value">${day.day.avghumidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">💨 풍속</div>
                    <div class="detail-value">${Math.round(day.day.maxwind_kph)} km/h</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🌧️ 강수량</div>
                    <div class="detail-value">${day.day.totalprecip_mm} mm</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">☀️ UV 지수</div>
                    <div class="detail-value">${day.day.uv}</div>
                </div>
            </div>
        `;

        forecastCards.appendChild(card);
    });
}

// 날짜 선택 버튼 표시
function displayDaySelector(data) {
    daySelector.innerHTML = '';

    const dayLabels = ['오늘', '내일', '모레'];

    data.forecast.forecastday.forEach((day, index) => {
        const btn = document.createElement('button');
        btn.className = `day-select-btn ${index === 0 ? 'active' : ''}`;
        
        const date = new Date(day.date);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        
        btn.textContent = `${dayLabels[index]} (${dateStr})`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-select-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayHourlyForecast(day, index);
        });

        daySelector.appendChild(btn);
    });
}

// 시간대별 날씨 표시
function displayHourlyForecast(dayData, dayIndex) {
    hourlyForecast.innerHTML = '';

    // 현재 시간 가져오기
    const now = new Date();
    const currentHour = now.getHours();

    dayData.hour.forEach((hour, index) => {
        // 오늘인 경우 현재 시간 이후만 표시
        if (dayIndex === 0 && index < currentHour) {
            return;
        }

        const card = document.createElement('div');
        card.className = 'hourly-card';

        const time = new Date(hour.time);
        const timeStr = `${time.getHours()}:00`;

        card.innerHTML = `
            <div class="hourly-time">${timeStr}</div>
            <div class="hourly-icon">
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}">
            </div>
            <div class="hourly-temp">${Math.round(hour.temp_c)}°C</div>
            <div class="hourly-condition">${hour.condition.text}</div>
            <div class="hourly-details">
                💧 ${hour.humidity}%<br>
                💨 ${Math.round(hour.wind_kph)} km/h<br>
                🌧️ ${hour.precip_mm} mm
            </div>
        `;

        hourlyForecast.appendChild(card);
    });
}

// UI 헬퍼 함수들
function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showWeather() {
    weatherContainer.classList.remove('hidden');
}

function hideWeather() {
    weatherContainer.classList.add('hidden');
}

// 페이지 로드 시 서울 날씨 자동 표시
window.addEventListener('load', () => {
    locationInput.value = 'Seoul';
    getWeatherData('Seoul');
});

```

완성되었습니다! 🎉 

WeatherAPI를 활용한 날씨 웹앱을 만들었습니다. 주요 기능은 다음과 같습니다:

## 📋 주요 기능

### 1. **3일 날씨 예보**
   - 오늘, 내일, 모레의 날씨 정보를 카드 형태로 표시
   - 각 카드에는 평균/최고/최저 온도, 습도, 풍속, 강수량, UV 지수 포함

### 2. **지역 검색**
   - 검색창에 원하는 지역명 입력 (한글, 영문 모두 가능)
   - Enter 키 또는 검색 버튼으로 검색

### 3. **빠른 검색**
   - 서울, 부산, 인천, 제주 등 주요 도시 원클릭 검색

### 4. **⛳ 골프장 주변 날씨**
   - 용인, 이천, 양주, 포천, 안성, 여주, 가평, 천안 등
   - 국내 주요 골프장 인근 지역 날씨 확인 가능

### 5. **시간대별 날씨**
   - 오늘/내일/모레 선택 가능
   - 각 날짜별 시간대별 상세 날씨 정보 (온도, 습도, 풍속, 강수량)
   - 가로 스크롤로 24시간 정보 확인

### 6. **섭씨(°C) 기준**
   - 모든 온도 정보가 섭씨로 표시됩니다

### 7. **반응형 디자인**
   - 모바일, 태블릿, PC 모든 기기에서 최적화된 화면

## 🎨 디자인 특징
- 그라데이션 배경과 현대적인 UI
- 각 날짜별로 다른 색상의 카드
- 부드러운 애니메이션 효과
- 직관적인 아이콘과 레이아웃

## 🚀 사용 방법
1. 웹 브라우저에서 `index.html` 파일을 열기
2. 페이지 로드 시 자동으로 서울 날씨가 표시됩니다
3. 원하는 지역을 검색하거나 빠른 검색 버튼 클릭
4. 시간대별 날씨는 날짜 선택 버튼으로 전환 가능

웹앱이 준비되었으니 바로 사용하실 수 있습니다! 🌤️

---

**User**

디자인을 https://www.weather.go.kr/w/index.do 사이트를 참고해서, 한눈에 보기 쉬운면서도 고급스러운 디자인으로 바꾸어주고, 지역을 선택하면 지역의 날씨를 쉽게 한눈에 볼수 있도록 온도, 상태(맑음, 비, 눈, 안개 등), 습도, 바람의 속도 등을 보여줘.

---

**Cursor**

네, 기상청 날씨누리 사이트를 참고하여 더 전문적이고 한눈에 보기 쉬운 디자인으로 개선하겠습니다. 깔끔하고 고급스러운 UI로 변경하겠습니다.

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.search-box {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

#locationInput {
    flex: 1;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

#locationInput:focus {
    outline: none;
    border-color: #667eea;
}

#searchBtn {
    padding: 15px 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

#searchBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 1.1rem;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.quick-btn,
.golf-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.95rem;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
}

.golf-section {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 2px solid #f0f0f0;
}

.loading {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #ff5252;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(255, 82, 82, 0.3);
}

.weather-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.location-info {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.location-info h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
}

.location-info p {
    color: #666;
    font-size: 1rem;
}

#localTime {
    font-weight: bold;
    color: #667eea;
    margin-top: 5px;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.forecast-card:hover {
    transform: translateY(-5px);
}

.forecast-card.today {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 15px;
    color: #333;
    font-size: 1.1rem;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.quick-btn,
.golf-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.95rem;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-2px);
}

.golf-section {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 2px solid #f0f0f0;
}

.loading {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #ff5252;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(255, 82, 82, 0.3);
}

.weather-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.location-info {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.location-info h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
}

.location-info p {
    color: #666;
    font-size: 1rem;
}

#localTime {
    font-weight: bold;
    color: #667eea;
    margin-top: 5px;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.forecast-card:hover {
    transform: translateY(-5px);
}

.forecast-card.today {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #667eea;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #ff5252;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(255, 82, 82, 0.3);
}

.weather-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.location-info {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.location-info h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
}

.location-info p {
    color: #666;
    font-size: 1rem;
}

#localTime {
    font-weight: bold;
    color: #667eea;
    margin-top: 5px;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.forecast-card:hover {
    transform: translateY(-5px);
}

.forecast-card.today {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 60px 40px;
    background: white;
    margin: 40px;
}

.spinner {
    border: 3px solid #f0f2f5;
    border-top: 3px solid #2a5298;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #dc3545;
    color: white;
    padding: 18px 40px;
    margin: 40px;
    text-align: center;
    border-left: 4px solid #c82333;
}

.weather-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.location-info {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #f0f0f0;
}

.location-info h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
}

.location-info p {
    color: #666;
    font-size: 1rem;
}

#localTime {
    font-weight: bold;
    color: #667eea;
    margin-top: 5px;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.forecast-card:hover {
    transform: translateY(-5px);
}

.forecast-card.today {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 60px 40px;
    background: white;
    margin: 40px;
}

.spinner {
    border: 3px solid #f0f2f5;
    border-top: 3px solid #2a5298;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #dc3545;
    color: white;
    padding: 18px 40px;
    margin: 40px;
    text-align: center;
    border-left: 4px solid #c82333;
}

.weather-container {
    background: white;
    padding: 40px;
    margin: 0;
}

.location-info {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 30px;
    margin: -40px -40px 30px -40px;
    border-bottom: 3px solid #2a5298;
}

.location-info h2 {
    font-size: 1.8rem;
    color: #1e3c72;
    margin-bottom: 8px;
    font-weight: 600;
}

.location-info p {
    color: #495057;
    font-size: 0.95rem;
}

#localTime {
    font-weight: 600;
    color: #2a5298;
    margin-top: 8px;
    font-size: 1rem;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.forecast-card:hover {
    transform: translateY(-5px);
}

.forecast-card.today {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 60px 40px;
    background: white;
    margin: 40px;
}

.spinner {
    border: 3px solid #f0f2f5;
    border-top: 3px solid #2a5298;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #dc3545;
    color: white;
    padding: 18px 40px;
    margin: 40px;
    text-align: center;
    border-left: 4px solid #c82333;
}

.weather-container {
    background: white;
    padding: 40px;
    margin: 0;
}

.location-info {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 30px;
    margin: -40px -40px 30px -40px;
    border-bottom: 3px solid #2a5298;
}

.location-info h2 {
    font-size: 1.8rem;
    color: #1e3c72;
    margin-bottom: 8px;
    font-weight: 600;
}

.location-info p {
    color: #495057;
    font-size: 0.95rem;
}

#localTime {
    font-weight: 600;
    color: #2a5298;
    margin-top: 8px;
    font-size: 1rem;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: white;
    border: 2px solid #e8eaed;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.2s;
}

.forecast-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    border-color: #2a5298;
}

.forecast-card.today {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    border-color: #1e3c72;
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #2a5298 0%, #4a7bc8 100%);
    color: white;
    border-color: #2a5298;
}

.card-header {
    text-align: center;
    margin-bottom: 20px;
}

.day-label {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.9;
}

.weather-icon {
    text-align: center;
    margin: 20px 0;
}

.weather-icon img {
    width: 80px;
    height: 80px;
}

.condition {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
}

.temperature {
    text-align: center;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: bold;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 60px 40px;
    background: white;
    margin: 40px;
}

.spinner {
    border: 3px solid #f0f2f5;
    border-top: 3px solid #2a5298;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #dc3545;
    color: white;
    padding: 18px 40px;
    margin: 40px;
    text-align: center;
    border-left: 4px solid #c82333;
}

.weather-container {
    background: white;
    padding: 40px;
    margin: 0;
}

.location-info {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 30px;
    margin: -40px -40px 30px -40px;
    border-bottom: 3px solid #2a5298;
}

.location-info h2 {
    font-size: 1.8rem;
    color: #1e3c72;
    margin-bottom: 8px;
    font-weight: 600;
}

.location-info p {
    color: #495057;
    font-size: 0.95rem;
}

#localTime {
    font-weight: 600;
    color: #2a5298;
    margin-top: 8px;
    font-size: 1rem;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: white;
    border: 2px solid #e8eaed;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.2s;
}

.forecast-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    border-color: #2a5298;
}

.forecast-card.today {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    border-color: #1e3c72;
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #2a5298 0%, #4a7bc8 100%);
    color: white;
    border-color: #2a5298;
}

.card-header {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .card-header {
    border-bottom-color: #e8eaed;
}

.day-label {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 6px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.85;
}

.weather-icon {
    text-align: center;
    margin: 25px 0;
}

.weather-icon img {
    width: 90px;
    height: 90px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.condition {
    text-align: center;
    font-size: 1.15rem;
    margin-bottom: 15px;
    font-weight: 500;
}

.temperature {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: -1px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.85;
    margin-bottom: 25px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .weather-details {
    border-top-color: #e8eaed;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-bottom: 6px;
    font-weight: 500;
}

.forecast-card:not(.today):not(.tomorrow) .detail-label {
    color: #6c757d;
}

.detail-value {
    font-size: 1.2rem;
    font-weight: 700;
}

.forecast-card:not(.today):not(.tomorrow) .detail-value {
    color: #2a5298;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid #f0f0f0;
}

.hourly-forecast-section h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5rem;
}

.day-selector {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.day-select-btn {
    padding: 10px 20px;
    background: #f5f5f5;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.day-select-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 60px 40px;
    background: white;
    margin: 40px;
}

.spinner {
    border: 3px solid #f0f2f5;
    border-top: 3px solid #2a5298;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #dc3545;
    color: white;
    padding: 18px 40px;
    margin: 40px;
    text-align: center;
    border-left: 4px solid #c82333;
}

.weather-container {
    background: white;
    padding: 40px;
    margin: 0;
}

.location-info {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 30px;
    margin: -40px -40px 30px -40px;
    border-bottom: 3px solid #2a5298;
}

.location-info h2 {
    font-size: 1.8rem;
    color: #1e3c72;
    margin-bottom: 8px;
    font-weight: 600;
}

.location-info p {
    color: #495057;
    font-size: 0.95rem;
}

#localTime {
    font-weight: 600;
    color: #2a5298;
    margin-top: 8px;
    font-size: 1rem;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: white;
    border: 2px solid #e8eaed;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.2s;
}

.forecast-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    border-color: #2a5298;
}

.forecast-card.today {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    border-color: #1e3c72;
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #2a5298 0%, #4a7bc8 100%);
    color: white;
    border-color: #2a5298;
}

.card-header {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .card-header {
    border-bottom-color: #e8eaed;
}

.day-label {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 6px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.85;
}

.weather-icon {
    text-align: center;
    margin: 25px 0;
}

.weather-icon img {
    width: 90px;
    height: 90px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.condition {
    text-align: center;
    font-size: 1.15rem;
    margin-bottom: 15px;
    font-weight: 500;
}

.temperature {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: -1px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.85;
    margin-bottom: 25px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .weather-details {
    border-top-color: #e8eaed;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-bottom: 6px;
    font-weight: 500;
}

.forecast-card:not(.today):not(.tomorrow) .detail-label {
    color: #6c757d;
}

.detail-value {
    font-size: 1.2rem;
    font-weight: 700;
}

.forecast-card:not(.today):not(.tomorrow) .detail-value {
    color: #2a5298;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 35px;
    border-top: 3px solid #e8eaed;
}

.hourly-forecast-section h3 {
    text-align: left;
    margin-bottom: 20px;
    color: #1e3c72;
    font-size: 1.4rem;
    font-weight: 600;
}

.day-selector {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 25px;
}

.day-select-btn {
    padding: 10px 24px;
    background: white;
    border: 2px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    font-weight: 500;
    color: #495057;
}

.day-select-btn.active {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 20px 0;
}

.hourly-scroll::-webkit-scrollbar {
    height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 10px;
}

.hourly-card {
    min-width: 120px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.hourly-time {
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 0.95rem;
}

.hourly-icon img {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

.hourly-temp {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 10px 0;
}

.hourly-condition {
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

.hourly-details {
    font-size: 0.8rem;
    opacity: 0.8;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 60px 40px;
    background: white;
    margin: 40px;
}

.spinner {
    border: 3px solid #f0f2f5;
    border-top: 3px solid #2a5298;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #dc3545;
    color: white;
    padding: 18px 40px;
    margin: 40px;
    text-align: center;
    border-left: 4px solid #c82333;
}

.weather-container {
    background: white;
    padding: 40px;
    margin: 0;
}

.location-info {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 30px;
    margin: -40px -40px 30px -40px;
    border-bottom: 3px solid #2a5298;
}

.location-info h2 {
    font-size: 1.8rem;
    color: #1e3c72;
    margin-bottom: 8px;
    font-weight: 600;
}

.location-info p {
    color: #495057;
    font-size: 0.95rem;
}

#localTime {
    font-weight: 600;
    color: #2a5298;
    margin-top: 8px;
    font-size: 1rem;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: white;
    border: 2px solid #e8eaed;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.2s;
}

.forecast-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    border-color: #2a5298;
}

.forecast-card.today {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    border-color: #1e3c72;
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #2a5298 0%, #4a7bc8 100%);
    color: white;
    border-color: #2a5298;
}

.card-header {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .card-header {
    border-bottom-color: #e8eaed;
}

.day-label {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 6px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.85;
}

.weather-icon {
    text-align: center;
    margin: 25px 0;
}

.weather-icon img {
    width: 90px;
    height: 90px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.condition {
    text-align: center;
    font-size: 1.15rem;
    margin-bottom: 15px;
    font-weight: 500;
}

.temperature {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: -1px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.85;
    margin-bottom: 25px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .weather-details {
    border-top-color: #e8eaed;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-bottom: 6px;
    font-weight: 500;
}

.forecast-card:not(.today):not(.tomorrow) .detail-label {
    color: #6c757d;
}

.detail-value {
    font-size: 1.2rem;
    font-weight: 700;
}

.forecast-card:not(.today):not(.tomorrow) .detail-value {
    color: #2a5298;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 35px;
    border-top: 3px solid #e8eaed;
}

.hourly-forecast-section h3 {
    text-align: left;
    margin-bottom: 20px;
    color: #1e3c72;
    font-size: 1.4rem;
    font-weight: 600;
}

.day-selector {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 25px;
}

.day-select-btn {
    padding: 10px 24px;
    background: white;
    border: 2px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    font-weight: 500;
    color: #495057;
}

.day-select-btn.active {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding: 20px 5px;
}

.hourly-scroll::-webkit-scrollbar {
    height: 6px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 3px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #2a5298;
    border-radius: 3px;
}

.hourly-card {
    min-width: 130px;
    background: white;
    border: 1px solid #e8eaed;
    border-radius: 6px;
    padding: 18px 12px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    transition: all 0.2s;
}

.hourly-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #2a5298;
}

.hourly-time {
    font-weight: 700;
    margin-bottom: 12px;
    font-size: 1rem;
    color: #1e3c72;
}

.hourly-icon img {
    width: 55px;
    height: 55px;
    margin: 12px 0;
}

.hourly-temp {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 12px 0;
    color: #2a5298;
}

.hourly-condition {
    font-size: 0.88rem;
    margin-bottom: 12px;
    color: #495057;
    font-weight: 500;
}

.hourly-details {
    font-size: 0.8rem;
    color: #6c757d;
    line-height: 1.6;
}

footer {
    text-align: center;
    color: white;
    margin-top: 30px;
    padding: 20px;
}

footer a {
    color: white;
    text-decoration: underline;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 2rem;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: center;
    }
}


```

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
    background: #f5f7fa;
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
}

header {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 25px 40px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    margin-bottom: 0;
}

header h1 {
    font-size: 1.8rem;
    margin-bottom: 5px;
    font-weight: 600;
    letter-spacing: -0.5px;
}

.subtitle {
    font-size: 0.95rem;
    opacity: 0.95;
    font-weight: 300;
}

.search-section {
    background: white;
    padding: 30px 40px;
    margin-bottom: 0;
    border-bottom: 1px solid #e8eaed;
}

.search-box {
    display: flex;
    gap: 12px;
    margin-bottom: 25px;
    max-width: 800px;
}

#locationInput {
    flex: 1;
    padding: 14px 18px;
    border: 2px solid #dde1e6;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.2s;
    background: #fafbfc;
}

#locationInput:focus {
    outline: none;
    border-color: #2a5298;
    background: white;
}

#searchBtn {
    padding: 14px 32px;
    background: #2a5298;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

#searchBtn:hover {
    background: #1e3c72;
    box-shadow: 0 2px 8px rgba(42, 82, 152, 0.3);
}

.quick-search h3,
.golf-section h3 {
    margin-bottom: 12px;
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 600;
}

.quick-buttons,
.golf-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.quick-btn,
.golf-btn {
    padding: 8px 18px;
    background: white;
    border: 1px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
    color: #495057;
}

.quick-btn:hover,
.golf-btn:hover {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.golf-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e8eaed;
}

.loading {
    text-align: center;
    padding: 60px 40px;
    background: white;
    margin: 40px;
}

.spinner {
    border: 3px solid #f0f2f5;
    border-top: 3px solid #2a5298;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.hidden {
    display: none;
}

.error-message {
    background: #dc3545;
    color: white;
    padding: 18px 40px;
    margin: 40px;
    text-align: center;
    border-left: 4px solid #c82333;
}

.weather-container {
    background: white;
    padding: 40px;
    margin: 0;
}

.location-info {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 30px;
    margin: -40px -40px 30px -40px;
    border-bottom: 3px solid #2a5298;
}

.location-info h2 {
    font-size: 1.8rem;
    color: #1e3c72;
    margin-bottom: 8px;
    font-weight: 600;
}

.location-info p {
    color: #495057;
    font-size: 0.95rem;
}

#localTime {
    font-weight: 600;
    color: #2a5298;
    margin-top: 8px;
    font-size: 1rem;
}

.forecast-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.forecast-card {
    background: white;
    border: 2px solid #e8eaed;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    transition: all 0.2s;
}

.forecast-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    border-color: #2a5298;
}

.forecast-card.today {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    border-color: #1e3c72;
}

.forecast-card.tomorrow {
    background: linear-gradient(135deg, #2a5298 0%, #4a7bc8 100%);
    color: white;
    border-color: #2a5298;
}

.card-header {
    text-align: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .card-header {
    border-bottom-color: #e8eaed;
}

.day-label {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 6px;
}

.date {
    font-size: 0.9rem;
    opacity: 0.85;
}

.weather-icon {
    text-align: center;
    margin: 25px 0;
}

.weather-icon img {
    width: 90px;
    height: 90px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.condition {
    text-align: center;
    font-size: 1.15rem;
    margin-bottom: 15px;
    font-weight: 500;
}

.temperature {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
    letter-spacing: -1px;
}

.temp-range {
    text-align: center;
    font-size: 1rem;
    opacity: 0.85;
    margin-bottom: 25px;
}

.weather-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 18px;
    padding-top: 20px;
    border-top: 1px solid rgba(0,0,0,0.1);
}

.forecast-card:not(.today):not(.tomorrow) .weather-details {
    border-top-color: #e8eaed;
}

.detail-item {
    text-align: center;
}

.detail-label {
    font-size: 0.85rem;
    opacity: 0.75;
    margin-bottom: 6px;
    font-weight: 500;
}

.forecast-card:not(.today):not(.tomorrow) .detail-label {
    color: #6c757d;
}

.detail-value {
    font-size: 1.2rem;
    font-weight: 700;
}

.forecast-card:not(.today):not(.tomorrow) .detail-value {
    color: #2a5298;
}

.hourly-forecast-section {
    margin-top: 40px;
    padding-top: 35px;
    border-top: 3px solid #e8eaed;
}

.hourly-forecast-section h3 {
    text-align: left;
    margin-bottom: 20px;
    color: #1e3c72;
    font-size: 1.4rem;
    font-weight: 600;
}

.day-selector {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 25px;
}

.day-select-btn {
    padding: 10px 24px;
    background: white;
    border: 2px solid #dde1e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.95rem;
    font-weight: 500;
    color: #495057;
}

.day-select-btn.active {
    background: #2a5298;
    color: white;
    border-color: #2a5298;
}

.hourly-scroll {
    display: flex;
    overflow-x: auto;
    gap: 12px;
    padding: 20px 5px;
}

.hourly-scroll::-webkit-scrollbar {
    height: 6px;
}

.hourly-scroll::-webkit-scrollbar-track {
    background: #f0f2f5;
    border-radius: 3px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
    background: #2a5298;
    border-radius: 3px;
}

.hourly-card {
    min-width: 130px;
    background: white;
    border: 1px solid #e8eaed;
    border-radius: 6px;
    padding: 18px 12px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    transition: all 0.2s;
}

.hourly-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #2a5298;
}

.hourly-time {
    font-weight: 700;
    margin-bottom: 12px;
    font-size: 1rem;
    color: #1e3c72;
}

.hourly-icon img {
    width: 55px;
    height: 55px;
    margin: 12px 0;
}

.hourly-temp {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 12px 0;
    color: #2a5298;
}

.hourly-condition {
    font-size: 0.88rem;
    margin-bottom: 12px;
    color: #495057;
    font-weight: 500;
}

.hourly-details {
    font-size: 0.8rem;
    color: #6c757d;
    line-height: 1.6;
}

footer {
    text-align: center;
    background: #2c3e50;
    color: #ecf0f1;
    margin-top: 0;
    padding: 30px 20px;
    font-size: 0.9rem;
}

footer a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

footer a:hover {
    text-decoration: underline;
}

/* 현재 날씨 요약 섹션 */
.current-weather-summary {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 40px;
    margin: -40px -40px 30px -40px;
    border-radius: 0;
}

.current-main {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-bottom: 30px;
}

.current-temp-section {
    text-align: center;
}

.current-temp {
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 10px;
}

.current-condition {
    font-size: 1.3rem;
    opacity: 0.95;
    margin-bottom: 10px;
}

.current-icon img {
    width: 120px;
    height: 120px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
}

.current-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    padding-top: 25px;
    border-top: 1px solid rgba(255,255,255,0.2);
}

.current-detail-item {
    text-align: center;
}

.current-detail-label {
    font-size: 0.9rem;
    opacity: 0.85;
    margin-bottom: 8px;
}

.current-detail-value {
    font-size: 1.4rem;
    font-weight: 700;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 1.5rem;
    }
    
    header, .search-section, .weather-container {
        padding: 20px;
    }
    
    .forecast-cards {
        grid-template-columns: 1fr;
    }
    
    .search-box {
        flex-direction: column;
    }
    
    .quick-buttons,
    .golf-buttons {
        justify-content: flex-start;
    }
    
    .current-main {
        flex-direction: column;
        gap: 20px;
    }
    
    .current-temp {
        font-size: 3.5rem;
    }
    
    .current-icon img {
        width: 100px;
        height: 100px;
    }
    
    .location-info {
        margin: -20px -20px 20px -20px;
        padding: 20px;
    }
}


```

```javascript
const API_KEY = '55acefb25526411897050950250911';
const API_BASE_URL = 'https://api.weatherapi.com/v1';

let currentForecastData = null;

// DOM 요소들
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherContainer = document.getElementById('weatherContainer');
const forecastCards = document.getElementById('forecastCards');
const hourlyForecast = document.getElementById('hourlyForecast');
const daySelector = document.getElementById('daySelector');
const locationName = document.getElementById('locationName');
const locationDetails = document.getElementById('locationDetails');
const localTime = document.getElementById('localTime');

// 이벤트 리스너
searchBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherData(location);
    }
});

locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationInput.value.trim();
        if (location) {
            getWeatherData(location);
        }
    }
});

// 빠른 검색 버튼
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const location = btn.getAttribute('data-location');
        locationInput.value = location;
        getWeatherData(location);
    });
});

// 골프장 버튼
document.querySelectorAll('.golf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const location = btn.getAttribute('data-location');
        locationInput.value = location;
        getWeatherData(location);
    });
});

// 날씨 데이터 가져오기
async function getWeatherData(location) {
    showLoading();
    hideError();
    hideWeather();

    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=3&aqi=yes&lang=ko`
        );

        if (!response.ok) {
            throw new Error('지역을 찾을 수 없습니다. 다시 시도해주세요.');
        }

        const data = await response.json();
        currentForecastData = data;
        displayWeatherData(data);
        hideLoading();
        showWeather();
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

// 날씨 데이터 표시
function displayWeatherData(data) {
    // 위치 정보 표시
    locationName.textContent = `${data.location.name}, ${data.location.country}`;
    locationDetails.textContent = `${data.location.region}`;
    localTime.textContent = `📅 ${data.location.localtime}`;

    // 현재 날씨 요약 표시
    displayCurrentWeather(data);

    // 3일 예보 카드 표시
    displayForecastCards(data);

    // 시간대별 날씨 표시 (첫 번째 날)
    displayDaySelector(data);
    displayHourlyForecast(data.forecast.forecastday[0], 0);
}

// 현재 날씨 요약 표시
function displayCurrentWeather(data) {
    const current = data.current;
    
    // 기존 요약 섹션이 있으면 제거
    const existingSummary = document.querySelector('.current-weather-summary');
    if (existingSummary) {
        existingSummary.remove();
    }
    
    // 새로운 요약 섹션 생성
    const summarySection = document.createElement('div');
    summarySection.className = 'current-weather-summary';
    
    summarySection.innerHTML = `
        <div class="current-main">
            <div class="current-temp-section">
                <div class="current-temp">${Math.round(current.temp_c)}°C</div>
                <div class="current-condition">${current.condition.text}</div>
                <div style="font-size: 0.95rem; opacity: 0.85;">
                    체감 ${Math.round(current.feelslike_c)}°C
                </div>
            </div>
            <div class="current-icon">
                <img src="https:${current.condition.icon}" alt="${current.condition.text}">
            </div>
        </div>
        <div class="current-details-grid">
            <div class="current-detail-item">
                <div class="current-detail-label">💧 습도</div>
                <div class="current-detail-value">${current.humidity}%</div>
            </div>
            <div class="current-detail-item">
                <div class="current-detail-label">💨 풍속</div>
                <div class="current-detail-value">${Math.round(current.wind_kph)} km/h</div>
            </div>
            <div class="current-detail-item">
                <div class="current-detail-label">🌡️ 기압</div>
                <div class="current-detail-value">${current.pressure_mb} hPa</div>
            </div>
            <div class="current-detail-item">
                <div class="current-detail-label">👁️ 가시거리</div>
                <div class="current-detail-value">${current.vis_km} km</div>
            </div>
            <div class="current-detail-item">
                <div class="current-detail-label">☁️ 구름</div>
                <div class="current-detail-value">${current.cloud}%</div>
            </div>
            <div class="current-detail-item">
                <div class="current-detail-label">☀️ UV 지수</div>
                <div class="current-detail-value">${current.uv}</div>
            </div>
        </div>
    `;
    
    // location-info 다음에 삽입
    const locationInfo = document.querySelector('.location-info');
    locationInfo.insertAdjacentElement('afterend', summarySection);
}

// 3일 예보 카드 표시
function displayForecastCards(data) {
    forecastCards.innerHTML = '';

    const dayLabels = ['오늘', '내일', '모레'];
    const cardClasses = ['today', 'tomorrow', ''];

    data.forecast.forecastday.forEach((day, index) => {
        const card = document.createElement('div');
        card.className = `forecast-card ${cardClasses[index]}`;

        const date = new Date(day.date);
        const dateStr = `${date.getMonth() + 1}월 ${date.getDate()}일`;
        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

        card.innerHTML = `
            <div class="card-header">
                <div class="day-label">${dayLabels[index]}</div>
                <div class="date">${dateStr} (${dayOfWeek})</div>
            </div>
            <div class="weather-icon">
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="condition">${day.day.condition.text}</div>
            <div class="temperature">${Math.round(day.day.avgtemp_c)}°C</div>
            <div class="temp-range">
                최고 ${Math.round(day.day.maxtemp_c)}°C / 최저 ${Math.round(day.day.mintemp_c)}°C
            </div>
            <div class="weather-details">
                <div class="detail-item">
                    <div class="detail-label">💧 습도</div>
                    <div class="detail-value">${day.day.avghumidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">💨 풍속</div>
                    <div class="detail-value">${Math.round(day.day.maxwind_kph)} km/h</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🌧️ 강수량</div>
                    <div class="detail-value">${day.day.totalprecip_mm} mm</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">☀️ UV 지수</div>
                    <div class="detail-value">${day.day.uv}</div>
                </div>
            </div>
        `;

        forecastCards.appendChild(card);
    });
}

// 날짜 선택 버튼 표시
function displayDaySelector(data) {
    daySelector.innerHTML = '';

    const dayLabels = ['오늘', '내일', '모레'];

    data.forecast.forecastday.forEach((day, index) => {
        const btn = document.createElement('button');
        btn.className = `day-select-btn ${index === 0 ? 'active' : ''}`;
        
        const date = new Date(day.date);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        
        btn.textContent = `${dayLabels[index]} (${dateStr})`;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.day-select-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayHourlyForecast(day, index);
        });

        daySelector.appendChild(btn);
    });
}

// 시간대별 날씨 표시
function displayHourlyForecast(dayData, dayIndex) {
    hourlyForecast.innerHTML = '';

    // 현재 시간 가져오기
    const now = new Date();
    const currentHour = now.getHours();

    dayData.hour.forEach((hour, index) => {
        // 오늘인 경우 현재 시간 이후만 표시
        if (dayIndex === 0 && index < currentHour) {
            return;
        }

        const card = document.createElement('div');
        card.className = 'hourly-card';

        const time = new Date(hour.time);
        const timeStr = `${time.getHours()}:00`;

        card.innerHTML = `
            <div class="hourly-time">${timeStr}</div>
            <div class="hourly-icon">
                <img src="https:${hour.condition.icon}" alt="${hour.condition.text}">
            </div>
            <div class="hourly-temp">${Math.round(hour.temp_c)}°C</div>
            <div class="hourly-condition">${hour.condition.text}</div>
            <div class="hourly-details">
                💧 ${hour.humidity}%<br>
                💨 ${Math.round(hour.wind_kph)} km/h<br>
                🌧️ ${hour.precip_mm} mm
            </div>
        `;

        hourlyForecast.appendChild(card);
    });
}

// UI 헬퍼 함수들
function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showWeather() {
    weatherContainer.classList.remove('hidden');
}

function hideWeather() {
    weatherContainer.classList.add('hidden');
}

// 페이지 로드 시 서울 날씨 자동 표시
window.addEventListener('load', () => {
    locationInput.value = 'Seoul';
    getWeatherData('Seoul');
});


```

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>날씨 정보 - 3일 예보</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🌤️ 날씨정보 | Weather Forecast</h1>
            <p class="subtitle">전국 날씨 · 3일 예보 · 시간대별 상세정보</p>
        </header>

        <div class="search-section">
            <div class="search-box">
                <input type="text" id="locationInput" placeholder="지역명을 입력하세요 (예: Seoul, Busan)">
                <button id="searchBtn">검색</button>
            </div>
            
            <div class="quick-search">
                <h3>빠른 검색</h3>
                <div class="quick-buttons">
                    <button class="quick-btn" data-location="Seoul">서울</button>
                    <button class="quick-btn" data-location="Busan">부산</button>
                    <button class="quick-btn" data-location="Incheon">인천</button>
                    <button class="quick-btn" data-location="Jeju">제주</button>
                </div>
            </div>

            <div class="golf-section">
                <h3>⛳ 골프장 주변 날씨</h3>
                <div class="golf-buttons">
                    <button class="golf-btn" data-location="Yongin">용인 (용인CC 주변)</button>
                    <button class="golf-btn" data-location="Icheon">이천 (이천CC 주변)</button>
                    <button class="golf-btn" data-location="Yangju">양주 (양주CC 주변)</button>
                    <button class="golf-btn" data-location="Pocheon">포천 (포천CC 주변)</button>
                    <button class="golf-btn" data-location="Anseong">안성 (안성CC 주변)</button>
                    <button class="golf-btn" data-location="Yeoju">여주 (여주CC 주변)</button>
                    <button class="golf-btn" data-location="Gapyeong">가평 (가평CC 주변)</button>
                    <button class="golf-btn" data-location="Cheonan">천안 (천안CC 주변)</button>
                </div>
            </div>
        </div>

        <div id="loadingSpinner" class="loading hidden">
            <div class="spinner"></div>
            <p>날씨 정보를 불러오는 중...</p>
        </div>

        <div id="errorMessage" class="error-message hidden"></div>

        <div id="weatherContainer" class="weather-container hidden">
            <div class="location-info">
                <h2 id="locationName"></h2>
                <p id="locationDetails"></p>
                <p id="localTime"></p>
            </div>

            <div class="forecast-cards" id="forecastCards">
                <!-- 날씨 카드들이 여기에 동적으로 추가됩니다 -->
            </div>

            <div class="hourly-forecast-section">
                <h3>시간대별 날씨</h3>
                <div class="day-selector" id="daySelector">
                    <!-- 날짜 선택 버튼이 동적으로 추가됩니다 -->
                </div>
                <div class="hourly-scroll" id="hourlyForecast">
                    <!-- 시간대별 날씨가 여기에 동적으로 추가됩니다 -->
                </div>
            </div>
        </div>
    </div>

    <footer>
        <p>Powered by <a href="https://www.weatherapi.com/" target="_blank">WeatherAPI.com</a></p>
    </footer>

    <script src="script.js"></script>
</body>
</html>


```

완료되었습니다! 🎉 

기상청 날씨누리 사이트를 참고하여 전문적이고 고급스러운 디자인으로 완전히 개선했습니다.

## 🎨 주요 디자인 개선 사항

### 1. **전문적인 색상 체계**
   - 기상청 스타일의 블루 계열 색상 (#1e3c72, #2a5298)
   - 깔끔한 흰색 배경 (#f5f7fa)
   - 고급스러운 그라데이션 효과

### 2. **현재 날씨 한눈에 보기** ⭐
   - 대형 온도 표시 (4.5rem)
   - 현재 날씨 상태 (맑음, 비, 눈 등)
   - 체감 온도 표시
   - 6가지 주요 정보를 그리드로 표시:
     * 💧 습도
     * 💨 풍속 (km/h)
     * 🌡️ 기압 (hPa)
     * 👁️ 가시거리 (km)
     * ☁️ 구름 (%)
     * ☀️ UV 지수

### 3. **개선된 3일 예보 카드**
   - 오늘/내일은 블루 그라데이션으로 강조
   - 모레는 흰색 배경에 블루 테두리
   - 각 카드에 온도, 상태, 습도, 풍속, 강수량, UV 지수 표시
   - 호버 효과로 인터랙티브한 느낌

### 4. **시간대별 날씨**
   - 깔끔한 카드 디자인
   - 각 시간별로 온도, 상태, 습도, 풍속, 강수량 표시
   - 가로 스크롤로 24시간 정보 확인

### 5. **전문적인 UI 요소**
   - 기상청 스타일의 헤더
   - 깔끔한 검색 섹션
   - 정돈된 버튼 디자인
   - 반응형 레이아웃 (모바일 최적화)

### 6. **정보 가독성**
   - 명확한 계층 구조
   - 적절한 여백과 간격
   - 직관적인 아이콘 사용
   - 섹션별 구분선

이제 웹앱을 열어보시면 기상청 스타일의 전문적이고 한눈에 정보를 파악하기 쉬운 디자인을 확인하실 수 있습니다! 🌤️

