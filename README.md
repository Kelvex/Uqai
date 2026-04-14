# Uqai

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

## Ejecución entorno de desarrollo

Para ejecutar el proyecto ejecute:

```bash
ng serve
```

## 🧠 Enfoque Reactivo con RxJS

Se utiliza RxJS para combinar múltiples fuentes de datos y reaccionar automáticamente a cambios en la UI.

```ts
private usersApi$: Observable<User[]> = this.userService.getUsers();
private newUsers$ = new BehaviorSubject<User[]>([]);
private search$ = new BehaviorSubject<string>('');

users$ = combineLatest([
  this.usersApi$,
  this.newUsers$,
  this.search$
]).pipe(
  map(([apiUsers, newUsers, search]) => {

    const allUsers = [...newUsers, ...apiUsers];

    if (!search) return allUsers;

    const term = search.toLowerCase();

    return allUsers.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.username.toLowerCase().includes(term)
    );
  })
);
```

## 🔧 Inyección de dependencias

Se utiliza  `inject()` para obtener instancias de servicios sin necesidad de usar constructores.

```ts
private router = inject(Router);
private userService = inject(UserService);
```
