import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { dirname, join } from 'path'

const TEMPLATES_PATH = "./dest/"
const PORT = 8888

const app = new Elysia()

// Плагин для обработки статических файлов из docs директории
app.use(
  staticPlugin({
    prefix: '/',
    assets: TEMPLATES_PATH,
    alwaysStatic: true,  // Всегда пытаться найти статический файл
    responseMeta: ({ path }) => {
      // Устанавливаем правильные заголовки в зависимости от типа файла
      if (path.endsWith('.html')) return { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      if (path.endsWith('.css')) return { headers: { 'Content-Type': 'text/css; charset=utf-8' } }
      if (path.endsWith('.js')) return { headers: { 'Content-Type': 'application/javascript; charset=utf-8' } }
      if (path.endsWith('.json')) return { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
      if (path.endsWith('.png')) return { headers: { 'Content-Type': 'image/png' } }
      if (path.endsWith('.webp')) return { headers: { 'Content-Type': 'image/webp' } }
       return {}
    }
  })
)

// Обработчик для конкретных HTML файлов
app.get('*/index.html', async ({ request }) => {
  const url = new URL(request.url)
  const filePath = join(TEMPLATES_PATH, url.pathname)
  
  try {
    const file = Bun.file(filePath)
    const exists = await file.exists()
    
    if (exists) {
      return file
    }
  } catch (error) {
    console.error(`Error serving file ${filePath}:`, error)
  }
  
  // Если файл не найден, возвращаем корневой index.html
  return Bun.file(join(TEMPLATES_PATH, 'index.html'))
})

// Fallback для всех остальных запросов
app.get('*', async ({ request }) => {
  const url = new URL(request.url)
  const filePath = join(TEMPLATES_PATH, url.pathname)
  
  try {
    // Пробуем найти index.html в запрошенной директории
    const indexPath = join(filePath, 'index.html')
    const indexFile = Bun.file(indexPath)
    
    if (await indexFile.exists()) {
      return indexFile
    }
    
    // Пробуем найти файл напрямую
    const file = Bun.file(filePath)
    if (await file.exists()) {
      return file
    }
  } catch (error) {
    console.error(`Error serving path ${filePath}:`, error)
  }
  
  // Если ничего не найдено, возвращаем корневой index.html
  return Bun.file(join(TEMPLATES_PATH, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🦊 Server running at http://localhost:${PORT}`)
})