# Порядок работы с проектом

## 1. GitHub

В проекте существует 2 основные ветки:
- main - основная production ветка
- develop - ветка разработки

Каждый спринт от ***develop*** создается новая ветка с названием спринта sprint_Number.
Для добавления нового функционала:
- Создается ветка c номером выполняемой таски в [Linear](https://linear.app/practicum-team-06/team/PRA/active). Например, feature/PRA-19;
- После выполнения таски необходимо запустить 
``npm run lint`` и ``npm run test``, чтобы проверить, что тесты проходят успешно;
- Запушить ветку в удаленный репозиторий;
- Создать PR и назначить ревьюером любого человека из команды;
- После того как все правки по ревью были запушены и был получен апрув от ревьюера, ветку можно мержить в sprint_Number.
