# Shelby Vinyl — Database Schema (MVP)

## 1. Mục tiêu file này
File này chốt cấu trúc dữ liệu nền cho MVP để tránh tình trạng code trước rồi mới nghĩ schema sau.

MVP cần phục vụ 6 nhu cầu chính:
- xác thực user bằng Aptos + Petra Wallet
- lưu metadata nhạc được upload lên Shelby
- hiển thị danh sách nhạc của chính user
- hiển thị trang explore với các bài public
- hỗ trợ admin moderation cơ bản
- hỗ trợ landing page faucet trên Shelbynet

> Nguyên tắc: **Shelby lưu file**, còn **PostgreSQL lưu metadata nghiệp vụ**.

---

## 2. Công nghệ đề xuất
- Database: PostgreSQL
- ORM: Prisma
- ID strategy: UUID cho bảng nghiệp vụ
- Time fields: `created_at`, `updated_at` dùng UTC

---

## 3. Entity tổng quan

```text
User
 ├─ Wallet
 ├─ Track
 │   ├─ TrackAsset
 │   ├─ TrackPlay
 │   ├─ TrackFavorite
 │   └─ TrackReport
 └─ FaucetClaim

AdminAction -> User / Track
```

---

## 4. Bảng chi tiết

## 4.1 users
Lưu thông tin người dùng trong app.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | id nội bộ của app |
| username | varchar(32) unique nullable | username public |
| display_name | varchar(80) | tên hiển thị |
| bio | text nullable | mô tả ngắn |
| avatar_url | text nullable | avatar |
| role | enum(`user`,`admin`) | phân quyền |
| status | enum(`active`,`suspended`,`banned`) | trạng thái tài khoản |
| primary_wallet_address | varchar(128) unique | ví Aptos chính |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### Ghi chú
- Với MVP, 1 user có thể bắt đầu với 1 ví chính.
- Sau này có thể tách nhiều ví qua bảng `wallets`.

---

## 4.2 wallets
Lưu thông tin kết nối ví để hỗ trợ verify Petra và mở rộng multi-wallet sau này.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK -> users.id | |
| wallet_address | varchar(128) unique | địa chỉ ví Aptos |
| wallet_provider | enum(`petra`) | MVP chỉ Petra |
| is_primary | boolean | |
| verified_at | timestamptz nullable | thời điểm verify |
| created_at | timestamptz | |

### Ghi chú
- Khi login bằng Petra, app tạo user nếu ví chưa tồn tại.
- `verified_at` set khi signature challenge hợp lệ.

---

## 4.3 tracks
Bảng trung tâm của sản phẩm.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| owner_user_id | uuid FK -> users.id | chủ sở hữu |
| title | varchar(160) | tên bài |
| artist_name | varchar(160) | artist hiển thị |
| album_name | varchar(160) nullable | |
| description | text nullable | |
| genre | varchar(80) nullable | |
| cover_image_url | text nullable | ảnh cover |
| visibility | enum(`public`,`unlisted`,`private`) | |
| status | enum(`draft`,`processing`,`published`,`hidden`,`deleted`) | |
| duration_seconds | integer nullable | |
| file_size_bytes | bigint nullable | |
| mime_type | varchar(120) nullable | ví dụ `audio/mpeg` |
| shelby_namespace | varchar(128) nullable | namespace/account liên quan |
| shelby_blob_name | varchar(255) nullable | tên blob chính |
| shelby_explorer_url | text nullable | link để tải/xem trên Shelby Explorer |
| upload_source | enum(`web`,`admin`) | |
| published_at | timestamptz nullable | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### Ghi chú
- `status=processing` trong lúc upload / commit lên Shelby.
- `published_at` chỉ set khi bài đủ điều kiện hiển thị ra explore.

---

## 4.4 track_assets
Một bài có thể có nhiều asset: audio, cover, waveform, lyrics.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| track_id | uuid FK -> tracks.id | |
| asset_type | enum(`audio`,`cover`,`waveform`,`lyrics`) | |
| storage_provider | enum(`shelby`) | MVP chỉ Shelby |
| blob_name | varchar(255) | |
| namespace | varchar(128) nullable | |
| content_type | varchar(120) nullable | |
| size_bytes | bigint nullable | |
| checksum | varchar(255) nullable | hash/checksum nếu có |
| explorer_url | text nullable | link public |
| created_at | timestamptz | |

### Ghi chú
- Track audio chính cũng nên được lưu thêm ở đây để mở rộng dễ hơn.
- `tracks.shelby_blob_name` giữ đường dẫn nhanh cho asset audio chính.

---

## 4.5 track_plays
Lưu lượt nghe để phục vụ explore/trending.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| track_id | uuid FK -> tracks.id | |
| user_id | uuid FK -> users.id nullable | anonymous thì null |
| session_id | varchar(128) nullable | |
| played_seconds | integer nullable | |
| created_at | timestamptz | |

### Ghi chú
- MVP có thể chỉ cần insert đơn giản khi user play > X giây.
- Sau này có thể thêm anti-spam dedupe logic.

