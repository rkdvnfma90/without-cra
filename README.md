# 🚀 CRA 없이 리액트 세팅

> CRA를 사용하지 않고 리액트 환경설정을 해보자.

## 프로젝트 생성

1. npm 으로 프로젝트 초기화

- `npm init -y` 을 하면 초기화된 정보가 `package.json`에 생성 된다. `-y` 속성은 옵션을 기본값으로 설정한다는 의미.

2. dependencies

- 설치하고자 하는 라이브러리를 `npm install` 명령어로 설치하면 `package.json`의 dependencies에 기본적으로 저장된다.
- 버전 같은 경우 `^1.1.0`과 같은 캐럿 형태와 `~1.1.0`과 같은 틸트 형태로 이루어져 있다.
  - 캐럿 : x.y.z 로 이루어져 있다면 x 이하 하위 호환성이 보장되는 범위 내에서 버전을 업데이트 한다는 의미. `^1.1.0 은 1.1.0 <= 그리고 2.0 > 이다.`
  - 틸트 : x.y.z 로 이루어져 있다면 z 범위 내에서 버전 업데이트 한다는 의미. `~1.1.0 은 1.1.0 <= 그리고 1.2 > 이다.`

3. devDependencies

- 개발에서만 쓰이는 라이브러리는 `npm install -D` 혹은 `npm install --save-dev` 명령어로 devDependencies에 저장한다.
- 개발에서만의 의미는 컴파일 될 때 까지만 쓴다는 의미이다. 보통 babel, webpack, loader 등을 여기에 저장한다.

4. package-lock.json

- 이 파일은 npm으로 라이브러리를 설치하면 자동으로 생성된다.
- 의존성 트리에 대한 정보를 가지고 있으므로 이 파일이 작성된 시점의 의존성 트리를 다시 생성할 수 있도록 한다. 📌그러므로 꼭 같이 커밋해줘야 한다!

## 라이브러리 설치

1. React 관련 라이브러리

- `npm install react react-dom react-router-dom`
- `react` : React UI를 위한 라이브러리
- `react-dom` : React DOM 및 서버 렌더러에 대한 진입점 역할
- `react-router-dom` : Single Page Application을 만들 때 사용

2. 스타일 관련 라이브러리

- `npm install styled-componentsc styled-reset`
- `styled-components` : React 컴포넌트처럼 JSX 안에서 스타일을 작성할 수 있게 해준다. 또 많이 사용하는 라이브러리는 `material-ui`가 있다.
- `styled-reset` : 브라우저 마다 서로 다른 기본 스타일 차이를 없앨 때 사용하는 라이브러리

3. Redux 관련 라이브러리

- `npm install react-redux redux redux-thunk redux-devtools-extension`
- `react-redux, redux` : 전역으로 상태관리하는 라이브러리. `react-redux`는 스토어 안에 데이터가 변경되었으면 해당 컴포넌트를 다시 렌더링 해준다.
- `redux-thunk` : redux에서 사용하는 미들웨어 중 하나이다.
- `미들웨어`란? 액션을 디스패치 했을 때 리듀서에서 액션을 처리하기 전에 원하는 작업을 실행할 수 있게 해준다.
- `thunk`란? 파라미터를 받아 실행하고 또 다른 함수를 return하는 함수이다.
- `redux-devtools-extensions` : redux를 사용할 때 액션과 현재 상태를 더 쉽게 볼 수 있게 하는 라이브러리.

4. babel

- 자바스크립트 트랜스파일러
- `트랜스파일러`란? 한 언어로 작성된 소스를 비슷한 수준의 추상화를 가진 다른 언어로 변환하는 것을 말한다. (e.g. es6 -> es5, typescript -> javascript)
- es6 문법을 사용해도 이전 버전 브라우저까지 호환되는 코드로 변환해 준다.
- `webpack`이라는 빌드도구와 같이 사용한다.

5. babel 관련 라이브러리

- `npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties @babel/plugin-syntax-dynamic-import babel-loader core-js`
- `@babel/core` : babel을 사용하기 위한 필수 패키지
- `@babel/preset-env` : 범용적인 preset으로서 es6 이상 문법으로 작성된 코드를 es5 문법의 코드로 변환해 주는 모든 규칙을 정의한 preset이다.
- `@babel/preset-react` : JSX로 작성된 코드를 `createElement` 함수를 이용한 코드로 변환해 주는 preset이다.
- `@babel/plugin-proposal-class-properties` : class에서 property를 사용할 수 있게 하는 플러그인이다. 이 플러그인이 없으면 class사용시 오류가 발생한다.
- `@babel/plugin-syntax-dynamic-import` : 동적 import로 code splitting을 구현할 때 사용하는 플러그인. 만약 `Suspense, lazy나 loadable component`를 사용한다면 사용하지 않아도 된다.
- `babel-loader`: webpack이 모듈을 번들링할 때 babel을 사용하여 es6 이상의 코드를 es5 코드로 트랜스파일링 하도록 한다.
- `core-js` : polyfill 라이브러리로서, 기존 `@babel-polyfill`에서 이미 사용하고 있던 라이브러리이다. 하지만 @babel-polyfill은 전역변수가 오염되는 문제가 있었기 때문에 core-js를 사용하여 그 문제를 방지한다. (babel 만으로 es6 내장메소드는 대체 불가능 하기 때문에 polyfill 사용, e.g. `Array.includes`)

6. babel.config.js 설정

- 앞서 설치한 babel을 프로젝트에 적용하기 위해 `babel.config.js`를 다음과 같이 작성한다.

7. webpack 관련 라이브러리

- `npm install -D webpack webpack-cli webpack-dev-server webpack-merge webpack-bundle-analyzer html-webpack-plugin dotenv-webpack clean-webpack-plugin`
- `webpack` : 오픈소스 자바스크립트 번들러이다. (번들: 소프트웨어 및 일부 하드웨어와 함께 동작하는 데 필요한 모든 것을 포함하는 package를 일컫는다.)
- `webpack-cli` : 터미널에서 webpack 커맨드를 실행할 수 있게 해준다.
- `webpack-dev-server` : 빠른 실시간 리로드 기능을 갖춘 개발 서버
- `webpack-merge` : 여러개의 webpack 설정 파일을 하나로 병합해주는 라이브러리
- `webpack-bundle-analyzer` : webpack을 이용하여 번들링되는 모듈들을 분석하여 보기좋게 시각적으로 표현해주는 모듈
- `html-webpack-plugin` : 번들된 css, js같은 파일들은 html에 직접 추가해주어야 하는데 이것을 사용하면 자동으로 추가시켜 준다.
- `dotenv-webpack` : Node 환경변수에 접근하기 위한 라이브러리
- `clean-webpack-plugin` : 빌드 이전 결과물을 제거하는 플러그인이다. 빌드 결과물은 output 경로에 설정한 곳으로 폴더와 파일들이 모이게 되는데 이전 빌드내용이 삭제되지 않는 경우가 있기 때문에 사용함

```javascript
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
}
```

## 참조

<https://egg-programmer.tistory.com/> - `개발후라이`님의 블로그를 참조하여 작성하였습니다.
