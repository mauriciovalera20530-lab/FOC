Proyecto de Formación Complementaria (FOC) de estudiantes del 4to Semestre, sección "A", del IUJO Barquisimeto.

Integrantes:

Enrique Perez - 31271715;
Fabian Da Cal - 31221679;
Mauricio Valera - 30345431

Tutor/Profesor:

Eduardo Nieves - Zedmous

Prerrequisitos
Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

Node.js:
PostgreSQL
Guía de Instalación y Configuración
Sigue estos pasos para poner en marcha el proyecto:

Instalar Dependencias
npm install
Configuracion del .env
Reemplaza:
- password: Tu contraseña de PostgreSQL
- nombre_db: El nombre de la base de datos que quieres usar para este proyecto,
igualmente, dejamos una base de datos(DataBase) con datos ya cargados.
DATABASE_URL="postgresql://usuario:password@localhost:5432/nombre_db"

Configuracion del prisma
1. npx prisma migrate dev --name init

2. npx prisma generate
Ejecucion
npm run dev
