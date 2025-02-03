import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

// Если нужно, создаём глобальные объекты
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.navigator = dom.window.navigator;


// Копируем все собственные (own) свойства и Symbol-ключи из `dom.window` в `globalThis`
[...Object.getOwnPropertyNames(dom.window), ...Object.getOwnPropertySymbols(dom.window)]
  .forEach((key) => {
    // Если в globalThis нет такого поля
    if (!Reflect.has(globalThis, key)) {
      // Считываем дескриптор из окна
      const descriptor = Object.getOwnPropertyDescriptor(dom.window, key);
      if (descriptor) {
        // Определяем то же свойство в globalThis
        Object.defineProperty(globalThis, key, descriptor);
      }
    }
  });