# Newsproject

This project is a News Application built using Angular 20.1.2, integrating with a news API.

---

## 🛠️ Configuration & Environment Setup

This project uses environment variables managed via a `.env` file at the root directory. To ensure API credentials are not checked into source control, the application uses a build-time script (`set-env.js`) to generate Angular environment configuration files automatically.

### 1. Create a `.env` File
Create a `.env` file in the root directory of the project (using [`.env.example`](file:///c:/Users/ASUS/Desktop/skyvo/Angular/newsproject/.env.example) as a template):

```env
NEWS_API_KEY=your_news_api_key_here
NEWS_API_URL=https://newsapi.org/v2/
```

### 2. How it Works
When running scripts via `npm`, the script [`set-env.js`](file:///c:/Users/ASUS/Desktop/skyvo/Angular/newsproject/set-env.js) automatically extracts values from the `.env` file and generates:
* `src/environments/environment.ts`
* `src/environments/environment.development.ts`

These generated files are ignored by git in [`.gitignore`](file:///c:/Users/ASUS/Desktop/skyvo/Angular/newsproject/.gitignore) to protect credentials.

---

## 🚀 Development commands

Always run commands via `npm run` (or `npm`) to ensure the environments are compiled before Angular CLI executes:

### Start Development Server
```bash
npm start
```
Once running, navigate to `http://localhost:4200/`.

### Run Unit Tests
```bash
npm test
```
This executes the unit tests with Karma.

### Production Build
```bash
npm run build
```
This compiles the application and stores output artifacts in the `dist/` directory.

### Code Scaffolding
To generate a new component:
```bash
npx ng generate component component-name
```

---

## 📚 Learn More
For more details on the Angular CLI, visit the [Angular CLI Reference](https://angular.dev/tools/cli).

