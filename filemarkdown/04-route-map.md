# Shelby Vinyl — Route Map (MVP)

## 1. Mục tiêu file này
File này định nghĩa toàn bộ màn hình và API route chính để khi bắt tay code không bị thiếu page hoặc làm trùng chức năng.

---

## 2. Frontend pages

## 2.1 Public pages

### `/`
**Landing page**
- hero section giới thiệu sản phẩm nghe nhạc kiểu đĩa than
- CTA connect Petra wallet
- CTA Explore
- CTA Faucet Shelbynet
- section giải thích: upload lên Shelby, public download, vinyl player UI

### `/explore`
**Trang nhạc chung**
- grid/list tất cả bài public đã publish
- sort: newest, trending
- filter genre (optional MVP+)
- search (có thể phase 1.5)

### `/tracks/[trackId]`
**Trang chi tiết bài hát**
- vinyl player
- cover art
- title / artist / owner
- play / pause
- download button
- copy Shelby Explorer link
- report button

### `/faucet`
**Landing page faucet Shelbynet**
- giải thích cần APT + ShelbyUSD để test/upload
- connect Petra wallet
- nhập hoặc auto-fill wallet address
- nút claim Aptos test token
- nút claim ShelbyUSD
- hiển thị lịch sử claim gần đây của user
- hiển thị trạng thái rate limit / success / fail

### `/about`
**Giới thiệu dự án**
- mô tả sản phẩm
- Shelby storage idea
- disclaimer bản quyền

---

## 2.2 Authenticated pages

### `/me`
**Dashboard cá nhân**
- thông tin ví Petra
- tổng số track đã upload
- quick actions: Upload / My Tracks / Faucet

### `/me/tracks`
**Nhạc của tôi**
- list bài của user
- lọc theo status: published / processing / hidden
- edit metadata
- toggle visibility
- delete soft

### `/upload`
**Trang upload**
- chọn file audio
- chọn ảnh cover
- nhập title / artist / genre / description
- chọn visibility
- upload progress
- trạng thái Shelby upload + commit

### `/me/favorites`
**Bài hát đã thích**
- optional cho MVP nếu kịp

---

## 2.3 Admin pages

### `/admin`
**Admin dashboard**
- tổng user
- tổng track
- số report mở
- số faucet request thất bại/rate limit

### `/admin/tracks`
**Quản lý tracks**
- tìm kiếm theo title / wallet / owner
- ẩn / bỏ ẩn bài
- xem trạng thái blob/explorer link

### `/admin/reports`
**Quản lý reports**
- danh sách report mở
- xem reason + detail
- resolve / dismiss
- hide track nếu cần

### `/admin/users`
**Quản lý users**
- xem user
- suspend / ban user
- xem số track user đã upload

### `/admin/faucet`
**Theo dõi faucet claim**
- logs claim
- thống kê rate-limited requests
- phát hiện abuse cơ bản

---

## 3. API routes (server)

## 3.1 Auth / wallet

### `POST /api/auth/wallet/challenge`
Tạo challenge message cho Petra ký.

### `POST /api/auth/wallet/verify`
Verify chữ ký Petra, login hoặc tạo account mới.

### `POST /api/auth/logout`
Kết thúc session app.

### `GET /api/me`
Lấy thông tin user hiện tại.

---

## 3.2 Tracks

### `GET /api/tracks`
Lấy danh sách track public cho Explore.
Query params:
- `page`
- `limit`
- `sort`
- `genre`
- `owner`

### `GET /api/tracks/:id`
Lấy metadata 1 track.

### `POST /api/tracks`
Tạo bản ghi track mới trước khi upload.

### `PATCH /api/tracks/:id`
Sửa metadata track.

### `DELETE /api/tracks/:id`
Soft delete track.

### `POST /api/tracks/:id/publish`
Chuyển trạng thái từ processing -> published nếu hợp lệ.

### `POST /api/tracks/:id/favorite`
Favorite track.

### `DELETE /api/tracks/:id/favorite`
Bỏ favorite.

### `POST /api/tracks/:id/report`
Report track.

