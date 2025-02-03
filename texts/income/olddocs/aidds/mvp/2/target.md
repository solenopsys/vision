Как должен дработать mvp
- Даташиты должны храниться с своем блочном хранилище DDFS и Scylladb.
  - Контейнеры
  - Исходники
  - Объекты
- Функции адинистрирования должны быть реализованы на базе Organic
  - Сборка контейнера
  - Импорт слоев
- Разработка organic  

- Интеграция технологий 
  - CAP - серилализация (https://github.com/capnproto/capnproto)
  
  - LZ4 - для компрессии обектов (https://github.com/lz4/lz4)
    - dqlite - storage detonation - https://github.com/canonical/dqlite