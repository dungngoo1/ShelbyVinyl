# Shelby Vinyl — Folder Structure (MVP)

## 1. Mục tiêu file này
File này định hình cấu trúc project để codebase không bị rối ngay từ tuần đầu.

Gợi ý dưới đây theo hướng:
- Next.js App Router
- TypeScript
- Prisma
- PostgreSQL
- Shelby SDK phía server
- Petra wallet ở frontend

---

## 2. Cấu trúc tổng thể đề xuất

```text
shelby-vinyl/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx                    # landing page
│  │  ├─ explore/page.tsx            # explore
│  │  ├─ faucet/page.tsx             # faucet landing
│  │  ├─ about/page.tsx              # about
│  │  └─ tracks/[trackId]/page.tsx   # track detail
│  │
│  ├─ (protected)/
│  │  ├─ me/page.tsx                 # dashboard cá nhân
│  │  ├─ me/tracks/page.tsx          # my tracks
│  │  ├─ me/favorites/page.tsx       # favorites (optional)
│  │  └─ upload/page.tsx             # upload page
│  │
│  ├─ admin/
│  │  ├─ page.tsx                    # admin dashboard
│  │  ├─ tracks/page.tsx             # admin tracks
│  │  ├─ reports/page.tsx            # admin reports
│  │  ├─ users/page.tsx              # admin users
│  │  └─ faucet/page.tsx             # admin faucet logs
│  │
│  ├─ api/
│  │  ├─ auth/
│  │  │  └─ wallet/
│  │  │     ├─ challenge/route.ts
│  │  │     └─ verify/route.ts
│  │  │
│  │  ├─ me/route.ts
│  │  ├─ tracks/
│  │  │  ├─ route.ts
│  │  │  ├─ [id]/route.ts
│  │  │  ├─ [id]/publish/route.ts
│  │  │  ├─ [id]/favorite/route.ts
│  │  │  ├─ [id]/report/route.ts
│  │  │  ├─ [id]/play/route.ts
│  │  │  ├─ [id]/stream/route.ts
│  │  │  └─ [id]/download/route.ts
│  │  │
│  │  ├─ uploads/
│  │  │  ├─ init/route.ts
│  │  │  ├─ [trackId]/audio/route.ts
│  │  │  ├─ [trackId]/cover/route.ts
│  │  │  └─ [trackId]/finalize/route.ts
│  │  │
│  │  ├─ faucet/
│  │  │  ├─ apt/route.ts
│  │  │  ├─ shelbyusd/route.ts
│  │  │  └─ history/route.ts
│  │  │
│  │  └─ admin/
│  │     ├─ stats/route.ts
│  │     ├─ tracks/route.ts
│  │     ├─ tracks/[id]/hide/route.ts
│  │     ├─ tracks/[id]/unhide/route.ts
│  │     ├─ reports/route.ts
│  │     ├─ reports/[id]/resolve/route.ts
│  │     ├─ reports/[id]/dismiss/route.ts
│  │     ├─ users/route.ts
│  │     ├─ users/[id]/suspend/route.ts
│  │     ├─ users/[id]/ban/route.ts
│  │     └─ faucet/route.ts
│  │
│  ├─ layout.tsx
│  ├─ globals.css
│  └─ providers.tsx
│
├─ components/
│  ├─ layout/
│  │  ├─ navbar.tsx
│  │  ├─ footer.tsx
│  │  └─ page-container.tsx
│  │
│  ├─ player/
│  │  ├─ vinyl-player.tsx
│  │  ├─ tonearm.tsx
│  │  ├─ playback-controls.tsx
│  │  ├─ waveform.tsx
│  │  └─ progress-bar.tsx
│  │
│  ├─ track/
│  │  ├─ track-card.tsx
│  │  ├─ track-grid.tsx
│  │  ├─ track-list.tsx
│  │  ├─ track-metadata-form.tsx
│  │  └─ track-visibility-badge.tsx
│  │
│  ├─ upload/
│  │  ├─ upload-form.tsx
│  │  ├─ audio-dropzone.tsx
│  │  ├─ cover-dropzone.tsx
│  │  └─ upload-progress.tsx
│  │
│  ├─ wallet/
│  │  ├─ connect-petra-button.tsx
│  │  ├─ wallet-status.tsx
│  │  └─ sign-in-with-wallet.tsx
│  │
│  ├─ faucet/
│  │  ├─ faucet-card.tsx
│  │  ├─ faucet-claim-button.tsx
│  │  └─ faucet-history-table.tsx
│  │
│  ├─ admin/
│  │  ├─ stats-cards.tsx
│  │  ├─ reports-table.tsx
│  │  ├─ users-table.tsx
│  │  └─ tracks-table.tsx
│  │
│  └─ ui/
│     └─ ...shared ui components
│
├─ lib/
│  ├─ auth/
│  │  ├─ wallet-challenge.ts
│  │  ├─ verify-wallet-signature.ts
│  │  ├─ session.ts
│  │  └─ guards.ts
│  │
│  ├─ db/
│  │  ├─ prisma.ts
│  │  └─ queries/
│  │     ├─ users.ts
│  │     ├─ tracks.ts
│  │     ├─ reports.ts
│  │     └─ faucet.ts
│  │
│  ├─ shelby/
│  │  ├─ client.ts
│  │  ├─ upload-audio.ts
│  │  ├─ upload-cover.ts
│  │  ├─ download-blob.ts
│  │  ├─ stream-blob.ts
│  │  └─ explorer.ts
│  │
│  ├─ faucet/
│  │  ├─ claim-apt.ts
│  │  ├─ claim-shelbyusd.ts
│  │  └─ rate-limit.ts
│  │
│  ├─ validators/
│  │  ├─ auth.ts
│  │  ├─ tracks.ts
│  │  ├─ uploads.ts
│  │  └─ faucet.ts
│  │
│  ├─ constants/
│  │  ├─ roles.ts
│  │  ├─ track-status.ts
│  │  ├─ visibility.ts
│  │  └─ networks.ts
│  │
│  ├─ utils/
│  │  ├─ format-wallet.ts
│  │  ├─ format-duration.ts
│  │  ├─ slug.ts
│  │  └─ time.ts
│  │
│  └─ env.ts
│
├─ hooks/
│  ├─ use-current-user.ts
│  ├─ use-connect-petra.ts
│  ├─ use-upload-track.ts
│  ├─ use-faucet-claim.ts
│  └─ use-audio-player.ts
│
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed.ts
│
├─ public/
│  ├─ images/
│  ├─ icons/
│  └─ placeholders/
│
├─ styles/
│  └─ optional-extra-styles.css
│
├─ types/
│  ├─ auth.ts
│  ├─ track.ts
│  ├─ faucet.ts
│  └─ api.ts
│
├─ middleware.ts
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ .env.example
└─ README.md
```

