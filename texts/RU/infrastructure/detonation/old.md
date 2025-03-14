# Detonation: ультралёгкий и ультрабыстрый фреймворк для распределённых вычислений

Detonation — это специальный **оркестратор** для цифровых фабрик, научных вычислений и высокопроизводительных задач. Он схож с Kubernetes по общим идеям, но обеспечивает **более быстрый** стриминговый обмен данными, **низкоуровневую** реализацию на C/Zig и реакцию в **сотни раз быстрее**, чем классические системы. Благодаря протоколу **SHOCK** (стриминговый P2P) и глубокому использованию eBPF, пакеты могут передаваться между узлами с задержкой в **десятки микросекунд** в гигабитных сетях, а внутри узла — за сотни наносекунд.

> **Внимание**: данный текст учитывает **последние изменения** в Detonation Framework и добавляет важные аспекты из ранних описаний, такие как формат событий, Cap’n Proto (CAP), модуль Verify, термины Gateway/Gate, подробности о DataStore и пр. В случае конфликтов с предыдущими документами приоритет имеет этот текст.

---

## Содержание

1. [Миссия и назначение](#миссия-и-назначение)  
2. [Краткий обзор Detonation](#краткий-обзор-detonation)  
3. [Архитектура и ключевые компоненты](#архитектура-и-ключевые-компоненты)  
   1. [Внутри узла (Host Level)](#внутри-узла-host-level)  
   2. [Уровень кластера (Cluster Level)](#уровень-кластера-cluster-level)  
4. [Слои Detonation](#слои-detonation)  
5. [События (Events) и их формат](#события-events-и-их-формат)  
6. [Протокол CAP и стриминговый SHOCK](#протокол-cap-и-стриминговый-shock)  
7. [Verify: приёмочные тесты](#verify-приёмочные-тесты)  
8. [Работа с дисками, DataStore и распределённым хранилищем](#работа-с-дисками-datastore-и-распределённым-хранилищем)  
9. [Примеры вычислительных задач и сценарии применения](#примеры-вычислительных-задач-и-сценарии-применения)  
10. [Сравнение с Kubernetes и преимущества Detonation](#сравнение-с-kubernetes-и-преимущества-detonation)  
11. [Дополнительные аспекты Igniter-модулей](#дополнительные-аспекты-igniter-модулей)  
12. [Заключение](#заключение)  

---

## 1. Миссия и назначение

Главная цель Detonation — **упростить и ускорить** управление сложной промышленной инфраструктурой, робототехникой, 3D-принтерами, научными кластерами и любыми другими устройствами, превращая их в **единый монолитный кластер**. Так пользователи получают доступ к вычислительной мощности и хранилищу, обычно доступным лишь крупным корпорациям.

- **Быстрый стриминговый обмен**: нет классических RPC—процедур, взаимодействие происходит в режиме **непрерывных потоков**.  
- **Минимальный overhead**: всё написано на C/Zig, размер базового контейнера ~**500 КБ**, время старта — **около 0 секунд**.  
- **Гибкое распределение ресурсов**: все свободные CPU, RAM, диски принадлежат сети **exp**, из которой их можно «занимать» под задачи, рассчитываясь взаимозачётами.  
- **Высокая реактивность**: масштабирование и перераспределение потоков занимают доли секунд или даже микросекунды.

---

## 2. Краткий обзор Detonation

**Detonation** — это сверхлёгкий фреймворк, обеспечивающий:

1. **Стриминговую архитектуру**: вместо обращения к сервисам по HTTP/GRPC — поточные сообщения (SHOCK) по UDP или через shared memory внутри узлов.  
2. **Децентрализованное хранение**: все доступные диски объединяются в **Salins Distributed File System** (или DDFS в старых документах), обеспечивая высокую скорость ввода-вывода и надёжность.  
3. **Встроенный роутинг**: eBPF-модули на каждом узле перенаправляют гигабитные (иногда сотни гигабит) потоки данных между контейнерами с задержками на уровне микросекунд.  
4. **Отсутствие состояния в сервисах**: любая бизнес-логика получает контекст из распределённого кэша **kdb** (ранее KeyDB).  
5. **Мгновенные контейнеры**: запуск десятков новых инстансов ComputeSet без долгих ожиданий — оптимально для пиковых или event-driven задач.

---

## 3. Архитектура и ключевые компоненты

### 3.1 Внутри узла (Host Level)

1. **Router**  
   - Центральный процесс на узле, который принимает входящие пакеты (UDP, локальные потоки) и распределяет их между контейнерами.  
   - Использует eBPF для быстрых манипуляций с пакетами в ядре Linux.  
   - Работает через **POSIX Shared Memory** (shm-кольцевые буферы) для передачи данных внутри одного хоста.

2. **Igniter**  
   - Контроллер хоста, который умеет инициализировать контейнеры, слои (Equipment, Network, Storage, Workload), следит за состоянием узла, метриками, безопасностью и т.д.  
   - Подгружает модули (см. [Дополнительные аспекты Igniter-модулей](#дополнительные-аспекты-igniter-модулей)).

3. **Containers**  
   - **ComputeSet**: «ячейка» с одной или несколькими функциями (**ComputFunction**) для ресурсоёмких вычислений (ML, симуляции, рендеринг и т.д.).  
   - **Data Service** (ранее DataStore): Pod, предоставляющий доступ к базе данных или файловым ресурсам через SHOCK.  
   - **Business Logic** (Logic Services): «умные» роутеры на уровне пользовательской логики.  

4. **KDB** (ранее KeyDB)  
   - Распределённая БД для хранения состояния процессов, сессий, ключ-значений, метаданных.  
   - Скоростная (миллионы транзакций/сек), обновления реплицируются по всему кластеру.

5. **Cap’n Proto (CAP)**  
   - Модифицированный протокол сериализации, используемый внутри Detonation (подробнее см. [Протокол CAP и стриминговый SHOCK](#протокол-cap-и-стриминговый-shock)).

### 3.2 Уровень кластера (Cluster Level)

1. **Salins Distributed FS**  
   - Распределённая файловая система, аналог IPFS/Google FS, но оптимизирована для низких задержек и больших скоростей.  
   - Объединяет блочные устройства (Disks) всех узлов.  
   - Может хранить любые контейнеры, данные пользователей, фронтенд-модули, и позволяет за секунды доставлять нужные образы на узлы.

2. **Blaster / Cluster Controller**  
   - Отвечает за управление всеми узлами: создание/удаление инстансов контейнеров, слежение за нагрузкой, масштабирование.  
   - Следит за состоянием Salins FS, kdb, координаторами сети exp.

3. **exp-сеть**  
   - Децентрализованная глобальная сеть, куда «сдаются» свободные ресурсы.  
   - При необходимости пользователь может занять дополнительные CPU/диски/память, рассчитываясь токенами или предоставляя равноценный ресурс.

4. **Gate / Gateway**  
   - Внешние входные точки (Ingress) для получения данных из Интернета, полей датчиков, API-запросов.  
   - Могут работать на базе eBPF или обёрток на уровне H2/WebSockets.  
   - Конвертируют входящие потоки в **SHOCK**-сообщения и перенаправляют внутрь кластера.

5. **Flow** (eBPF-микропрограммы)  
   - Упоминаемый в предыдущих материалах механизм ветвления потоков данных (DAG).  
   - Может работать наряду с eBPF: eBPF обрабатывает низкоуровневые пакеты, а Flow решает логику на уровне WASM, если нужна более сложная «ветвящаяся» схема обработки.

---

## 4. Слои Detonation

Detonation условно разбит на 4 слоя (хотя в реальности все они объединены в один процесс Igniter внутри хоста):

1. **Equipment**  
   - Управляет любым оборудованием: от CPU, GPU, FPGA, ASIC до сетевых плат и виртуальных устройств.  
2. **Network**  
   - Отвечает за маршрутизацию трафика (eBPF, XDP, io_uring), балансировку нагрузки, фильтрацию, защиту от DDoS.  
3. **Storage**  
   - Включает в себя работу с блочными устройствами (Disks/Block Devices), Salins FS, резервным копированием, DDFS-механизмами.  
4. **Workload**  
   - Управляет запуском контейнеров (ComputeSet, Data Service, Business Logic), виртуальных машин (где нужно), их мониторингом и автоскейлингом.

---

## 5. События (Events) и их формат

Одна из важнейших частей Detonation — **событийная модель**. Любое действие в кластере (запуск задачи, изменение состояния, лог-сообщение) — это событие, передающееся через SHOCK, UDP или локальный shm-буфер.

- **Control Events**  
  - Высший приоритет, передаются по сети с максимальным приоритетом. Сюда относятся:  
    - Управление кластером (создание/удаление контейнеров).  
    - Управление оборудованием (включение/отключение устройств, перезагрузка узлов).  
    - Распределённые вычисления (запуск, остановка, планировщик задач).  

- **Log Events**  
  - Не передаются по сети, записываются локально на диск.  
  - Могут сжиматься `lz4` и группироваться в суперблоки (256 МБ).  
  - Для чтения логов применяется локальный MapReduce-подход (запросы на каждый узел, который «видит» свои логи).

### Формат события

- Каждое событие ограничено **1024 байтами**, чтобы поместиться в один IP-пакет (без фрагментации).  
- В начале события идёт 16-байтовый UID:  
  1. 6 байт времени (микросекунды).  
  2. 1 байт типа события (Error, Warning, Info, Debug, Trace).  
  3. 4 байта источника события (ID узла или сервиса).  
  4. 4 байта случайного идентификатора.  
  5. 1 байт — номер сегмента события (если оно разбито на части).  

Это позволяет быстро фильтровать и искать события при хранении.

---

## 6. Протокол CAP и стриминговый SHOCK

### SHOCK

- **SHOCK** — P2P-протокол на базе UDP/TCP для непрерывного потока данных.  
- Задача — передача «пакетов» внутри кластера без стандартных overhead (HTTP, gRPC).  
- Оптимизирован для низкой задержки и высокой пропускной способности: может пересылать сотни тысяч/миллионы пакетов в секунду.

### CAP (Cap’n Proto)

- Detonation не использует gRPC, а применяет **модифицированный Cap’n Proto** (CAP) для сериализации.  
- Преимущество Cap’n Proto: низкий overhead, сообщение можно читать без десериализации (zero-copy), что критично для стриминга.  
- **Важно**: CAP-кадры инкапсулируются внутри пакетов SHOCK, что даёт минимум накладных расходов.

---

## 7. Verify: приёмочные тесты

Важный элемент жизненного цикла сервисов — **Verify**. Это набор тестов, проверяющих:

- **Соответствие** сервиса заявленной спецификации (API, формат входных данных).  
- **Функциональность** (работают ли все функции правильно).  
- **Производительность** (проходит ли сервис заданный порог по времени/ресурсам).  

Перед выкладкой нового Pod или обновления контейнера Detonation прогоняет **Verify**-тесты, чтобы избежать неконсистентного кода в кластере.

---

## 8. Работа с дисками, DataStore и распределённым хранилищем

### Disks / Block Devices

- Любое физическое устройство хранения (HDD, SSD) в узле формирует одно или несколько **Block Device** сегментов.  
- Detonation минимизирует overhead, давая прямой доступ к блочным устройствам через драйверы и bypass-операции (io_uring, eBPF при необходимости).  

### Salins Distributed FS (ранее DDFS)

- **Salins FS** управляет размещением данных на узлах, реплицирует блоки для отказоустойчивости.  
- Может автоматически расширяться, подключая новые физические диски от узлов, которые вошли в кластер.  
- С точки зрения сервиса все данные выглядят как единое «ключевое пространство» (похоже на IPFS, но более производительно).  

### DataStore (или Data Service)

- Спец. Pod, упрощающий работу баз данных или файловых систем.  
- Принимает/отправляет пакеты через SHOCK и может читать/писать в Salins FS или локальные блочные устройства.  
- Примеры: PostgreSQL, Cassandra, KeyDB, SQLite, а также системы для больших данных вроде ClickHouse или SylaDB — всё заворачивается в DataStore для интеграции без прямых TCP/Unix Socket.

---

## 9. Примеры вычислительных задач и сценарии применения

1. **Machine Learning**  
   - Синтез микросхем (ASIC/FPGA), трассировка печатных плат (PCB).  
   - Обучение больших моделей (нейронные сети) на GPU, расположенных в разных узлах.  
2. **CNC / 3D-печать**  
   - Нарезка (slicing) 3D-моделей на сотнях узлов одновременно.  
   - Параллельная генерация управляющих программ для множества станков/принтеров.  
3. **Generative Design и CAD**  
   - Вычислительные ядра для Finite Element Analysis (FEA), оптимизация форм, эргономика изделий.  
4. **Научные симуляции**  
   - Физика (электромагнетизм, гидродинамика, теплообмен), химические расчёты, моделирование механики.  
   - Обработка больших потоков данных от датчиков и лабораторного оборудования.  
5. **Робототехника, IoT**  
   - Управление роями дронов, сбор датчиков в реальном времени (сотни тысяч сообщений/с).  
   - Моментальное принятие решений, фильтрация шумов (eBPF + маломощные узлы).

---

## 10. Сравнение с Kubernetes и преимущества Detonation

**Detonation** кардинально отличается по нескольким пунктам:

1. **Стриминговая модель**  
   - Kubernetes: HTTP/gRPC-запросы, сервисы могут хранить часть состояния.  
   - Detonation: непрерывные потоки пакетов, всё состояние — в кэше (kdb).

2. **Минимальный системный след**  
   - Kubernetes написан на Go, требует etcd, контроллеры, прокси, kubelet и др.  
   - Detonation написан на C/Zig, контейнеры стартуют через crun за **миллисекунды или даже быстрее** (0.0X с).

3. **Высокая скорость реакции**  
   - Kubernetes обычно пересматривает конфигурацию каждые несколько секунд или по триггерам, реакция может занимать секунды.  
   - Detonation задействует eBPF и io_uring — перераспределение нагрузки может произойти буквально за миллисекунды.

4. **Salins FS (DDFS) vs. внешнее хранилище**  
   - Kubernetes часто использует внешние механизмы (NFS, Ceph и т.д.).  
   - Detonation имеет собственное встроенное распределённое хранилище (Salins FS), глубоко интегрированное с роутингом.

5. **WASM-Flow / eBPF роутинг**  
   - Kubernetes сервисы общаются через IP+подсети, балансировку делает kube-proxy/ipvs.  
   - Detonation осуществляет маршрутизацию на **более низком уровне** (eBPF), при необходимости подключая WASM-модули (Flows) для сложного DAG-взаимодействия.

6. **No Go**  
   - Detonation сознательно избегает Go-рантайма, чтобы убрать задержки при сборке мусора и т.д.  
   - Это даёт более низкий overhead и близкую к bare metal производительность.

---

## 11. Дополнительные аспекты Igniter-модулей

В исходной документации Igniter включает несколько отдельных модулей:

- **Workload**  
  - Управляет вычислительными нагрузками (запуск/остановка контейнеров).  
- **Network**  
  - Внутренний модуль для передачи данных внутри хоста, участие в роутинге eBPF.  
- **Storage**  
  - Управление блочными устройствами, монтирование Salins FS, кэширование.  
- **Equipment**  
  - Учет и настройка физического и виртуального оборудования (диски, GPU, FPGA и т.д.).  
- **State**  
  - Отслеживание текущего состояния (имеющихся ресурсов, температур, нагрузок).  
- **Configuration**  
  - Хранение и применение конфигураций хоста (или узла).  
- **Events**  
  - Обработка событий (частично перекрывается с Router).  
- **Metrics**  
  - Сбор и публикация метрик (CPU, RAM, IO, eBPF counters).  
- **Security**  
  - Контроль доступа, распределённые политики безопасности.  
- **Processing**  
  - Дерево процессов внутри узла (сессии, родительские/дочерние процессы).

В зависимости от конфигурации и объёмов задач эти модули могут быть «свёрнуты» в единый бинарник или разнесены по разным компонентам.

---

## 12. Заключение

**Detonation** — это радикально новая стриминговая платформа, позволяющая объединять сотни и тысячи устройств (от микроконтроллеров до мощных серверов) в единый **кластер реального времени**. Она сочетает:

- **Ультрабыстрый роутинг** (eBPF, UDP, shm).  
- **Строгую событийную модель** (Control Events, Log Events).  
- **Мгновенные контейнеры** на C/Zig.  
- **Распределённое файловое хранилище** (Salins FS) и **KDB** для кэша.  
- **WASM** или классический User Space для сложной логики ветвления.  

Detonation открывает путь к **настоящим цифровым фабрикам** и HPC-кластерам, где время реакции исчисляется микросекундами, а обмен сообщениями — непрерывный поток со скоростью в сотни гигабит в секунду. Благодаря глубокой интеграции с низкоуровневыми механиками Linux и отказу от тяжелых рантаймов Detonation демонстрирует **максимальную производительность** при минимальных системных затратах.

Использование Detonation особенно актуально для:

- **Цифрового производства** (3D-печать, CNC, конвейеры).  
- **Научных исследований** (обработка больших потоков данных, симуляции).  
- **AI/ML-задач** (быстрое масштабирование GPU-кластеров).  
- **IoT и робототехники** (управление тысячами устройств как единым роем).  
- **Финтех/блокчейн** (распределённая логика, быстрая маршрутизация событий, хранение больших объёмов данных).  

Всё это делает Detonation **уникальным инструментом**, способным обслуживать миллионы потоков данных и миллионов процессов в реальном времени, значительно опережая классические решения вроде Kubernetes по показателям **скорости, лёгкости, реактивности и гибкости**.