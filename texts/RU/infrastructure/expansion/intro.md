
## Ключевые особенности сети

1. **Двухуровневая архитектура**
   - **Core (ядро сети)**: состоит из 64 узлов, находящихся в разных дата-центрах. Каждый узел представляет собой кластер, работающий на основе высокопроизводительного фреймворка Detonation FRW и использующей базу данных SkylaDB. Это даёт возможность обрабатывать огромные объёмы данных и сохранять информацию о транзакциях в формате DAG (децентрализованного ациклического графа), что отличает сеть от классических цепочек блоков.
   - **Edge Nodes**: узлы второго уровня, предназначенные для распределённого хранения больших объёмов данных с помощью файловой системы IPFS (InterPlanetary File System). Edge Nodes также выполняют вычислительные задачи, связанные со смарт-контрактами, анализом данных и прочими сервисами.

## Core-сеть (ядро)

### Небольшое центральное ядро.
32-64 узла — это оптимальное число, позволяющее достичь высокой производительности и надёжной синхронизации. Слишком большое количество узлов затормозило бы работу базы данных SkylaDB, а слишком маленькое не смогло бы обеспечить нужную отказоустойчивость и децентрализацию.

### SkylaDB
SkylaDB — это высокоскоростная база данных, в основе которой лежат механизмы, способные обрабатывать сотни миллионов запросов в секунду. Подобные технологии уже применяются крупными сервисами, вроде Discord, которые успешно работают с огромными объёмами трафика. В контексте Expansion Network SkylaDB хранит запись обо всех транзакциях и операциях.

### DAG-блокчейн
Блокчейн в Expansion Network основан не на традиционных блоках, а на структуре DAG (Directed Acyclic Graph), что упрощает и ускоряет процесс валидации записей. Внутри SkylaDB хранится специальная таблица, в которой фиксируется каждая транзакция: кто её создал, каковы метаданные и в какое время она была внесена.

При этом хранение финансовых транзакций может осуществляться в отдельной специализированной базе данных, однако в DAG регистрируются ссылки на все действия, подтверждающие авторство или закрепление прав. Это касается также интеллектуальной собственности, текстовых сообщений и прочих видов данных, где нужно подтвердить, что пользователь действительно владеет правами и временем создания записи.

## Высокая пропускная способность
Сеть Expansion Network способна обрабатывать сотни тысяч или даже миллионы транзакций в секунду, что критично для надёжного учёта роялти, микроплатежей и операций смарт-контрактов в режиме реального времени. Все эти процессы должны быть почти мгновенными и практически бесплатными для пользователей.

Например, если сообщество Solenopsis разрабатывает продукт (будь то программный модуль, двигатель, электронная плата и т. д.), и каждая единица произведённой продукции отчисляет 5% роялти автору, системе требуется мгновенно распределить эти выплаты. При большом числе транзакций (тысячи, а в будущем и миллионы в секунду) SkylaDB и фреймворк Detonation FRW обеспечивают необходимую пропускную способность.

## Edge Nodes и IPFS

На втором уровне находятся так называемые Edge Nodes, каждый из которых хранит распределённые файлы и дублирует их в IPFS. Это даёт сразу несколько преимуществ:
- **Надёжность хранения**: если одна или несколько нод выходят из строя, данные автоматически реплицируются на другие узлы.
- **Гибкое масштабирование**: любой желающий может развернуть собственный узел IPFS, увеличить объём доступных хранилищ и участвовать в вычислительном процессе.
- **Производительность**: пользовательские ноды могут выполнять часть вычислительной нагрузки (например, запускать смарт-контракты, обрабатывать отдельные расчёты), снимая часть нагрузки с кор-узлов.

## Detonation FRW

Фреймворк Detonation FRW обеспечивает эффективное выполнение вычислительных задач и смарт-контрактов. Код в Detonation FRW может работать приблизительно в три раза медленнее, чем аналогичный код на C++, но всё равно это очень высокая производительность для большинства ситуаций. Благодаря этому сообщество получает возможность писать надёжные и быстрые микропрограммы, которые управляют логикой смарт-контрактов, проверяют права доступа, отслеживают транзакции и многое другое.

## Простота, децентрализация и безопасность

- **Сеть без главного узла**: децентрализация достигается тем, что 64 кор-узла и большое количество пользовательских Edge Nodes не доверяют друг другу «по умолчанию», а для верификации транзакций и хранения данных используется криптография и механизм DAG.
- **Гибкое добавление новых участников**: любой пользователь может стать частью сети, развернув Edge Node.
- **Безопасность и прозрачность**: каждая запись, транзакция или сообщение подписывается цифровым ключом, поэтому факт владения и время внесения информации нельзя оспорить.

## Заключение

Таким образом, Expansion Network — это масштабируемая децентрализованная экосистема, ориентированная на нужды сообщества Solenopsis. Она сочетает в себе:
- Мощное ядро из 64 узлов на базе SkylaDB и DAG, обрабатывающее критические транзакции и записи.
- Гибкую систему Edge Nodes и IPFS для распределённого хранения больших объёмов данных и выполнения вычислительных задач.
- Прозрачные и высокоскоростные финансовые операции, необходимые для роялти, микроплатежей и сложных смарт-контрактов.

Главная цель Expansion Network — упростить управление правами собственности, финансовыми операциями и коммуникациями внутри сообщества, создавая открытую и доступную платформу для всех участников.

