# Stage 1: 빌드 단계
FROM node:latest AS build
WORKDIR /app

# 의존성 설치를 위해 package.json과 yarn.lock 파일을 먼저 복사
COPY package.json yarn.lock ./
RUN yarn install

# 전체 소스코드 복사 후 빌드 실행 (빌드 결과는 보통 'dist' 폴더에 생성됨)
COPY . .
RUN yarn build

# Stage 2: 배포 단계 (Nginx 사용)
FROM nginx:alpine

# 빌드된 정적 파일을 Nginx 기본 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 사용자 정의 Nginx 설정 파일 복사 (프로젝트 루트의 nginx.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]