### `POST /api/tracks/:id/play`
Ghi nhận lượt nghe.

---

## 3.3 Upload / Shelby integration

### `POST /api/uploads/init`
Khởi tạo upload flow.
Trả về:
- trackId
- upload strategy
- giới hạn file

### `POST /api/uploads/:trackId/audio`
Upload file audio lên server để server đẩy tiếp lên Shelby.

### `POST /api/uploads/:trackId/cover`
Upload ảnh cover.

### `POST /api/uploads/:trackId/finalize`
Finalize upload:
- lưu blob metadata
- cập nhật duration/size
- set processing or published

### `GET /api/tracks/:id/stream`
Server proxy stream nhạc từ Shelby.

### `GET /api/tracks/:id/download`
Download file nhạc.

---

## 3.4 Faucet

### `POST /api/faucet/apt`
Request faucet Aptos token cho ví.

### `POST /api/faucet/shelbyusd`
Request faucet ShelbyUSD cho ví.

### `GET /api/faucet/history`
Lịch sử claim của user hiện tại.

---

## 3.5 Admin

### `GET /api/admin/stats`
Số liệu dashboard.

### `GET /api/admin/tracks`
Danh sách tracks cho admin.

### `PATCH /api/admin/tracks/:id/hide`
Ẩn track.

### `PATCH /api/admin/tracks/:id/unhide`
Bỏ ẩn track.

### `GET /api/admin/reports`
Danh sách reports.

### `PATCH /api/admin/reports/:id/resolve`
Đánh dấu xử lý xong.

### `PATCH /api/admin/reports/:id/dismiss`
Bỏ qua report.

### `GET /api/admin/users`
Danh sách users.

### `PATCH /api/admin/users/:id/suspend`
Suspend user.

### `PATCH /api/admin/users/:id/ban`
Ban user.

### `GET /api/admin/faucet`
Danh sách faucet claims.

---

## 4. Route priorities theo phase

## Phase 1 — bắt buộc
- `/`
- `/explore`
- `/tracks/[trackId]`
- `/upload`
- `/me/tracks`
- `/faucet`
- `POST /api/auth/wallet/challenge`
- `POST /api/auth/wallet/verify`
- `GET /api/tracks`
- `GET /api/tracks/:id`
- `POST /api/tracks`
- `PATCH /api/tracks/:id`
- `DELETE /api/tracks/:id`
- `POST /api/uploads/init`
- `POST /api/uploads/:trackId/audio`
- `POST /api/uploads/:trackId/cover`
- `POST /api/uploads/:trackId/finalize`
- `GET /api/tracks/:id/stream`
- `GET /api/tracks/:id/download`
- `POST /api/faucet/apt`
- `POST /api/faucet/shelbyusd`

## Phase 2 — nên có sớm
- favorites
- reports
- admin tracks
- admin reports
- admin stats

## Phase 3 — để sau
- search nâng cao
- trending tốt hơn
- playlists
- comments
- analytics nâng cao

---

## 5. User flow ngắn gọn

### Flow A — Login bằng Petra
1. User connect Petra
2. App gọi challenge
3. Petra sign message
4. App verify signature
5. Tạo session nội bộ

### Flow B — Upload bài nhạc
1. User vào `/upload`
2. Nhập metadata
3. App tạo track draft
4. Upload file lên server
5. Server đẩy file lên Shelby
6. DB lưu blob metadata
7. Track chuyển `published` hoặc `processing`

### Flow C — Nghe nhạc
1. User vào `/tracks/[id]`
2. Frontend gọi metadata
3. Audio player gọi stream endpoint
4. Server đọc blob từ Shelby và stream về

### Flow D — Claim faucet
1. User vào `/faucet`
2. Connect Petra
3. Chọn loại token
4. Gọi faucet API
5. Lưu claim log vào DB
6. Hiển thị kết quả

---

## 6. Kết luận
Nếu bám route map này thì team sẽ biết rất rõ:
- trang nào cần làm trước
- API nào là xương sống
- chỗ nào thuộc user flow bắt buộc
- chỗ nào có thể để phase sau
