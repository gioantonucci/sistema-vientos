# Vientos del Sur - Camino a produccion

## Decision de stack

- Frontend y app web: Next.js.
- Hosting frontend: Vercel.
- Base de datos, autenticacion y archivos: Supabase.
- Dominio sugerido para el sistema: app.equipovientos.com.ar.

## Estado del dominio

El dominio comprado es equipovientos.com.ar en NIC.ar. Hasta que el pago se acredite no conviene tocar DNS. Cuando este activo, la configuracion recomendada es:

- app.equipovientos.com.ar -> Vercel.
- www.equipovientos.com.ar puede quedar reservado para una web publica futura.

## Roles de MVP

- admin: ve y edita todo.
- profesional: ve sus pacientes asignados, sus turnos y puede cargar seguimiento.

## Cambios necesarios respecto de la app actual

La app actual usa localStorage y usuarios mock. Para probar como sistema real hay que reemplazar eso por:

- Login real con Supabase Auth.
- Perfil interno por usuario.
- Base PostgreSQL.
- Politicas RLS para permisos por rol.
- Storage privado para documentos de pacientes.
- Backups del proyecto Supabase.

## Fases

### Fase 1 - Base real

1. Crear proyecto en Supabase.
2. Ejecutar el esquema SQL inicial.
3. Crear usuarios admin/profesional en Supabase Auth.
4. Asociar cada usuario a su perfil y, si corresponde, a un profesional.
5. Activar RLS y probar permisos.

### Fase 2 - Migracion de frontend

1. Crear app Next.js.
2. Migrar layout y vistas actuales a componentes.
3. Reemplazar localStorage por consultas Supabase.
4. Implementar login/logout real.
5. Conectar CRUD de profesionales, pacientes, turnos, pagos, notas y documentos.

### Fase 3 - Deploy

1. Crear repo GitHub.
2. Conectar repo a Vercel.
3. Configurar variables de entorno.
4. Deploy a dominio temporal de Vercel.
5. Cuando NIC.ar acredite dominio, configurar app.equipovientos.com.ar.

## Variables de entorno esperadas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

La service role key no debe usarse en el navegador.

## Pendientes de decision

- Nombre de la cuenta GitHub donde se creara el repo.
- Cuenta Vercel a conectar.
- Cuenta Supabase a usar.
- Emails reales de los primeros usuarios admin y profesionales.
