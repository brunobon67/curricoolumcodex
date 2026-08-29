# Vitae

Vitae è un MVP SaaS completo per creare curriculum professionali ATS-friendly. Include autenticazione, dashboard multi-CV, builder guidato con anteprima live, tre template, riordino delle sezioni, autosave ed esportazione PDF A4.

## Stack

- Next.js 15 App Router, React 19 e TypeScript strict
- Tailwind CSS e componenti UI locali in stile shadcn
- PostgreSQL e Prisma ORM
- React Hook Form + Zod
- dnd-kit per il riordino accessibile
- Cookie di sessione JWT httpOnly firmato con `jose`; password con bcrypt
- Lucide Icons

## Avvio locale

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run db:seed # opzionale
npm run dev
```

Aprire [http://localhost:3000](http://localhost:3000). Se è stato eseguito il seed: `demo@vitae.local` / `demo12345`.

Per un database gestito è sufficiente inserire in `DATABASE_URL` la connection string PostgreSQL fornita da Supabase o Neon. In Supabase usare la connection string diretta per le migrazioni e quella pooled in produzione serverless.

## Flusso MVP

1. Registrazione o login.
2. Creazione di un curriculum vuoto o demo dalla dashboard.
3. Compilazione nell'editor; la preview A4 si aggiorna immediatamente.
4. Scelta tra Classic, Modern e Minimal e personalizzazione controllata.
5. Autosave dopo 800 ms di inattività.
6. Esportazione con **Scarica PDF** e “Salva come PDF” nel dialogo di stampa del browser.

## Architettura

```text
app/                    route, pagine e API App Router
components/resume/      builder, editor e gestione sezioni
components/templates/   renderer indipendente dai dati
components/dashboard/   card e azioni curriculum
lib/                    auth, Prisma, validation e dati demo
services/ai/            contratto provider-agnostic per funzioni AI
types/                  modello TypeScript condiviso
prisma/                 schema e seed
```

Le pagine pubbliche sono Server Components. Builder e interazioni sono Client Components; le query iniziali e l'authorization restano sul server. Ogni endpoint cerca i curriculum con la coppia `id + userId`, impedendo accessi cross-account. Gli input di autenticazione e autosave sono validati con Zod su server.

### Modello dati

`User` e `Resume` sono relazionali, con foreign key e cancellazione a cascata. Il contenuto del CV e le impostazioni sono documenti JSON: hanno un ciclo di salvataggio unitario, cambiano frequentemente durante il product discovery e non richiedono query analitiche nel MVP. L'identità e la proprietà restano invece colonne relazionali indicizzate. Se in futuro serviranno analytics o condivisione granulare, le collezioni Experience/Education potranno essere normalizzate senza cambiare il contratto UI.

### PDF e ATS

Il renderer usa HTML semantico e testo selezionabile, nessun canvas. I CSS di stampa fissano A4, rimuovono chrome e ombre ed evitano `break-inside` nelle sezioni. Il dialogo nativo del browser preserva font e layout e gestisce documenti multipagina.

### AI-ready e pagamenti

`ResumeAIService` separa il prodotto dal provider AI e copre profilo, bullet point, skill, traduzione e ATS analysis. `UnconfiguredAIService` fallisce esplicitamente finché un provider non viene iniettato. Per Stripe si può aggiungere un modello `Subscription` legato a `User` e applicare entitlement nelle API senza modificare il modello Resume.

## Sicurezza e produzione

- Impostare sempre un `AUTH_SECRET` casuale e lungo in produzione.
- La sessione è httpOnly, SameSite=Lax e Secure in produzione.
- Le password sono hashate con bcrypt (cost 12).
- Tutte le operazioni Resume verificano la proprietà server-side.
- Configurare rate limiting per login/registrazione e un provider email prima del lancio pubblico.
- Il recupero password e OAuth Google sono predisposti nell'interfaccia ma richiedono provider email/OAuth; non vengono simulati in modo insicuro.

## Comandi qualità

```bash
npm run typecheck
npm run lint
npm run build
```