---

## 4.6 track_favorites
Bảng user thích bài hát nào.

| Field | Type | Notes |
|---|---|---|
| user_id | uuid FK -> users.id | composite PK |
| track_id | uuid FK -> tracks.id | composite PK |
| created_at | timestamptz | |

---

## 4.7 track_reports
Cho user report bài hát vi phạm.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| track_id | uuid FK -> tracks.id | |
| reporter_user_id | uuid FK -> users.id | |
| reason | enum(`copyright`,`abuse`,`spam`,`other`) | |
| detail | text nullable | |
| status | enum(`open`,`reviewing`,`resolved`,`dismissed`) | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

---

## 4.8 admin_actions
Audit log cho admin.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| admin_user_id | uuid FK -> users.id | admin thực hiện |
| target_type | enum(`user`,`track`,`report`,`faucet`) | |
| target_id | uuid nullable | |
| action_type | varchar(100) | ví dụ `hide_track`, `ban_user` |
| notes | text nullable | |
| created_at | timestamptz | |

---

## 4.9 faucet_claims
Phục vụ landing page faucet và chống abuse cơ bản.

| Field | Type | Notes |
|---|---|---|
| id | uuid PK | |
| user_id | uuid FK -> users.id nullable | nếu đã login |
| wallet_address | varchar(128) | ví nhận token |
| token_type | enum(`apt`,`shelbyusd`) | |
| network | enum(`shelbynet`) | |
| status | enum(`requested`,`success`,`failed`,`rate_limited`) | |
| tx_hash | varchar(255) nullable | nếu faucet trả ra |
| ip_hash | varchar(255) nullable | chống abuse mức cơ bản |
| user_agent | text nullable | |
| created_at | timestamptz | |

### Ghi chú
- Không nhất thiết app tự mint token. Có thể chỉ redirect/call faucet API rồi lưu log.

---

## 5. Index nên có

### users
- unique(`primary_wallet_address`)
- unique(`username`)

### wallets
- unique(`wallet_address`)
- index(`user_id`)

### tracks
- index(`owner_user_id`, `created_at desc`)
- index(`visibility`, `status`, `published_at desc`)
- index(`genre`)
- index(`status`)

### track_assets
- index(`track_id`)
- index(`asset_type`)

### track_plays
- index(`track_id`, `created_at desc`)
- index(`user_id`, `created_at desc`)

### track_reports
- index(`track_id`)
- index(`status`, `created_at desc`)

### faucet_claims
- index(`wallet_address`, `created_at desc`)
- index(`token_type`, `created_at desc`)
- index(`status`)

---

## 6. Enum đề xuất

```text
UserRole = user | admin
UserStatus = active | suspended | banned
WalletProvider = petra
TrackVisibility = public | unlisted | private
TrackStatus = draft | processing | published | hidden | deleted
TrackAssetType = audio | cover | waveform | lyrics
UploadSource = web | admin
ReportReason = copyright | abuse | spam | other
ReportStatus = open | reviewing | resolved | dismissed
FaucetTokenType = apt | shelbyusd
FaucetStatus = requested | success | failed | rate_limited
AdminTargetType = user | track | report | faucet
```

---

## 7. Query cốt lõi app sẽ cần

### My Tracks
```sql
SELECT *
FROM tracks
WHERE owner_user_id = $userId
  AND status != 'deleted'
ORDER BY created_at DESC;
```

### Explore page
```sql
SELECT *
FROM tracks
WHERE visibility = 'public'
  AND status = 'published'
ORDER BY published_at DESC
LIMIT 24;
```

### Track detail page
```sql
SELECT *
FROM tracks
WHERE id = $trackId
  AND status IN ('published', 'hidden');
```

### Admin review reports
```sql
SELECT *
FROM track_reports
WHERE status IN ('open', 'reviewing')
ORDER BY created_at DESC;
```

---

## 8. Quy tắc nghiệp vụ nên chốt từ đầu
- User chỉ được sửa/xóa track của chính mình.
- Track chỉ lên Explore khi `status='published'` và `visibility='public'`.
- Admin có thể đổi `status='hidden'` để gỡ bài khỏi giao diện mà chưa cần xóa blob.
- Xóa mềm trước, xóa cứng sau.
- Mọi action nhạy cảm của admin nên ghi vào `admin_actions`.
- Faucet nên có cooldown theo ví + IP.

---

## 9. Những gì CHƯA cần ở MVP
Chưa cần thêm các bảng sau ở version đầu:
- comments
- playlists
- follows
- notifications
- revenue/royalty splits
- on-chain ownership history chi tiết

Để dành phase 2-3.

---

## 10. Kết luận
Schema này đủ để build một MVP có:
- login/verify ví Petra
- upload nhạc lên Shelby
- trang My Tracks
- trang Explore
- admin moderation cơ bản
- landing page faucet cho Shelbynet

Nếu bám đúng schema này thì code backend sẽ đỡ lan man rất nhiều.
