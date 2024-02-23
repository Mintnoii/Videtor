import './app.css'
import App from './App.svelte'

const app = new App({
  // 非空断言
  target: document.getElementById('app')!,
})

export default app