---

## 3. Ý nghĩa từng vùng

## `app/`
Chứa pages và API routes theo App Router.

## `components/`
Chứa UI tách theo domain thay vì để một đống component lẫn lộn.

## `lib/auth/`
Tất cả logic login bằng Petra, challenge message, verify signature, session guard.

## `lib/shelby/`
Tập trung toàn bộ tích hợp Shelby để tránh gọi SDK lung tung khắp codebase.

## `lib/db/queries/`
Tách query DB theo domain để route handlers gọn hơn.

## `lib/faucet/`
Tập trung toàn bộ logic gọi faucet + cooldown / rate limit.

## `hooks/`
Hooks frontend cho wallet, upload, player, faucet.

## `prisma/`
Schema và migrations.

---

## 4. Tư duy tổ chức code rất quan trọng

### Nguyên tắc 1: Shelby logic không rải khắp nơi
Không gọi Shelby SDK trực tiếp từ nhiều chỗ.
Tất cả nên đi qua `lib/shelby/*`.

### Nguyên tắc 2: Route handler chỉ làm 3 việc
- nhận input
- gọi service/query
- trả response

Không nhét hết business logic vào route.

### Nguyên tắc 3: UI tách theo domain
- player/
- track/
- wallet/
- faucet/
- admin/

Sau này scale sẽ dễ hơn rất nhiều.

### Nguyên tắc 4: constants và validators riêng
Status, visibility, roles, network names nên tập trung một chỗ.
Không hard-code string khắp app.

---

## 5. File nên làm đầu tiên

### Tuần đầu
- `prisma/schema.prisma`
- `lib/env.ts`
- `lib/db/prisma.ts`
- `lib/auth/wallet-challenge.ts`
- `lib/auth/verify-wallet-signature.ts`
- `lib/shelby/client.ts`
- `app/(public)/page.tsx`
- `app/(protected)/upload/page.tsx`
- `app/api/auth/wallet/challenge/route.ts`
- `app/api/auth/wallet/verify/route.ts`
- `app/api/uploads/init/route.ts`

### Tuần hai
- `app/api/uploads/[trackId]/audio/route.ts`
- `lib/shelby/upload-audio.ts`
- `app/(protected)/me/tracks/page.tsx`
- `app/(public)/explore/page.tsx`
- `app/(public)/tracks/[trackId]/page.tsx`
- `components/player/vinyl-player.tsx`

---

## 6. Env variables gợi ý

```bash
DATABASE_URL=
NEXTAUTH_SECRET=
SHELBY_API_KEY=
SHELBY_RPC_URL=
SHELBY_EXPLORER_BASE_URL=
APTOS_NETWORK=shelbynet
APTOS_NODE_URL=
APTOS_FAUCET_URL=
SHELBYUSD_FAUCET_URL=
APP_BASE_URL=
```

---

## 7. Những gì chưa cần nhét vào structure lúc đầu
Chưa cần tạo ngay:
- queue workers riêng
- microservices
- event bus
- separate package monorepo

MVP cứ giữ 1 codebase trước.

---

## 8. Kết luận
Folder structure này đủ gọn để bắt đầu nhanh, nhưng vẫn đủ sạch để sau này mở rộng thành sản phẩm nghiêm túc.
