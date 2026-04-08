# Shelby Vinyl — MVP Roadmap & Execution Plan

## 1. Mục tiêu của roadmap này

Tài liệu này giúp giữ dự án đi đúng hướng, tránh lan man.
Mỗi giai đoạn chỉ tập trung vào một nhóm mục tiêu rõ ràng.

## 2. Cách triển khai nên theo thứ tự

Thứ tự ưu tiên đúng nên là:
1. **Khung dự án + auth ví**
2. **Database schema + backend cơ bản**
3. **Upload nhạc lên Shelby**
4. **My Tracks + Explore**
5. **Vinyl player UI**
6. **Admin/moderation cơ bản**
7. **Polish landing/faucet/demo**

## 3. Phase 0 — Project setup

## Mục tiêu
Dựng nền móng kỹ thuật.

## Việc cần làm
- Khởi tạo repo
- Chọn monorepo hay single app
- Setup Next.js
- Setup Tailwind
- Setup Prisma + PostgreSQL
- Setup env files
- Setup lint/format
- Tạo cấu trúc folder cơ bản

## Deliverable
- App chạy local ổn định
- DB kết nối được
- Có layout cơ bản và routing ban đầu

## 4. Phase 1 — Wallet authentication

## Mục tiêu
User có thể kết nối Petra Wallet và đăng nhập vào app bằng verify wallet.

## Việc cần làm
- Tích hợp Aptos wallet adapter
- Hỗ trợ Petra Wallet
- Tạo backend endpoint cấp nonce
- Tạo flow sign message
- Verify signature ở backend
- Tạo user nếu chưa tồn tại
- Tạo session/token

## Deliverable
- User connect wallet thành công
- User sign message thành công
- User đăng nhập được vào app

## 5. Phase 2 — Landing + Faucet page

## Mục tiêu
Có một landing page đẹp, rõ concept và có page faucet cho Shelbynet.

## Việc cần làm
- Tạo landing page giới thiệu Shelby Vinyl
- Tạo CTA: Connect Wallet / Explore / Upload
- Tạo page `/faucet`
- Viết hướng dẫn ngắn:
  - cần Petra Wallet
  - cần Aptos test token
  - cần ShelbyUSD nếu flow yêu cầu
  - cần chuyển đúng network/testnet

## Deliverable
- Có landing page đủ dùng để demo
- Có faucet page rõ ràng, dễ hiểu

## 6. Phase 3 — Upload nhạc lên Shelby

## Mục tiêu
Hoàn thành luồng upload file nhạc thực sự.

## Việc cần làm
- Tạo form upload
- Validate loại file
- Giới hạn dung lượng file
- Tạo record track với trạng thái processing
- Upload audio lên Shelby
- Lưu blob reference vào DB
- Đổi trạng thái track sang published khi xong

## Deliverable
- Upload được ít nhất một file nhạc từ giao diện web
- Track xuất hiện trong DB với metadata đầy đủ

## 7. Phase 4 — My Tracks

## Mục tiêu
User xem được thư viện bài nhạc của mình.

## Việc cần làm
- API lấy danh sách track theo user hiện tại
- UI list/grid cho thư viện cá nhân
- Hiển thị metadata cơ bản:
  - title
  - artist
  - status
  - created date
- Link sang trang chi tiết track

## Deliverable
- Trang `/me/tracks` hoạt động tốt

## 8. Phase 5 — Explore page

## Mục tiêu
Có trang cộng đồng hiển thị các bài nhạc public.

## Việc cần làm
- API lấy track public
- Query sort theo mới nhất
- Render danh sách public tracks
- Cho phép mở detail/player
- Có tải xuống cho track public

## Deliverable
- Trang `/explore` dùng được như một thư viện cộng đồng mini

## 9. Phase 6 — Vinyl player

## Mục tiêu
Player có bản sắc riêng và đủ ấn tượng để demo.

## Việc cần làm
- Tạo audio player component
- UI đĩa than quay khi phát
- Cover ở tâm đĩa
- Progress bar
- Nút play/pause
- Hiển thị title + artist

## Deliverable
- Trang chi tiết bài hát có player vinyl chạy mượt

## 10. Phase 7 — Admin cơ bản

## Mục tiêu
Có khả năng kiểm soát nội dung tối thiểu.

## Việc cần làm
- Seed một tài khoản admin
- Middleware kiểm tra role
- Danh sách tất cả tracks
- Action ẩn / khóa track
- Xem user list cơ bản

## Deliverable
- Admin có thể vào dashboard và kiểm soát nội dung cơ bản

## 11. Definition of Done cho MVP

MVP hoàn tất khi có thể demo liền mạch kịch bản sau:

1. User vào landing page.
2. User kết nối Petra Wallet.
3. User vào faucet page để xem hướng dẫn lấy token.
4. User đăng nhập thành công.
5. User upload một bài nhạc.
6. Bài nhạc được lưu trên Shelby.
7. Bài nhạc xuất hiện ở My Tracks.
8. Nếu để public, bài nhạc xuất hiện ở Explore.
9. Có thể mở trang chi tiết để nghe bài qua vinyl player.
10. Admin có thể ẩn track nếu cần.

## 12. Backlog sau MVP

Sau khi MVP xong mới cân nhắc thêm:
- cover upload
- lyrics
- search/filter by genre
- likes/favorites
- playlists
- comments
- waveform visualization
- report system hoàn chỉnh
- analytics
- streaming optimization

## 13. Nguyên tắc chống lan man trong lúc build

### 13.1. Luôn hỏi: tính năng này có giúp demo end-to-end không?
Nếu không, cho vào backlog.

### 13.2. Không tối ưu sớm
Chưa cần microservices, queue phức tạp, recommendation engine, AI moderation.

### 13.3. Mỗi phase phải có đầu ra đo được
Không làm kiểu “nghiên cứu chung chung”.
Phải có deliverable rõ.

### 13.4. UI đẹp nhưng không được cản trở flow chính
Landing và player rất quan trọng, nhưng không được làm chậm phần auth + upload + storage.

## 14. Khuyến nghị cách làm việc tiếp theo

Sau bộ markdown này, bước tiếp theo hợp lý nhất là làm tiếp theo thứ tự:
1. chốt tech stack cuối cùng
2. chốt database schema chi tiết
3. chốt route map / API contract
4. chốt folder structure
5. mới bắt đầu code
