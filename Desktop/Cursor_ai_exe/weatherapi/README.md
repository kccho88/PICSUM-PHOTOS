# 날씨정보 웹앱 🌤️

WeatherAPI를 활용한 3일 날씨 예보 웹 애플리케이션입니다.

## 주요 기능

- 📍 **지역별 날씨 검색**: 전국 및 전세계 날씨 정보 조회
- 📅 **3일 예보**: 오늘, 내일, 모레 날씨 정보
- ⏰ **시간대별 날씨**: 24시간 상세 날씨 정보
- ⛳ **골프장 날씨**: 국내 주요 골프장 주변 날씨
- 🌡️ **상세 정보**: 온도, 습도, 풍속, 기압, 가시거리, UV 지수 등

## 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript
- [WeatherAPI.com](https://www.weatherapi.com/)

## 로컬 실행

1. 프로젝트 클론
```bash
git clone [your-repo-url]
cd weatherapi
```

2. 브라우저에서 `index.html` 파일 열기

## Vercel 배포

### 방법 1: Vercel CLI 사용

1. Vercel CLI 설치
```bash
npm install -g vercel
```

2. 프로젝트 디렉토리에서 배포
```bash
vercel
```

3. 프로덕션 배포
```bash
vercel --prod
```

### 방법 2: GitHub 연동

1. GitHub에 저장소 생성 및 푸시
2. [Vercel](https://vercel.com) 접속 및 로그인
3. "New Project" 클릭
4. GitHub 저장소 선택
5. "Deploy" 클릭

## 환경 변수

이 프로젝트는 WeatherAPI 키가 코드에 포함되어 있습니다. 
프로덕션 환경에서는 환경 변수로 관리하는 것을 권장합니다.

## 라이선스

MIT License

## 제작

Powered by [WeatherAPI.com](https://www.weatherapi.com/)

