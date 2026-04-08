# Shelby Vinyl — Next.js Setup Checklist

## 1. Mục tiêu file này
File này là checklist để bạn dựng project ban đầu mà không bị quên các bước nền tảng.

---

## 2. Stack chốt cho MVP

- **Frontend + Backend:** Next.js App Router
- **UI:** React + Tailwind CSS + Framer Motion
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** wallet-based auth với Aptos + Petra
- **Storage:** Shelby
- **State/query:** TanStack Query
- **Validation:** Zod
- **Forms:** React Hook Form
- **Icons:** lucide-react
- **Toast:** sonner

---

## 3. Checklist tạo project

### 3.1 Khởi tạo project
- [ ] Tạo project Next.js bằng TypeScript
- [ ] Bật App Router
- [ ] Cài Tailwind CSS
- [ ] Cài ESLint + Prettier
- [ ] Cài alias `@/*`

### 3.2 Cài package nền
- [ ] `@prisma/client`
- [ ] `prisma`
- [ ] `zod`
- [ ] `react-hook-form`
- [ ] `@tanstack/react-query`
- [ ] `framer-motion`
- [ ] `lucide-react`
- [ ] `sonner`
- [ ] `clsx`
- [ ] `tailwind-merge`

### 3.3 Cài package Aptos / Petra
- [ ] Aptos wallet adapter cho React
- [ ] Petra-compatible wallet flow
- [ ] Utility verify message/signature
- [ ] Tách rõ client wallet logic và server auth verification

### 3.4 Cài package Shelby
- [ ] Shelby TypeScript SDK dùng cho server
- [ ] Shelby React SDK nếu cần query blob/account ở client
- [ ] Tạo service wrapper riêng thay vì gọi SDK rải rác khắp app

### 3.5 Database
- [ ] Tạo PostgreSQL local/dev
- [ ] Tạo file `.env`
- [ ] Điền `DATABASE_URL`
- [ ] Khởi tạo Prisma
- [ ] Copy `prisma/schema.prisma`
- [ ] Chạy migration đầu tiên
- [ ] Seed 1 admin user

### 3.6 App foundation
- [ ] Tạo layout tổng
- [ ] Tạo landing page
- [ ] Tạo navbar + footer
- [ ] Tạo provider tree
- [ ] Tạo auth guard
- [ ] Tạo admin guard
- [ ] Tạo hệ thống toast + error state chuẩn

---

## 4. Environment variables dự kiến

```bash
DATABASE_URL=
NEXT_PUBLIC_APP_URL=

# Aptos / Wallet
NEXT_PUBLIC_APTOS_NETWORK=shelbynet
NEXT_PUBLIC_APTOS_NODE_URL=
NEXT_PUBLIC_APTOS_INDEXER_URL=
NEXT_PUBLIC_PETRA_APP_NAME=Shelby Vinyl

# Shelby
SHELBY_API_KEY=
SHELBY_RPC_URL=
SHELBY_NAMESPACE=
SHELBY_EXPLORER_BASE_URL=
SHELBY_FUNDED_ACCOUNT_ADDRESS=
SHELBY_FUNDED_ACCOUNT_PRIVATE_KEY=

# Faucet landing page
NEXT_PUBLIC_SHELBYUSD_FAUCET_URL=
NEXT_PUBLIC_APTOS_FAUCET_URL=

# Auth
AUTH_SECRET=
AUTH_NONCE_EXPIRES_MINUTES=10
```

---

## 5. Các module nên dựng sớm nhất

### Ưu tiên 1
- [ ] auth wallet
- [ ] user profile bootstrap
- [ ] upload track form
- [ ] Shelby upload service
- [ ] my tracks page
- [ ] explore page
- [ ] track detail page
- [ ] vinyl player UI

### Ưu tiên 2
- [ ] faucet landing page
- [ ] download tracking
- [ ] like/favorite
- [ ] report track
- [ ] admin track moderation

### Ưu tiên 3
- [ ] waveform generation
- [ ] featured tracks
- [ ] search/filter
- [ ] analytics dashboard mini

---

## 6. Definition of Done cho setup ban đầu

Chỉ được tính là xong bước setup khi đạt đủ:

- [ ] Chạy local được
- [ ] Connect DB được
- [ ] Prisma migration chạy được
- [ ] Connect Petra wallet được
- [ ] Verify ví và tạo user record được
- [ ] Upload thử 1 file nhạc lên Shelby được
- [ ] Ghi metadata track vào DB được
- [ ] Trang Explore đọc được danh sách track public

---

## 7. Lưu ý triển khai

- Không gắn chặt logic Shelby trực tiếp vào component UI.
- Không để wallet auth và app auth dính cứng vào nhau.
- Không query Explore trực tiếp từ Shelby; lấy từ DB app.
- Không làm admin quá sớm trước khi upload flow chạy ổn.
- Mọi thứ đi qua service layer để sau này dễ đổi SDK/API.
