PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "Users" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'user',
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT
);

CREATE TABLE IF NOT EXISTS "Tareas" (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  completada INTEGER NOT NULL DEFAULT 0 CHECK (completada IN (0, 1)),
  prioridad TEXT NOT NULL DEFAULT 'Media' CHECK (prioridad IN ('Baja', 'Media', 'Alta')),
  fecha_limite TEXT,
  user_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES "Users" (id) ON DELETE CASCADE
);
