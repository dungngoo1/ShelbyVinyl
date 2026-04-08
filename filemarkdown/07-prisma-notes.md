# Shelby Vinyl — Prisma Schema Notes

## 1. Mục tiêu file này
File này giải thích ngắn gọn vì sao schema hiện tại được thiết kế như vậy để khi chỉnh sửa sau này không phá cấu trúc tổng thể.

---

## 2. Tư duy thiết kế

Schema tách thành 3 lớp:

1. **Identity layer**
   - `User`
   - `UserSession`

2. **Music/content layer**
   - `Track`
   - `TrackAsset`
   - `TrackLike`
   - `TrackDownload`

3. **Moderation/admin layer**
   - `TrackReport`
   - `ModerationAction`

Shelby chỉ là nơi lưu file, còn mọi logic nghiệp vụ của app đều nên nằm ở schema này.

---

## 3. Giải thích một số field quan trọng

### `User.aptosAddress`
Lưu địa chỉ ví Aptos đã verify qua Petra. Field này là `unique` để một ví không gắn với nhiều account app.

### `Track.slug`
Dùng cho URL đẹp dạng `/tracks/my-first-song` thay vì dùng ID thô.

### `Track.visibility`
Quyết định bài hát có hiển thị ra Explore hay không.

- `PUBLIC`: hiện ra Explore, ai cũng nghe/tải được
- `UNLISTED`: ai có link mới vào được
- `PRIVATE`: chỉ owner hoặc admin xem được

### `Track.status`
Tách khỏi visibility để tránh nhập nhằng.

Ví dụ:
- Một bài có thể `PUBLIC` nhưng vẫn `PROCESSING`
- Một bài có thể `PUBLIC` nhưng bị `BLOCKED`
- Một bài có thể `PRIVATE` và `PUBLISHED`

### `TrackAsset`
Tách asset ra riêng để sau này dễ thêm:
- cover image
- waveform
- lyrics
- nhiều version audio

### `explorerUrl`
Lưu link sang Shelby Explorer để user có thể xác minh blob đã tồn tại trên Shelby.

---

## 4. Những thứ chưa đưa vào MVP

Các bảng sau có thể thêm ở phase sau:

- Playlist
- PlaylistTrack
- Comment
- Notification
- Follow
- AuditLog mở rộng
- FaucetClaim chi tiết theo từng request

---

## 5. Những rule nên giữ

- Không xóa cứng track ngay lập tức, ưu tiên soft delete qua `deletedAt`
- Không tăng `playCount` trực tiếp từ client
- Không coi `likeCount` là nguồn sự thật duy nhất; bảng `TrackLike` mới là source of truth
- Không dùng blob name của Shelby làm primary key của app

---

## 6. Khi nào cần migration schema tiếp theo

Nên tạo migration mới khi thêm một trong các tính năng sau:

- playlist
- search/filter phức tạp
- comments
- feed/trending ranking
- nhiều chain / nhiều wallet provider
- nhiều loại role hơn ngoài `USER` và `ADMIN`
