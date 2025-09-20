---
date: 2025-09-17 14:55 +2
title: Задача TypeScript. Поля начинающиеся с определённого шаблона
description: Получить объединение полей начинающихся с определённого слова
tags:
    - typescript
    - задачи
---

# Задача TypeScript. Поля начинающиеся с определённого шаблона

## Задача

Есть сущность рабочего процесса `WorkflowEntity`. В ней поля начинающиеся на `need` — это флаги выполняемых операций.

```typescript
type WorkflowEntity = {
  id: string;
  isActive: boolean;
  needImport: boolean;
  needCalculate: boolean;
  needExport: boolean;
};
```

Флаги выставляются чекбоксами на фронте. Решили, что бэкенд сам определять какие галочки выводить, присылая список нужных "галочек" в виде:

```json
{
  "id": "d36f5fe2-32ea-4037-a4bd-5db7d1b02207",
  "name": "Калькуляция",
  "workflowField": "needCalculate"
}
```

Нужно описать тип операции так, чтобы `workflowField` соответствовал полям из `WorkflowEntity`, но только начинающимся на `need`.

## Решение

Использовать шаблонные литералы:

```typescript
type WorkflowOperation = {
    id: string;
    name: string;
    workflowField: Extract<keyof WorkflowEntity, `need${string}`>; // "needImport" | "needCalculate" | "needExport"
};
```
