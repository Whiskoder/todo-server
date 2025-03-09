## Configuración del proyecto

Instala las dependencias

```bash
npm install
```

Copia el archivo `.env.template` a `.env` y modifica las variables de entorno

```bash
cp .env.template .env
```

---

## Ejecución del proyecto

Para ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

Para ejecutar el proyecto en modo producción

```bash
npm run build
npm start
```

---

## Docker

Si deseas crear un contenedor Docker con la base de datos MySQL, puedes usar el archivo `docker-compose.yaml` para crear el contenedor.

```bash
docker-compose -f docker-compose.yaml --env-file .env up -d
```

> [!WARNING]
> Omite este paso si ya tienes una base de datos MySQL configurada.

## API

### POST /api/tasks/

Crea una nueva tarea

##### Request

<table>
	<tr>
		<th colspan="3" style="text-align: center">Request body</th>
	</tr>
	<tr>
		<th>Propiedad</th>
		<th>Tipo</th>
		<th>Descripción</th>
	</tr>
	<tr>
		<td>title</td>
		<td >string <span>required* </span></td>
		<td>Título de la tarea entre 3 y 255 caracteres</td>
	</tr>
	<tr>
		<td>description</td>
		<td >string <span>required* </span></td>
		<td>Descripción de la tarea entre 3 y 255 caracteres</td>
	</tr>
</table>

##### Example

```json
{
  "title": "Ejemplo de tarea",
  "description": "Descripción de la tarea"
}
```

##### Response

```json
{
  "statusCode": 200,
  "message": "Tarea creada correctamente",
  "task": {
    "id": 1,
    "title": "Ejemplo de tarea",
    "description": "Descripción de la tarea",
    "status": "pending",
    "createdAt": "2023-03-01T00:00:00.000Z",
    "updatedAt": "2023-03-01T00:00:00.000Z"
  }
}
```

### GET /api/tasks/

Obtiene una lista de tareas

##### Request

<table>
	<tr>
		<th colspan="3" style="text-align: center">Query params</th>
	</tr>
	<tr>
		<th>Propiedad</th>
		<th>Tipo</th>
		<th>Descripción</th>
	</tr>
	<tr>
		<td>limit</td>
		<td >number</td>
		<td>Cantidad de tareas a devolver entre 1 y 100</td>
	</tr>
	<tr>
		<td>offset</td>
		<td >number</td>
		<td>Cantidad de tareas desde el inicio de la lista</td>
	</tr>
</table>

##### Response

```json
{
  "statusCode": 200,
  "message": "Tareas obtenidas correctamente",
  "tasks": [
    {
      "id": 1,
      "title": "Ejemplo de tarea",
      "description": "Descripción de la tarea",
      "status": "pending",
      "createdAt": "2023-03-01T00:00:00.000Z",
      "updatedAt": "2023-03-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "title": "Ejemplo de tarea",
      "description": "Descripción de la tarea",
      "status": "pending",
      "createdAt": "2023-03-01T00:00:00.000Z",
      "updatedAt": "2023-03-01T00:00:00.000Z"
    }
  ]
}
```

### GET /api/tasks/:id

Obtiene una tarea por su id

<table>
	<tr>
		<th colspan="3" style="text-align: center">Request params</th>
	</tr>
	<tr>
		<th>Propiedad</th>
		<th>Tipo</th>
		<th>Descripción</th>
	</tr>
	<tr>
		<td>id</td>
		<td >number <span>required* </span></td>
		<td>Id de la tarea, debe ser un número positivo</td>
	</tr>
</table>

#### Example

```bash
GET /api/tasks/1
```

##### Response

```json
{
  "statusCode": 200,
  "message": "Tarea obtenida correctamente",
  "task": {
    "id": 1,
    "title": "Ejemplo de tarea",
    "description": "Descripción de la tarea",
    "status": "pending",
    "createdAt": "2023-03-01T00:00:00.000Z",
    "updatedAt": "2023-03-01T00:00:00.000Z"
  }
}
```

### PUT /api/tasks/:id

Actualiza una tarea por su id

<table>
	<tr>
		<th colspan="3" style="text-align: center">Request params</th>
	</tr>
	<tr>
		<th>Propiedad</th>
		<th>Tipo</th>
		<th>Descripción</th>
	</tr>
	<tr>
		<td>id</td>
		<td >number <span>required* </span></td>
		<td>Id de la tarea, debe ser un número positivo</td>
	</tr>
</table>

<table>
	<tr>
		<th colspan="3" style="text-align: center">Request body</th>
	</tr>
	<tr>
		<th>Propiedad</th>
		<th>Tipo</th>
		<th>Descripción</th>
	</tr>
	<tr>
		<td>title</td>
		<td >string</td>
		<td>Título de la tarea entre 3 y 255 caracteres</td>
	</tr>
	<tr>
		<td>description</td>
		<td >string</td>
		<td>Descripción de la tarea entre 3 y 255 caracteres</td>
	</tr>
	<tr>
		<td>status</td>
		<td >string</td>
		<td>Estado de la tarea, debe ser uno de los siguientes: pending, completed</td>
	</tr>
</table>

##### Example

```bash
PUT /api/tasks/1
```

```json
{
  "title": "Ejemplo de tarea actualizada",
  "description": "Descripción de la tarea actualizada",
  "status": "completed"
}
```

##### Response

```json
{
  "statusCode": 200,
  "message": "Tarea actualizada correctamente",
  "task": {
    "id": 1,
    "title": "Ejemplo de tarea actualizada",
    "description": "Descripción de la tarea actualizada",
    "status": "completed",
    "createdAt": "2023-03-01T00:00:00.000Z",
    "updatedAt": "2023-03-01T00:00:00.000Z"
  }
}
```

### DELETE /api/tasks/:id

Elimina una tarea por su id

<table>
	<tr>
		<th colspan="3" style="text-align: center">Request params</th>
	</tr>
	<tr>
		<th>Propiedad</th>
		<th>Tipo</th>
		<th>Descripción</th>
	</tr>
	<tr>
		<td>id</td>
		<td >number <span>required* </span></td>
		<td>Id de la tarea, debe ser un número positivo</td>
	</tr>
</table>

```bash
DELETE /api/tasks/1
```

##### Response

```json
{
  "statusCode": 200,
  "message": "Tarea eliminada correctamente"
}
```
