## Мотивация создания протокола

В современном промышленном производстве существует критическая потребность в сверхбыстрых протоколах передачи данных с высокой пропускной способностью. Промышленное оборудование функционирует в режиме реального времени, где каждая миллисекунда задержки может иметь значительные последствия для производственного процесса. Традиционные протоколы с использованием брокеров сообщений создают дополнительные задержки и не способны обеспечить требуемый уровень производительности.

Основная идея протокола SHOCK заключается в создании системы без выделенного брокера сообщений в качестве отдельного процесса. Подобно ZMQ, SHOCK реализует прямую коммуникацию между компонентами системы через разделяемую память. Однако SHOCK идет дальше – он способен обходить стандартное сетевое стека Linux с использованием XDP и AF_XDP, что позволяет достичь беспрецедентной производительности.

Такой подход особенно важен для:
- Систем управления промышленным оборудованием, где требуется минимальная задержка отклика
- Высокочастотных систем сбора данных с датчиков
- Распределенных систем управления производством
- Систем машинного зрения и контроля качества в реальном времени
- Систем распределенных вычислений для обработки больших объемов данных (трассировка, слайсинг и тд)

### Оптимизация производительности

Ключевое преимущество SHOCK – компактный размер пакетов и возможность быстрого анализа пакетов. В отличие от протоколов, требующих полного парсинга данных перед обработкой, SHOCK позволяет мгновенно направлять сообщения соответствующим обработчикам.

### Промышленное применение

Протокол специально разработан для промышленных сценариев использования:
- Управление промышленным оборудованием
- Распределённые вычисления
- Высокоскоростной обмен данными
- Системы мониторинга и управления в реальном времени
- Реализации цифровых фабрик



