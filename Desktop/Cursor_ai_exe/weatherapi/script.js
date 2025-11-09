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

