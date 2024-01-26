
# Gestion de proyectos y usuarios

```Version de node: 20.11.0```

## Características

### Proyectos
- Creación de proyectos.
- Visualización de proyecto/s.
- Asignación y visualización de usuarios por proyecto.
- Actualización y eliminación de proyectos.

### Usuarios
- Creación de usuarios.
- Visualización de usuario/s.
- Actualización y eliminación de usuarios.
- Registro de usuarios.
- Asignación y eliminación de usuarios a proyectos.

### Paginación de la Data
```json
"pagination": {
        "total": 2,
        "skip": 1,
        "limit": 2,
        "next": "/api/users?skip=3&limit=2",
        "prev": "/api/users?skip=1&limit=2"
    }
```
### Registro de Usuarios (Autenticación, Autorización)
 
Para la autenticación, autorización, se utilizan jsonwebtokens(jwt). la autenticación se realiza en las rutas `/auth` y la autorización es realizada por el middleware `authenticate.middleware.ts`

### Manejo de Errores y Excepciones

Los errores y excepciones se manejan en los servicios(archivos en la carpeta `services`) y utilizan la clase personalizada `CustomHttpErrors` que se encuentra en la carpeta de los helpers.

### Manejo de Códigos de Errores HTTPs

Los errores HTTPs se manejan en los controladores luego de ser llamados por alguno de los servicios y utilizan la clase personalizada `CustomHandleErrros` que se encuentra en la carpeta de los helpers.

### Sistema de cacheo

La API utiliza un paquete de npm `apicache` para implementar un pequeno sistema de cacheo. Este se utiliza sólo en las ruta `users`

### Test
El test está echo para las rutas de forma nátiva en node

#### Ejecutar Tests

Para ejecutar los test, correr el siguiente comando.

```bash
  pnpm run test
```

## Iniciar en desarrollo

1. Clonar el archivo `.env.template` a `.env` y configurar las variables.

2. Ejecutar `pnpm install` para descargar los modulos.

3. Ejecutar `pnpm prisma migrate dev` para crear la configución de la DB.

5. Ejecutar `pnpm run dev` para levantar el servidor en desarrollo.
    
## Documentation

[Postman](https://documenter.getpostman.com/view/32489654/2s9YypFPFF)

### URL de la API

[Render](https://sovex-api.onrender.com/)

### Endpoints

#### Registrar usuario

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Username |
| `mail` | `string` | **Required**. User mail |
| `password` | `string` | **Required**. User password |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X POST -d '{"name": "anne", "mail": "jane@gmail.com", "password": "1234"}' "{{url}}/api/auth/register"
```


#### Acceder a cuenta

```http
  POST /api/auth/Login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `mail`      | `string` | **Required**. Mail of the user registered. |
| `password`      | `string` | **Required**. Password to compare with the password of the user in db. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X POST -d '{"mail": "jane@gmail.com", "password": "1234"}' "{{url}}/api/auth/login"
```

#### Obtener todos los usuarios

```http
  GET /api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X GET "${{url}}/api/users"
```

#### Obtener un usuario por el id

```http
  GET /api/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the user. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X GET "${{url}}/api/users/{{id}}"
```

#### Actualizar cuenta

```http
  PUT /api/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the user. |
| `name`      | `string` | **Optional**. Name for change. |
| `password`      | `string` | **Optional**. Password for change. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X PUT -d '{"name": "jane", "password": "12345"}' "${{url}}/api/users/{{id}}"
```

#### Eliminar cuenta

```http
  Delete /api/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the user. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X DELETE "${{url}}/api/users/{{id}}"
```

#### Crear un proyecto

```http
  POST /api/projects
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the project. |
| `description`      | `string` | **Optional**. Description of the project. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X POST -d '{"name": "get pokemons"}' {{url}}/api/projects 
```

#### Obtener todos los projectos(devuelve los proyectos del usuario que está haciendo la perioción)

```http
  GET /api/projects
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X GET {{url}}/api/projects 
```

#### Obtener un proyecto por el id(sólo de los proyectos del usuario que está haciendo la petión)

```http
  GET /api/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the project to get. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X GET {{url}}/api/projects/{{id}}
```

#### Actualizar un projecto

```http
  PUT /api/projects/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Optional**. Name of the project. |
| `description`      | `string` | **Optional**. Description of the project. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X POST -d '{"name": "get pokemons", "description": "get all pokemons type fire"}' {{url}}/api/projects/{{id}}
```

#### Eliminar un proyecto

```http
  Delete /api/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the project to get. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```cURL
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X DELETE {{url}}/api/projects/{{id}}
```

#### Agregar un participante al proyecto(sólo de los proyectos del usuario que está haciendo la petión)

```http
  POST /api/participants/project/:project_id/user/:user_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `project_id`      | `string` | **Required**. Id of the project to add the participant. |
| `user_id`      | `string` | **Required**. Id of the user to add in the participants of the project. |
| `rol`      | `string` | **Required**. Role of the user in the project. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```curl
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X POST -d '{"rol": "dev"}' {{url}}/api/participants/project/{{project_id}/user/{{user_id}}
```

#### Obtener los participantes del un proyecto(sólo de los proyectos del usuario que está haciendo la petión)

```http
  GET /api/participants/project/project_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `project_id`      | `string` | **Required**. Id of the project to add the participant. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```curl
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X GET {{url}}/api/participants/project/{{project_id}
```

#### Eliminar un participante del proyecto

```http
  Delete /api/participants/project/:project_id/user/:user_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `project_id`      | `string` | **Required**. Id of the project to add the participant. |
| `user_id`      | `string` | **Required**. Id of the user to add in the participants of the project. |
| `Authorization`      | `string` | **Required**. Bearer token to make a request to this endpoint. |

##### Example cURL
```curl
curl -H "Content-Type: application/json" -H "Authorization: Bearer {{token}}" -X DELETE {{url}}/api/participants/project/{{project_id}/user/{{user_id}}
```

## Tech

**Server:** TypeScript, Node, Express, PostgreSQL, prisma
